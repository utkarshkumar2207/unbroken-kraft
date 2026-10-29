import React, { useEffect } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { PLACEHOLDER_MEDIA } from '../data/placeholders';
import { UPDATES_CATALOG } from '../data/updates';
import { SONGS_CATALOG } from '../data/songs';
import { COMMUNITY_CONNECTIONS } from '../data/connections';
import { ConnectSection } from '../components/ConnectSection';

/* ========================================================================== */
/*                                1. HOME VIEW                                */
/* ========================================================================== */
export const HomeView: React.FC = () => {
  const { playlist, playSong, isPlaying, currentIndex } = useAudioPlayer();
  const location = useLocation();
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = React.useState<boolean>(false);

  const partTimeLifeIndex = playlist.findIndex((s) => s.id === 'part-time-life' || s.slug === 'part-time-life');
  const isPartTimePlaying = isPlaying && currentIndex === (partTimeLifeIndex !== -1 ? partTimeLifeIndex : 0);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePlayHeroSong = () => {
    const targetIdx = partTimeLifeIndex !== -1 ? partTimeLifeIndex : 0;
    playSong(targetIdx);
  };

  useEffect(() => {
    if (location.hash === '#what-im-up-to') {
      const el = document.getElementById('what-im-up-to');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [location]);

  return (
    <div className="home-view" style={{ width: '100%' }}>
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="hero-section-responsive" style={homeStyles.heroContainer} aria-label="Hero Spotlight">
        {/* Background Image Container */}
        <div style={homeStyles.heroMediaWrap}>
          <img 
            src={PLACEHOLDER_MEDIA.hero.src} 
            alt={PLACEHOLDER_MEDIA.hero.altText} 
            className="home-hero-bg-img"
            style={homeStyles.heroImg} 
          />
          <div style={homeStyles.heroOverlay} />
        </div>

        {/* Hero Content Layer */}
        <div className="hero-content-layer-responsive" style={homeStyles.heroContentLayer}>
          {/* Top spacer for floating navigation */}
          <div className="hero-top-spacer-responsive" style={{ height: '90px' }} />

          {/* Middle Row: Left Giant Display Headline */}
          <div className="hero-middle-row-responsive" style={homeStyles.heroMiddleRow}>
            {/* Headline Area / Interactive Lyrics Quote */}
            <div 
              className="hero-lyrics-interactive-wrap"
              style={{
                ...homeStyles.heroHeadlineCol,
                position: 'relative',
                cursor: 'pointer',
                display: 'inline-block',
                maxWidth: '750px',
                userSelect: 'none',
              }}
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
              onMouseMove={handleHeroMouseMove}
              onClick={handlePlayHeroSong}
              role="button"
              tabIndex={0}
              aria-label="Click to play Part Time Life"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlayHeroSong();
                }
              }}
            >
              {/* Floating Custom Pill Cursor (Desktop) */}
              {isHeroHovered && (
                <div
                  className="hero-listen-cursor-pill"
                  style={{
                    position: 'absolute',
                    left: cursorPos.x + 16,
                    top: cursorPos.y + 16,
                    pointerEvents: 'none',
                    backgroundColor: '#F5F5F3',
                    color: '#060707',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.25)',
                    whiteSpace: 'nowrap',
                    zIndex: 40,
                    transform: 'translate3d(0, 0, 0)',
                    transition: 'transform 0.06s ease-out, background-color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '10px' }}>{isPartTimePlaying ? '❚❚' : '▶'}</span>
                  <span>{isPartTimePlaying ? 'Pause Track' : 'Listen Now'}</span>
                </div>
              )}

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3.8vw, 50px)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: '#F5F5F3',
                margin: 0,
                textTransform: 'none',
              }}>
                "Everything is forced<br />
                I can’t see myself<br />
                When I stand in the crowd<br />
                I can’t be myself"
              </h1>

              {/* Mobile Only: Dedicated Listen Now Action Button */}
              <div className="hero-mobile-listen-btn-wrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayHeroSong();
                  }}
                  className="hero-mobile-listen-btn"
                  aria-label={isPartTimePlaying ? 'Pause Part Time Life' : 'Listen Now to Part Time Life'}
                >
                  <span className="hero-btn-icon">{isPartTimePlaying ? '❚❚' : '▶'}</span>
                  <span>{isPartTimePlaying ? 'PAUSE TRACK' : 'LISTEN NOW'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION: WHAT I'M UP TO ----------------- */}
      <section id="what-im-up-to" className="updates-homepage-section" aria-label="What I'm Up To">
        {/* Header Area */}
        <div className="updates-header-row">
          <div className="updates-title-col">
            <h2 className="updates-main-title">WHAT I'M UP TO</h2>
          </div>
          <div className="updates-aside-col">
            <Link to="/updates" className="updates-view-all-btn">
              VIEW ALL UPDATES <span>→</span>
            </Link>
          </div>
        </div>

        {/* Updates Grid */}
        <div 
          className="updates-cards-grid" 
          style={UPDATES_CATALOG.length === 1 ? { gridTemplateColumns: 'minmax(280px, 480px)', justifyContent: 'start' } : undefined}
        >
          {UPDATES_CATALOG.slice(0, 3).map((item) => (
            <Link 
              key={item.id} 
              to={`/updates/${item.slug}`} 
              className="update-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', cursor: 'pointer' }}
            >
              <div className="update-card-image-wrap">
                <img 
                  src={item.featuredImage} 
                  alt={item.imageAlt} 
                  className="update-card-img"
                  loading="lazy" 
                />
              </div>
              <div className="update-card-body">
                <span className="update-date">{item.date}</span>
                <h3 className="update-title">{item.title}</h3>
                <p className="update-excerpt" style={{ marginBottom: 0 }}>{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------- SECTION 3: WHITE EDITORIAL SECTION ----------------- */}
      <section className="recent-releases-section-wrap" style={homeStyles.whiteSection} aria-label="Body of Work Catalog">
        <div className="recent-releases-header-row" style={homeStyles.whiteHeaderRow}>
          {/* Left Title */}
          <div className="recent-releases-left-col" style={homeStyles.whiteLeftCol}>
            <h2 style={homeStyles.whiteDisplayTitle}>
              RECENT RELEASES
            </h2>
          </div>

          {/* Right Lead Paragraph */}
          <div className="recent-releases-right-col" style={homeStyles.whiteRightCol}>
            <p style={homeStyles.whiteLeadProse}>
              Every song comes from a different place.
            </p>
            <p style={homeStyles.whiteSubProse}>
              Explore the collection, listen in full, and feel free to download anything you connect with, it's all here for you.
            </p>
          </div>
        </div>

        {/* Bottom Staggered 4-Card Row: 4 Featured Releases */}
        <div className="recent-releases-cards-grid" style={homeStyles.whiteStaggeredCardsRow}>
          {["part-time-life", "never-going-home", "falling-down", "fight-the-system"].map((songId) => {
            const actualIndex = playlist.findIndex((s) => s.id === songId);
            const song = playlist[actualIndex];
            if (!song) return null;
            const isPlayingThis = isPlaying && currentIndex === actualIndex;

            return (
              <Link 
                key={song.id} 
                to={`/music/${song.slug || song.id}`}
                style={{
                  backgroundColor: '#0D0E0E',
                  color: '#F5F5F3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Top Part: Disc Artwork Frame */}
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative', backgroundColor: '#000000' }}>
                  <img 
                    src={song.artwork} 
                    alt={`Cover artwork for ${song.title}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Bottom Part: Song Details & Action Controls */}
                <div className="recent-releases-card-bottom" style={{ padding: '28px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'center', gap: '16px', backgroundColor: '#0D0E0E' }}>
                  <div style={{ ...homeStyles.staggeredCardBody, width: '100%', alignItems: 'center' }}>
                    <h4 style={{ ...homeStyles.staggeredCardTitle, fontSize: '20px', margin: 0, textAlign: 'center', width: '100%' }}>{song.title}</h4>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <button 
                      type="button"
                      className={`recent-releases-play-btn ${isPlayingThis ? 'playing' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        playSong(actualIndex);
                      }} 
                    >
                      <span className="recent-releases-play-btn-text">
                        {isPlayingThis ? 'PAUSE' : 'LISTEN NOW'}
                      </span>
                      <span className="recent-releases-play-btn-triangle">
                        {isPlayingThis ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="5" y="4" width="4" height="16" rx="1" />
                            <rect x="15" y="4" width="4" height="16" rx="1" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M6 4.5V19.5L19.5 12L6 4.5Z" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action Button Beneath 4 Songs */}
        <div className="recent-releases-explore-btn-wrap" style={{ display: 'flex', justifyContent: 'center', marginTop: '68px' }}>
          <Link to="/music" style={homeStyles.btnPillDark}>
            Explore The Catalog →
          </Link>
        </div>
      </section>

      {/* ----------------- UPCOMING SHOWS SECTION ----------------- */}
      <section className="shows-homepage-section" style={{ padding: '80px 48px', backgroundColor: 'var(--bg-black)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} aria-label="Upcoming Shows">
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#F5F5F3', letterSpacing: '-0.5px', margin: 0 }}>
                UPCOMING SHOWS
              </h2>
            </div>
            <Link to="/shows" className="updates-view-all-btn">
              VIEW ALL DATES <span>→</span>
            </Link>
          </div>

          <div style={{
            padding: '60px 32px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              fontWeight: 500,
              color: 'rgba(245, 245, 243, 0.75)',
              margin: 0,
              letterSpacing: '0.2px',
            }}>
              No upcoming shows yet
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- CONNECT SECTION ----------------- */}
      <ConnectSection />
    </div>
  );
};

/* ========================================================================== */
/*                                2. ABOUT VIEW                               */
/* ========================================================================== */
export const AboutView: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      {/* Hero Section */}
      <section className="about-hero-section-responsive" style={homeStyles.heroContainer} aria-label="About Hero">
        <div style={homeStyles.heroMediaWrap}>
          <img 
            src={PLACEHOLDER_MEDIA.about.studioPortrait.src} 
            alt={PLACEHOLDER_MEDIA.about.studioPortrait.altText} 
            className="about-hero-bg-img"
            style={homeStyles.heroImg} 
          />
          <div style={homeStyles.heroOverlay} />
        </div>

        <div className="about-hero-content-layer" style={homeStyles.heroContentLayer}>
          <div className="about-hero-top-spacer" style={{ height: '90px' }} />
          <div className="about-hero-middle-row" style={homeStyles.heroMiddleRow}>
            <div className="about-hero-headline-col" style={homeStyles.heroHeadlineCol}>
              <div style={homeStyles.heroKicker}>THE HUMAN BEHIND THE CRAFT</div>
              <h1 style={homeStyles.heroDisplayHeading}>
                ART AGAINST THE RULES.<br />
                ART AGAINST THE MACHINE.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Black Section: Personal Manifesto */}
      <section style={homeStyles.blackSection}>
        <div style={{ ...homeStyles.blackHeaderWrap, textAlign: 'left', maxWidth: '820px', marginBottom: '40px' }}>
          <h2 style={{ ...homeStyles.blackSectionHeading, textAlign: 'left' }}>
            SELF EXPRESSION IS THE WHOLE POINT
          </h2>
        </div>

        <div style={aboutStyles.proseContainer}>
          <p style={{ ...aboutStyles.proseLead, fontWeight: 700 }}>
            They say haste creates waste, and I could not agree more…
          </p>

          <p style={aboutStyles.proseParagraph}>
            I do not like to release a song just because releasing is not an option. Weighing the action against its options defeats the whole purpose of why I am doing this.
          </p>

          <p style={aboutStyles.proseParagraph}>
            My goal is slow art. Why? Because slow is thoughtful, sometimes even thought provoking. And I find beauty in inspiration and letting it draw the best in me. I believe noodling around with my guitar is way better than forcing a release because of external reasons. We all know great artists who have gone down that path only to start hating what they do.
          </p>
        </div>
      </section>

      {/* White Section: Authentic Expression */}
      <section style={homeStyles.whiteSection}>
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h2 style={{ ...homeStyles.whiteDisplayTitle, fontSize: 'clamp(28px, 4.4vw, 54px)', lineHeight: 1.12 }}>
              AUTHENTIC EXPRESSION
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%' }}>
            <p style={homeStyles.whiteLeadProse}>
              These days I am way more focused on making songs which are authentic to my expression. I do not hate complex arrangements or complex sound designs, I have some of that DNA in the songs I have previously released.
            </p>
            <p style={{ ...homeStyles.whiteLeadProse, fontWeight: 700, margin: '8px 0' }}>
              But now, my whole agenda is to connect.
            </p>
            <p style={homeStyles.whiteLeadProse}>
              To connect with the human who is taking the time to listen to a piece of song I am making, or to attend a show I am performing.
            </p>
            <div style={{ marginTop: '20px' }}>
              <Link to="/music" style={homeStyles.btnPillDark}>
                Explore The Catalog →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CONNECT SECTION ----------------- */}
      <ConnectSection />
    </div>
  );
};

/* ========================================================================== */
/*                                3. MUSIC VIEW                               */
/* ========================================================================== */
export const MusicView: React.FC = () => {
  const { playlist, playSong, togglePlay, currentIndex, isPlaying } = useAudioPlayer();

  return (
    <div className="shows-page-container" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-black)' }}>
      {/* Cinematic Music Hero */}
      <section className="shows-hero-section" aria-label="Music Spotlight">
        <div className="shows-hero-bg-frame">
          <img 
            src="/images/music-hero.webp" 
            alt="Unbroken Kraft music catalog spotlight" 
            className="shows-hero-bg-img"
          />
          <div className="shows-hero-gradient-overlay" />
        </div>

        <div className="shows-hero-content-layer">
          {/* Top spacer for floating nav */}
          <div style={{ height: '70px' }} />

          <div className="shows-hero-header-row">
            <div className="shows-hero-title-col">
              <span className="shows-kicker">MUSIC</span>
              <h1 className="shows-headline">THE COMPLETE CATALOG</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Column Album Grid */}
      <section className="music-grid-section" style={{ padding: '60px 48px 80px', maxWidth: '1240px', margin: '0 auto' }} aria-label="Songs Catalog Grid">
        <div className="music-three-column-grid">
          {playlist.map((song, idx) => {
            const isCurrent = currentIndex === idx;
            const isThisPlaying = isCurrent && isPlaying;

            return (
              <article 
                key={song.id}
                className={`music-song-card ${isCurrent ? 'active-track' : ''}`}
              >
                {/* Square Cover Artwork with Link to Dedicated Song Page */}
                <Link 
                  to={`/music/${song.slug || song.id}`}
                  className="song-card-artwork-frame"
                  aria-label={`View details for ${song.title}`}
                >
                  <img 
                    src={song.artwork} 
                    alt={`Cover artwork for ${song.title}`} 
                    className="song-card-image"
                    loading="lazy"
                  />
                  {/* Play Button Overlay */}
                  <div className="song-artwork-overlay">
                    <button 
                      type="button"
                      className="song-play-icon-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (currentIndex === idx) {
                          togglePlay();
                        } else {
                          playSong(idx);
                        }
                      }}
                      aria-label={isThisPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
                      title={isThisPlaying ? 'Pause audio' : 'Play audio'}
                    >
                      <span className="song-play-icon">
                        {isThisPlaying ? '⏸' : '▶'}
                      </span>
                    </button>
                  </div>
                </Link>

                {/* Understated Typography Beneath Cover */}
                <div className="song-card-meta">
                  <h2 className="song-card-title">
                    <Link to={`/music/${song.slug || song.id}`} className="song-card-title-link">
                      {song.title}
                    </Link>
                  </h2>
                  <span className="song-card-artist">UNBROKEN KRAFT</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ----------------- CONNECT SECTION ----------------- */}
      <ConnectSection />
    </div>
  );
};

/* ========================================================================== */
/*                                4. SHOWS VIEW                               */
/* ========================================================================== */
export const ShowsView: React.FC = () => {
  return (
    <div className="shows-page-container" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-black)' }}>
      {/* Cinematic Shows Hero */}
      <section className="shows-hero-section" aria-label="Shows Spotlight">
        <div className="shows-hero-bg-frame">
          <img 
            src="/images/shows-hero.webp" 
            alt="Unbroken Kraft live shows spotlight" 
            className="shows-hero-bg-img"
          />
          <div className="shows-hero-gradient-overlay" />
        </div>

        <div className="shows-hero-content-layer">
          {/* Top spacer for floating nav */}
          <div style={{ height: '70px' }} />

          <div className="shows-hero-header-row">
            <div className="shows-hero-title-col">
              <span className="shows-kicker">SHOWS</span>
              <h1 className="shows-headline">LIVE MUSIC.<br />REAL CONNECTIONS.</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Events List / Empty State */}
      <section id="events-list" className="shows-events-section" aria-label="Upcoming Shows Schedule">
        <div style={{
          padding: '90px 32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '1240px',
          margin: '0 auto',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.5vw, 26px)',
            fontWeight: 500,
            color: 'rgba(245, 245, 243, 0.75)',
            margin: 0,
            letterSpacing: '0.2px',
          }}>
            No upcoming shows yet
          </p>
        </div>
      </section>

      {/* ----------------- CONNECT SECTION ----------------- */}
      <ConnectSection />
    </div>
  );
};

/* ========================================================================== */
/*                                5. UPDATES VIEW                              */
/* ========================================================================== */
export const UpdatesView: React.FC = () => {
  return (
    <div className="shows-page-container" style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-black)' }}>
      {/* Cinematic New / Updates Hero */}
      <section className="shows-hero-section updates-hero-section" aria-label="Updates Spotlight">
        <div className="shows-hero-bg-frame">
          <img 
            src="/images/updates-hero.webp" 
            alt="Unbroken Kraft updates spotlight" 
            className="shows-hero-bg-img updates-hero-bg-img"
          />
          <div className="shows-hero-gradient-overlay updates-hero-gradient-overlay" />
        </div>

        <div className="shows-hero-content-layer">
          {/* Top spacer for floating nav */}
          <div style={{ height: '70px' }} />

          <div className="shows-hero-header-row">
            <div className="shows-hero-title-col">
              <span className="shows-kicker">UPDATES</span>
              <h1 className="shows-headline">WHAT I'M UP TO</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of All Updates */}
      <section className="music-grid-section" style={{ padding: '60px 48px 80px', maxWidth: '1240px', margin: '0 auto' }} aria-label="All Updates List">
        <div 
          className="updates-cards-grid"
          style={UPDATES_CATALOG.length === 1 ? { gridTemplateColumns: 'minmax(280px, 480px)', justifyContent: 'start' } : undefined}
        >
          {UPDATES_CATALOG.map((item) => (
            <Link 
              key={item.id} 
              to={`/updates/${item.slug}`} 
              className="update-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', cursor: 'pointer' }}
            >
              <div className="update-card-image-wrap">
                <img 
                  src={item.featuredImage} 
                  alt={item.imageAlt} 
                  className="update-card-img"
                  loading="lazy" 
                />
              </div>
              <div className="update-card-body">
                <span className="update-date">{item.date}</span>
                <h3 className="update-title">{item.title}</h3>
                <p className="update-excerpt" style={{ marginBottom: 0 }}>{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------- CONNECT SECTION ----------------- */}
      <ConnectSection />
    </div>
  );
};

/* ========================================================================== */
/*                           6. UPDATE DETAIL VIEW                            */
/* ========================================================================== */
export const UpdateDetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const update = UPDATES_CATALOG.find((u) => u.slug === slug);

  if (!update) {
    return (
      <div className="music-page-container" style={{ width: '100%', minHeight: '80vh', background: 'var(--bg-black)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h1 className="music-catalog-headline" style={{ marginBottom: '16px' }}>UPDATE NOT FOUND</h1>
        <p style={{ color: 'rgba(245, 245, 243, 0.7)', marginBottom: '32px' }}>This dispatch does not exist or has been archived.</p>
        <Link to="/updates" className="updates-view-all-btn">
          ← BACK TO ALL UPDATES
        </Link>
      </div>
    );
  }

  return (
    <article className="update-detail-container">
      {/* Top Back Navigation Button */}
      <nav className="song-detail-nav" aria-label="Back Navigation" style={{ marginBottom: '32px' }}>
        <button 
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/updates');
            }
          }}
          className="song-back-button"
          aria-label="Go back to previous page"
        >
          ← Back
        </button>
      </nav>

      {/* Title & Metadata */}
      <header className="update-detail-header">
        <time className="update-detail-date">{update.date}</time>
        <h1 className="update-detail-title">{update.title}</h1>
      </header>

      {/* Featured Image */}
      <div className="update-detail-featured-media">
        <img src={update.featuredImage} alt={update.imageAlt} className="update-detail-img" />
      </div>

      {/* Body Content */}
      <div className="update-detail-prose">
        {update.sections ? (
          update.sections.map((section, sIdx) => (
            <div key={sIdx} className="update-detail-section-block">
              {section.heading && (
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: '36px 0 16px',
                  letterSpacing: '-0.3px',
                }}>
                  {section.heading}
                </h2>
              )}
              {section.image && (
                <div style={{
                  margin: '24px 0 28px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: '#0a0d0c'
                }}>
                  <img 
                    src={section.image.src} 
                    alt={section.image.alt || section.heading || 'Article visual'} 
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '560px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                  />
                  {section.image.caption && (
                    <div style={{
                      padding: '10px 16px',
                      fontSize: '12px',
                      color: 'rgba(245, 245, 243, 0.6)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      fontStyle: 'italic'
                    }}>
                      {section.image.caption}
                    </div>
                  )}
                </div>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="update-detail-paragraph" style={{ marginBottom: '18px' }}>
                  {p}
                </p>
              ))}
            </div>
          ))
        ) : (
          update.content.map((paragraph, idx) => (
            <p key={idx} className="update-detail-paragraph">{paragraph}</p>
          ))
        )}
      </div>

      {/* Footer Return Link */}
      <div className="update-detail-footer">
        <Link to="/" className="updates-view-all-btn">
          ← BACK TO HOMEPAGE
        </Link>
        <Link to="/updates" className="updates-view-all-btn">
          ALL UPDATES →
        </Link>
      </div>
    </article>
  );
};

/* ========================================================================== */
/*                           7. SONG DETAIL VIEW                              */
/* ========================================================================== */
export const SongDetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { playlist, playSong, togglePlay, currentIndex, isPlaying } = useAudioPlayer();
  const [isDownloadOpen, setIsDownloadOpen] = React.useState<boolean>(false);
  const downloadContainerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside on Desktop and Tablet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadContainerRef.current && !downloadContainerRef.current.contains(event.target as Node)) {
        setIsDownloadOpen(false);
      }
    };
    if (isDownloadOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDownloadOpen]);

  // Find song by slug or fallback by id
  const songIndex = playlist.findIndex((s) => (s.slug === slug || s.id === slug));
  const song = songIndex !== -1 ? playlist[songIndex] : SONGS_CATALOG.find((s) => (s.slug === slug || s.id === slug));

  if (!song) {
    return (
      <div className="music-page-container" style={{ width: '100%', minHeight: '80vh', background: 'var(--bg-black)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h1 className="music-catalog-headline" style={{ marginBottom: '16px' }}>SONG NOT FOUND</h1>
        <p style={{ color: 'rgba(245, 245, 243, 0.7)', marginBottom: '32px' }}>This composition has not been published or has moved.</p>
        <Link to="/music" className="updates-view-all-btn">
          ← BACK TO MUSIC CATALOG
        </Link>
      </div>
    );
  }

  const isCurrentPlaying = songIndex !== -1 && currentIndex === songIndex && isPlaying;
  const nextSong = songIndex !== -1 && songIndex < playlist.length - 1 ? playlist[songIndex + 1] : null;

  const handleDownloadSong = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDownloadOpen(false);
    if (!song.downloadUrl) return;

    const audioExtension = song.downloadUrl.split('.').pop()?.split('?')[0] || 'wav';
    const audioFileName = `UNBROKEN KRAFT - ${song.title}.${audioExtension}`;
    const audioUrl = song.downloadUrl.startsWith('http') 
      ? song.downloadUrl 
      : `/audio/${encodeURIComponent(audioFileName)}`;

    const audioLink = document.createElement('a');
    audioLink.href = audioUrl;
    audioLink.download = audioFileName;
    audioLink.target = '_blank';
    audioLink.rel = 'noopener noreferrer';
    document.body.appendChild(audioLink);
    audioLink.click();
    document.body.removeChild(audioLink);
  };

  const handleDownloadCover = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDownloadOpen(false);
    if (!song.artwork) return;

    const artExtension = song.artwork.split('.').pop()?.split('?')[0] || 'jpg';
    const coverFileName = `UNBROKEN KRAFT - ${song.title} (Cover Art).${artExtension}`;
    const coverUrl = `/images/${encodeURIComponent(coverFileName)}`;

    const coverLink = document.createElement('a');
    coverLink.href = coverUrl;
    coverLink.download = coverFileName;
    document.body.appendChild(coverLink);
    coverLink.click();
    document.body.removeChild(coverLink);
  };

  return (
    <div className="song-detail-page-container">
      {/* Top Back Navigation Button */}
      <nav className="song-detail-nav" aria-label="Back Navigation">
        <button 
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/music');
            }
          }}
          className="song-back-button"
          aria-label="Go back to previous page"
        >
          ← Back
        </button>
      </nav>

      {/* Hero Section */}
      <section className="song-hero-section" aria-label={`Song Spotlight: ${song.title}`}>
        <div className="song-hero-grid">
          {/* Cover Artwork Frame */}
          <div className="song-hero-artwork-frame">
            <img 
              src={song.artwork} 
              alt={`Cover artwork for ${song.title}`} 
              className="song-hero-artwork-img"
            />
          </div>

          {/* Song Information & Transport Controls */}
          <div className="song-hero-info">
            <h1 className="song-hero-title">{song.title}</h1>
            <div className="song-hero-artist">{song.artist}</div>

            {/* Action Row: Listen Now + Download */}
            <div className="song-hero-actions">
              <button 
                onClick={() => {
                  if (songIndex !== -1) {
                    if (currentIndex === songIndex) {
                      togglePlay();
                    } else {
                      playSong(songIndex);
                    }
                  }
                }}
                className={`song-btn-play-primary ${isCurrentPlaying ? 'playing' : ''}`}
                aria-label={isCurrentPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
              >
                <span className="song-play-symbol">{isCurrentPlaying ? '⏸' : '▶'}</span>
                <span>{isCurrentPlaying ? 'PAUSE' : 'LISTEN NOW'}</span>
              </button>

              {song.downloadUrl ? (
                <div ref={downloadContainerRef} className="song-download-container">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDownloadOpen((prev) => !prev);
                    }}
                    className={`song-btn-download ${isDownloadOpen ? 'open' : ''}`}
                    title="Download song or cover art"
                    aria-expanded={isDownloadOpen}
                    aria-haspopup="true"
                  >
                    <span>DOWNLOAD</span>
                    <svg 
                      width="10" 
                      height="10" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      style={{ 
                        transition: 'transform 0.2s ease', 
                        transform: isDownloadOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                      }}
                      aria-hidden="true"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>

                  {/* Desktop and Tablet Dropdown Menu */}
                  {isDownloadOpen && (
                    <div className="song-download-dropdown-menu" role="menu">
                      <button 
                        type="button"
                        className="song-download-option-btn"
                        onClick={handleDownloadSong}
                        role="menuitem"
                      >
                        <span>{song.title} - Song</span>
                        <span className="song-download-option-badge">WAV</span>
                      </button>

                      <button 
                        type="button"
                        className="song-download-option-btn"
                        onClick={handleDownloadCover}
                        role="menuitem"
                      >
                        <span>{song.title} - Cover Art</span>
                        <span className="song-download-option-badge">JPG</span>
                      </button>
                    </div>
                  )}

                  {/* Mobile Pop-up Overlay with blurred backdrop */}
                  {isDownloadOpen && (
                    <div 
                      className="song-download-mobile-overlay"
                      onClick={() => setIsDownloadOpen(false)}
                      role="dialog"
                      aria-modal="true"
                      aria-label="Download Options"
                    >
                      <div 
                        className="song-download-modal-card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="song-download-modal-header">
                          <h3 className="song-download-modal-title">Download Options</h3>
                          <button 
                            type="button"
                            className="song-download-modal-close-btn"
                            onClick={() => setIsDownloadOpen(false)}
                            aria-label="Close"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="song-download-modal-options">
                          <button 
                            type="button"
                            className="song-download-modal-option-btn"
                            onClick={handleDownloadSong}
                          >
                            <span>{song.title} - Song</span>
                            <span className="song-download-option-badge">WAV</span>
                          </button>

                          <button 
                            type="button"
                            className="song-download-modal-option-btn"
                            onClick={handleDownloadCover}
                          >
                            <span>{song.title} - Cover Art</span>
                            <span className="song-download-option-badge">JPG</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="song-download-wrapper">
                  <button 
                    disabled 
                    className="song-btn-download disabled"
                    title="Audio file awaiting creator master upload"
                  >
                    DOWNLOAD
                  </button>
                  <span className="download-status-note">
                    Master audio file pending upload. Free streaming preview available.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lyrics Section */}
      <section className="song-lyrics-section" aria-label="Song Words and Lyrics">
        <div className="song-section-header">
          <h2 className="song-section-title">LYRICS</h2>
        </div>

        {song.lyrics ? (
          <div className="song-lyrics-content">
            <pre className="song-lyrics-text">{song.lyrics}</pre>
          </div>
        ) : (
          <div className="song-lyrics-empty">
            <p className="lyrics-empty-notice">
              Official lyrics for <strong>{song.title}</strong> will be published here.
            </p>
          </div>
        )}
      </section>

      {/* Let's Connect Section */}
      <section className="song-connect-section" aria-label="Connect with Unbroken Kraft">
        <div className="song-connect-header">
          <span className="song-section-kicker">DIRECT CHANNELS</span>
          <h2 className="song-section-title">LET'S CONNECT</h2>
          <p className="song-connect-subhead">
            Enjoyed the song? I'd love to hear from you.
          </p>
        </div>

        <div className="song-connect-grid">
          {COMMUNITY_CONNECTIONS.map((item) => (
            <a 
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="connect-card"
            >
              <div className="connect-card-top">
                <div className="connect-icon-frame">
                  {item.platform === 'discord' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  )}
                  {item.platform === 'whatsapp' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.2-.44-.41-.45-.6-.46h-.51c-.18 0-.47.07-.71.33-.24.27-.94.92-.94 2.24s.96 2.6 1.09 2.78c.13.18 1.86 2.97 4.58 4.07.65.26 1.15.42 1.55.54.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.53-.32s-1.6-.79-1.85-.88-.43-.13-.61.13c-.18.27-.71.88-.87 1.06-.16.18-.32.2-.6.07s-1.18-.43-2.25-1.38c-.83-.74-1.39-1.65-1.55-1.93s-.02-.43.12-.57c.13-.13.29-.34.43-.51.14-.17.18-.29.27-.48.09-.19.05-.36-.02-.5s-.62-1.5-.86-2.03z"/>
                    </svg>
                  )}
                </div>
                <span className="connect-arrow">↗</span>
              </div>
              <h3 className="connect-card-title">{item.title}</h3>
              <p className="connect-card-desc">{item.description}</p>
              {!item.configured && (
                <span className="connect-placeholder-tag">
                  Placeholder • Awaiting configuration
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Bottom Navigation Row */}
      <footer className="song-detail-bottom-nav">
        <Link to="/music" className="song-bottom-return-btn">
          ← BACK TO FULL CATALOG
        </Link>
        {nextSong && (
          <Link to={`/music/${nextSong.slug || nextSong.id}`} className="song-bottom-next-btn">
            NEXT TRACK: {nextSong.title} →
          </Link>
        )}
      </footer>
    </div>
  );
};

/* ========================================================================== */
/*                               STYLE OBJECTS                                */
/* ========================================================================== */

const homeStyles: { [key: string]: React.CSSProperties } = {
  // Hero Container
  heroContainer: {
    position: 'relative',
    minHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 40px 48px',
    overflow: 'hidden',
    backgroundColor: '#070908',
  },
  heroMediaWrap: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.78) contrast(1.12)',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(6,7,7,0.35) 0%, rgba(6,7,7,0.15) 40%, rgba(6,7,7,0.85) 90%, #060707 100%)',
  },
  heroContentLayer: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '85vh',
  },
  heroMiddleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px',
    flexWrap: 'wrap',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: '40px 0',
  },
  heroHeadlineCol: {
    flex: '1 1 640px',
    maxWidth: '820px',
  },
  heroKicker: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    color: 'rgba(245, 245, 243, 0.75)',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: '16px',
    fontFamily: 'var(--font-display)',
  },
  heroDisplayHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 5.2vw, 68px)',
    fontWeight: 800,
    lineHeight: 1.04,
    letterSpacing: '-0.02em',
    color: '#F5F5F3',
    textTransform: 'uppercase',
  },
  circularArrowBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '0.85em',
    height: '0.85em',
    borderRadius: '50%',
    border: '1.5px solid rgba(255, 255, 255, 0.65)',
    fontSize: '0.6em',
    marginLeft: '0.25em',
    verticalAlign: 'middle',
    color: '#FFFFFF',
  },
  heroMetaCol: {
    flex: '0 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '8px',
  },
  metaStackGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.2px',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  metaDescription: {
    fontSize: '13px',
    lineHeight: 1.6,
    color: 'rgba(245, 245, 243, 0.68)',
  },
  heroBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    paddingTop: '20px',
  },
  glassInfoCard: {
    background: 'rgba(18, 24, 20, 0.55)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '12px 20px',
  },
  glassInfoInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  glassSymbol: {
    fontSize: '18px',
    color: '#FFFFFF',
  },
  glassTextGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  glassStatValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    color: '#FFFFFF',
  },
  glassStatLabel: {
    fontSize: '11px',
    color: 'rgba(245, 245, 243, 0.65)',
  },
  glassDivider: {
    width: '1px',
    height: '24px',
    background: 'rgba(255, 255, 255, 0.15)',
  },
  glassTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '1px',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  glassLinksPill: {
    background: 'rgba(18, 24, 20, 0.55)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '9999px',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  glassLink: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },

  // Section 2: Black Editorial Section
  blackSection: {
    backgroundColor: '#060707',
    padding: '90px 48px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  blackHeaderWrap: {
    textAlign: 'center',
    maxWidth: '920px',
    margin: '0 auto 64px',
  },
  blackSectionHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(28px, 4.4vw, 54px)',
    fontWeight: 800,
    lineHeight: 1.12,
    letterSpacing: '-0.02em',
    color: '#F5F5F3',
    textTransform: 'uppercase',
  },
  inlineBrandBadge: {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    color: '#060707',
    padding: '4px 18px',
    borderRadius: '4px',
    fontSize: '0.68em',
    fontWeight: 800,
    verticalAlign: 'middle',
    margin: '0 8px',
    letterSpacing: '0.5px',
  },
  blackThreeCardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    maxWidth: '1240px',
    margin: '0 auto',
  },
  blackAtmosphericCard: {
    position: 'relative',
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#121614',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardImageCover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardGradientOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)',
  },
  cardBottomFloat: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    right: '24px',
    zIndex: 2,
  },
  cardPlusIcon: {
    fontSize: '20px',
    color: '#FFFFFF',
    display: 'block',
    marginBottom: '8px',
  },
  cardBottomCaption: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'rgba(245, 245, 243, 0.85)',
  },

  // Fluted Green Center Card
  flutedGreenCard: {
    position: 'relative',
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#131E18',
    background: 'linear-gradient(160deg, #1B2B23 0%, #0D1612 100%)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.5)',
  },
  flutedTextureOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 16px)',
    pointerEvents: 'none',
  },
  flutedContent: {
    position: 'relative',
    zIndex: 2,
    padding: '36px 30px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flutedBadgeHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  flutedLogoIcon: {
    fontFamily: 'var(--font-display)',
    fontSize: '16px',
    fontWeight: 800,
    color: '#FFFFFF',
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  flutedTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#FFFFFF',
    letterSpacing: '-0.01em',
  },
  flutedDescription: {
    fontSize: '13px',
    lineHeight: 1.6,
    color: 'rgba(245, 245, 243, 0.72)',
  },
  flutedActionRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  btnListenAccent: {
    background: '#FFFFFF',
    color: '#060707',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'var(--font-display)',
  },
  flutedLink: {
    color: 'rgba(245, 245, 243, 0.8)',
    fontSize: '12px',
    textDecoration: 'none',
    fontWeight: 500,
  },

  // Card 3
  blackCharacterCard: {
    position: 'relative',
    height: '420px',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#121614',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardExploreBottom: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    zIndex: 2,
  },
  btnPillExplore: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1px',
    textDecoration: 'none',
    display: 'inline-block',
  },

  // Section 3: White Editorial Section
  whiteSection: {
    backgroundColor: '#F7F7F5',
    color: '#111111',
    padding: '90px 48px',
  },
  whiteHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '60px',
    flexWrap: 'wrap',
    maxWidth: '1240px',
    margin: '0 auto 64px',
  },
  whiteLeftCol: {
    flex: '1 1 480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  whiteDisplayTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 4.2vw, 56px)',
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
    color: '#111111',
  },
  btnPillDark: {
    alignSelf: 'flex-start',
    background: '#111111',
    color: '#F7F7F5',
    padding: '12px 24px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    letterSpacing: '0.2px',
  },
  whiteRightCol: {
    flex: '1 1 420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '8px',
  },
  whiteLeadProse: {
    fontSize: '18px',
    lineHeight: 1.6,
    color: '#111111',
    fontWeight: 500,
  },
  whiteSubProse: {
    fontSize: '14px',
    lineHeight: 1.65,
    color: '#5A605C',
  },

  // Staggered Cards
  whiteStaggeredCardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    maxWidth: '1240px',
    margin: '0 auto',
  },
  staggeredCardDark: {
    backgroundColor: '#0D0E0E',
    color: '#F5F5F3',
    borderRadius: '16px',
    padding: '24px',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  staggeredCardGreen: {
    backgroundColor: '#172720',
    color: '#F5F5F3',
    borderRadius: '16px',
    padding: '24px',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  staggeredCardImage: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    minHeight: '320px',
  },
  pillTagWhite: {
    alignSelf: 'flex-start',
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#FFFFFF',
    fontSize: '10px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '9999px',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
  },
  staggeredCardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  staggeredCardPlus: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  staggeredCardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: 700,
    color: '#FFFFFF',
  },
  staggeredCardText: {
    fontSize: '12px',
    lineHeight: 1.5,
    color: 'rgba(245, 245, 243, 0.7)',
    marginBottom: '12px',
  },
  btnCardPlayMini: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#FFFFFF',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    fontFamily: 'var(--font-display)',
  },
};

const aboutStyles: { [key: string]: React.CSSProperties } = {
  proseContainer: {
    maxWidth: '820px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  proseLead: {
    fontSize: '22px',
    lineHeight: 1.6,
    color: '#F5F5F3',
    fontWeight: 400,
  },
  proseParagraph: {
    fontSize: '16px',
    lineHeight: 1.85,
    color: 'rgba(245, 245, 243, 0.78)',
  },
  quoteBox: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.04)',
    borderLeft: '3px solid #FFFFFF',
    padding: '24px 28px',
    borderRadius: '0 12px 12px 0',
    marginTop: '16px',
  },
  quoteIcon: {
    fontSize: '36px',
    color: 'rgba(255, 255, 255, 0.3)',
    lineHeight: 1,
    display: 'block',
    marginBottom: '8px',
  },
  quoteText: {
    fontSize: '16px',
    fontStyle: 'italic',
    lineHeight: 1.7,
    color: '#F5F5F3',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1240px',
    margin: '0 auto',
  },
  toolCard: {
    background: '#FFFFFF',
    border: '1px solid #E8E7E3',
    borderRadius: '16px',
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  toolLabel: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#8E9691',
    fontFamily: 'var(--font-mono)',
  },
  toolTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: 700,
    color: '#111111',
  },
  toolDesc: {
    fontSize: '14px',
    lineHeight: 1.65,
    color: '#5A605C',
  },
};
