import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AudioPlayerProvider, useAudioPlayer } from './context/AudioPlayerContext';
import { Navigation } from './components/Navigation';
import { QuietPlayerBar } from './components/QuietPlayerBar';
import { HomeView, AboutView, MusicView, ShowsView, UpdatesView, UpdateDetailView, SongDetailView } from './views/Views';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function FooterQuote() {
  const { playlist, playSong, isPlaying, currentIndex } = useAudioPlayer();
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const neverGoingHomeIndex = playlist.findIndex((s) => s.id === 'never-going-home' || s.slug === 'never-going-home');
  const isNeverPlaying = isPlaying && currentIndex === (neverGoingHomeIndex !== -1 ? neverGoingHomeIndex : 1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePlaySong = () => {
    const targetIdx = neverGoingHomeIndex !== -1 ? neverGoingHomeIndex : 1;
    playSong(targetIdx);
  };

  return (
    <div
      className="footer-quote-wrap"
      style={{
        position: 'relative',
        cursor: 'pointer',
        display: 'inline-block',
        userSelect: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handlePlaySong}
      role="button"
      tabIndex={0}
      aria-label="Click to play Never Going Home"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePlaySong();
        }
      }}
    >
      {/* Floating Custom Pill Cursor */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: cursorPos.x + 16,
            top: cursorPos.y + 16,
            pointerEvents: 'none',
            backgroundColor: '#060707',
            color: '#FFFFFF',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            padding: '7px 15px',
            borderRadius: '9999px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            whiteSpace: 'nowrap',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'transform 0.05s ease-out',
          }}
        >
          <span style={{ fontSize: '9px' }}>{isNeverPlaying ? '❚❚' : '▶'}</span>
          <span>{isNeverPlaying ? 'PAUSE TRACK' : 'LISTEN NOW'}</span>
        </div>
      )}

      <h3 style={footerStyles.taglineText}>
        "Broke all the walls again<br />
        I run till I fall again<br />
        Don't mind me<br />
        I feel like a freak"
      </h3>

      {/* Mobile Only: Listen Now Button */}
      <div className="footer-quote-mobile-btn-wrap">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePlaySong();
          }}
          className="footer-quote-mobile-btn"
          aria-label={isNeverPlaying ? "Pause Never Going Home" : "Listen Now to Never Going Home"}
        >
          <span style={{ fontSize: '10px' }}>{isNeverPlaying ? '❚❚' : '▶'}</span>
          <span>{isNeverPlaying ? 'PAUSE TRACK' : 'LISTEN NOW'}</span>
        </button>
      </div>
    </div>
  );
}

export function AppContent() {
  return (
    <div className="outer-frame-wrapper">
      {/* Main Centered Content Container */}
      <div className="site-inner-container">
        {/* Navigation Bar */}
        <Navigation />

        {/* Dynamic Route Content */}
        <main id="main-content" style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/music" element={<MusicView />} />
            <Route path="/music/:slug" element={<SongDetailView />} />
            <Route path="/shows" element={<ShowsView />} />
            <Route path="/updates" element={<UpdatesView />} />
            <Route path="/updates/:slug" element={<UpdateDetailView />} />
          </Routes>
        </main>

        {/* Editorial Footer */}
        <footer className="editorial-footer-container" style={footerStyles.container}>
          <div className="editorial-footer-top" style={footerStyles.topRow}>
            {/* Left Tagline */}
            <div className="editorial-footer-tagline-col" style={footerStyles.taglineCol}>
              <FooterQuote />
            </div>

            {/* Right Navigation Columns */}
            <div className="editorial-footer-links-wrap" style={footerStyles.linksWrap}>
              <div style={footerStyles.navCol}>
                <span style={footerStyles.footerHeading}>Navigate</span>
                <Link to="/" style={footerStyles.footerLink}>Home</Link>
                <Link to="/about" style={footerStyles.footerLink}>About</Link>
                <Link to="/music" style={footerStyles.footerLink}>Music</Link>
                <Link to="/shows" style={footerStyles.footerLink}>Shows</Link>
                <Link to="/updates" style={footerStyles.footerLink}>New</Link>
              </div>

              <div style={footerStyles.navCol}>
                <span style={footerStyles.footerHeading}>Connect</span>
                <a href="https://discord.gg/bAejsZPMuA" target="_blank" rel="noopener noreferrer" style={footerStyles.footerLink}>Discord</a>
                <a href="https://wa.me/918130671864?s=t" target="_blank" rel="noopener noreferrer" style={footerStyles.footerLink}>WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Huge Monolithic Artist Name */}
          <div className="editorial-footer-brand-wrap" style={footerStyles.massiveBrandWrap}>
            <h1 className="editorial-footer-brand-text" style={footerStyles.massiveBrandText}>
              UNBROKEN KRAFT
            </h1>
          </div>

          <div style={footerStyles.bottomRow}>
            <div style={footerStyles.copyright}>
              © 2026 UNBROKEN KRAFT. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Persistent Floating Music Player */}
      <QuietPlayerBar />
    </div>
  );
}

export function App() {
  return (
    <AudioPlayerProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AudioPlayerProvider>
  );
}

const footerStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#FFFFFF',
    color: '#060707',
    padding: '90px 48px 120px',
    overflow: 'hidden',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px',
    flexWrap: 'wrap',
    maxWidth: '1360px',
    margin: '0 auto 60px',
  },
  taglineCol: {
    flex: '1 1 340px',
  },
  taglineText: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(26px, 3.2vw, 36px)',
    fontWeight: 600,
    color: '#111111',
    letterSpacing: '-0.5px',
    margin: 0,
    lineHeight: 1.25,
  },
  linksWrap: {
    display: 'flex',
    gap: '80px',
    flexWrap: 'wrap',
  },
  navCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '120px',
  },
  footerHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '14px',
    color: '#060707',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111111',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  },
  massiveBrandWrap: {
    maxWidth: '1360px',
    margin: '0 auto',
    overflow: 'hidden',
    userSelect: 'none',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  massiveBrandText: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(28px, 9.5vw, 150px)',
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    color: '#0D0E0E',
    margin: '40px 0 30px',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    textAlign: 'left',
    width: '100%',
    maxWidth: '1360px',
    boxSizing: 'border-box',
  },
  bottomRow: {
    maxWidth: '1360px',
    margin: '0 auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  },
  copyright: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'var(--font-mono)',
  },
};

export default App;
