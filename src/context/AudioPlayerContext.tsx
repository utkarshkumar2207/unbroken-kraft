import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import type { Song } from '../data/songs';
import { SONGS_CATALOG } from '../data/songs';

interface AudioContextType {
  playlist: Song[];
  currentIndex: number;
  currentSong: Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  playSong: (index: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

const AudioPlayerContext = createContext<AudioContextType | null>(null);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist] = useState<Song[]>(SONGS_CATALOG);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = playlist[currentIndex];

  const playNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const playPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  // Initialize and attach listener callbacks to audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = currentSong.audioSrc;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || currentSong.duration);
      setIsLoading(false);
      setHasError(false);
      setErrorMessage(null);
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => playNext();
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      setErrorMessage('Audio stream unavailable. Check master file path.');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Update MediaSession API for OS lockscreen and hardware buttons
  useEffect(() => {
    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: 'Unbroken Kraft Body of Work',
        artwork: [{ src: currentSong.artwork, sizes: '512x512', type: 'image/jpeg' }]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler('previoustrack', playPrev);
      navigator.mediaSession.setActionHandler('nexttrack', playNext);
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
          setCurrentTime(details.seekTime);
        }
      });
    }
  }, [currentSong, playNext, playPrev]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage(null);
      audioRef.current.src = currentSong.audioSrc;
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play()
          .then(() => setIsLoading(false))
          .catch((err) => {
            console.warn('Playback error:', err);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, [currentIndex]);

  const playSong = (index: number) => {
    if (index === currentIndex) {
      togglePlay();
      return;
    }
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          setHasError(false);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          setHasError(true);
          setErrorMessage('Playback could not start.');
        });
    }
  };

  const seek = (time: number) => {
    if (audioRef.current && Number.isFinite(time)) {
      const targetTime = Math.max(0, Math.min(time, (audioRef.current.duration || duration || 0) - 0.2));
      try {
        audioRef.current.currentTime = targetTime;
        setCurrentTime(targetTime);
      } catch (err) {
        console.warn('Seek error:', err);
      }
    }
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.volume = nextMute ? 0 : volume;
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        playlist,
        currentIndex,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isLoading,
        hasError,
        errorMessage,
        playSong,
        togglePlay,
        playNext,
        playPrev,
        seek,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
