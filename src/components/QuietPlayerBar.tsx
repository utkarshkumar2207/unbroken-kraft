import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export const QuietPlayerBar: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    currentTime,
    duration,
    seek,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    isLoading,
    hasError,
    errorMessage
  } = useAudioPlayer();

  const scrubberRef = useRef<HTMLDivElement | null>(null);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seek(Math.min(duration, currentTime + 5));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seek(Math.max(0, currentTime - 5));
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seek, toggleMute, currentTime, duration]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio * duration);
  };

  return (
    <footer 
      className="persistent-player-bar" 
      aria-label="Persistent Audio Player"
    >
      {/* Embedded edge progress line on the top border of the player */}
      <div 
        className="player-mobile-edge-progress" 
        onClick={handleScrubberClick}
        role="slider"
        aria-label="Audio progress bar"
      >
        <div style={{ ...playerStyles.scrubberFill, width: `${progressPercent}%`, height: '100%' }} />
      </div>

      {/* Main Bar Top Row (Track Info & Controls) */}
      <div className="player-main-bar-row">
        {/* Left: Track Information */}
        <Link 
          to={`/music/${currentSong.slug || currentSong.id}`} 
          className="player-track-info"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
          title={`Go to ${currentSong.title} song page`}
        >
          <div style={playerStyles.thumbFrame}>
            <img 
              src={currentSong.artwork} 
              alt={`Artwork for ${currentSong.title}`} 
              style={playerStyles.thumb} 
            />
          </div>
          <div style={playerStyles.trackMeta}>
            <div style={playerStyles.titleRow}>
              <span className="player-track-title" style={playerStyles.trackTitle}>{currentSong.title}</span>
              {!currentSong.hasMasterAudio && (
                <span className="player-sample-tag" style={playerStyles.sampleTag} title="Master audio pending upload">
                  Preview
                </span>
              )}
            </div>
            <span className="player-track-artist" style={playerStyles.trackArtist}>
              UNBROKEN KRAFT
            </span>
          </div>
        </Link>

        {/* Center: Controls & Desktop Scrubber */}
        <div className="player-center-controls">
          <div style={playerStyles.buttonsRow}>
            <button 
              onClick={playPrev} 
              style={playerStyles.transportBtn} 
              title="Previous track (Left Arrow)"
              aria-label="Previous track"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            <button 
              onClick={togglePlay} 
              style={playerStyles.mainPlayBtn} 
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <span style={playerStyles.loadingDot}>•</span>
              ) : isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button 
              onClick={playNext} 
              style={playerStyles.transportBtn} 
              title="Next track (Right Arrow)"
              aria-label="Next track"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          <div className="player-scrubber-wrapper" style={playerStyles.scrubberWrapper}>
            <span style={playerStyles.timeLabel}>{formatTime(currentTime)}</span>
            <div 
              ref={scrubberRef} 
              style={playerStyles.scrubberTrack} 
              onClick={handleScrubberClick}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              aria-label="Audio progress bar"
              tabIndex={0}
            >
              <div style={{ ...playerStyles.scrubberFill, width: `${progressPercent}%` }} />
            </div>
            <span style={playerStyles.timeLabel}>{formatTime(duration)}</span>
          </div>

          {hasError && (
            <div style={playerStyles.errorNotice}>{errorMessage}</div>
          )}
        </div>

        {/* Right: Volume Control */}
        <div className="player-right-controls">
          <button 
            onClick={toggleMute} 
            style={playerStyles.muteBtn} 
            title={isMuted ? "Unmute (M)" : "Mute (M)"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={isMuted ? 0 : volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))} 
            style={playerStyles.volSlider}
            aria-label="Volume slider"
          />
        </div>
      </div>

      {/* Mobile Dedicated Full Scrubber Row */}
      <div className="player-mobile-full-scrubber-row">
        <span className="player-mobile-time">{formatTime(currentTime)}</span>
        <div 
          className="player-mobile-track-bar"
          onClick={handleScrubberClick}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-label="Mobile audio progress bar"
        >
          <div className="player-mobile-track-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="player-mobile-time">{formatTime(duration)}</span>
      </div>
    </footer>
  );
};

const playerStyles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '82vw',
    maxWidth: '1200px',
    minWidth: '320px',
    background: 'rgba(12, 16, 14, 0.92)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    color: '#F5F5F3',
    borderRadius: '16px',
    padding: '12px 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '28px',
    zIndex: 9999,
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
  trackInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minWidth: '220px',
    maxWidth: '320px',
    flexShrink: 0,
  },
  thumbFrame: {
    width: '42px',
    height: '42px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    flexShrink: 0,
    background: '#000',
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  trackMeta: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    gap: '2px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  trackTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.2px',
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
  },
  sampleTag: {
    fontSize: '9px',
    fontFamily: 'var(--font-mono)',
    padding: '1px 6px',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.14)',
    color: '#C4CBC6',
    textTransform: 'uppercase',
  },
  trackArtist: {
    fontSize: '11px',
    color: 'rgba(245, 245, 243, 0.6)',
    letterSpacing: '0.5px',
  },
  centerControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    flex: 1,
    maxWidth: '680px',
  },
  buttonsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  transportBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(245, 245, 243, 0.7)',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  mainPlayBtn: {
    background: '#FFFFFF',
    color: '#060707',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  loadingDot: {
    fontSize: '16px',
    lineHeight: 1,
  },
  scrubberWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  timeLabel: {
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    color: 'rgba(245, 245, 243, 0.55)',
    minWidth: '32px',
  },
  scrubberTrack: {
    flex: 1,
    height: '4px',
    background: 'rgba(255, 255, 255, 0.16)',
    borderRadius: '2px',
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
  },
  scrubberFill: {
    height: '100%',
    background: '#FFFFFF',
    borderRadius: '2px',
  },
  errorNotice: {
    fontSize: '10px',
    color: '#FF7D7D',
  },
  rightControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '100px',
    justifyContent: 'flex-end',
  },
  muteBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(245, 245, 243, 0.7)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  volSlider: {
    width: '68px',
    height: '3px',
    accentColor: '#FFFFFF',
    cursor: 'pointer',
  },
};
