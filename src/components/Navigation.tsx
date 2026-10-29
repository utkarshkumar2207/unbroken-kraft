import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="site-header-nav" aria-label="Main Navigation">
        {/* Left: Brand Logo Link */}
        <Link to="/" className="nav-brand-text" title="Unbroken Kraft - Return to Homepage">
          UNBROKEN KRAFT
        </Link>

        {/* Center/Right Desktop & Tablet Pill Capsule Menu */}
        <nav className="desktop-capsule-nav">
          <NavLink 
            to="/" 
            end
            style={({ isActive }) => ({
              ...navStyles.navItem,
              ...(isActive ? navStyles.navItemActive : navStyles.navItemInactive)
            })}
          >
            Home
          </NavLink>

          <NavLink 
            to="/about" 
            style={({ isActive }) => ({
              ...navStyles.navItem,
              ...(isActive ? navStyles.navItemActive : navStyles.navItemInactive)
            })}
          >
            About
          </NavLink>

          <NavLink 
            to="/music" 
            style={({ isActive }) => ({
              ...navStyles.navItem,
              ...(isActive ? navStyles.navItemActive : navStyles.navItemInactive)
            })}
          >
            Music
          </NavLink>

          <NavLink 
            to="/shows" 
            style={({ isActive }) => ({
              ...navStyles.navItem,
              ...(isActive ? navStyles.navItemActive : navStyles.navItemInactive)
            })}
          >
            Shows
          </NavLink>

          <NavLink 
            to="/updates"
            style={({ isActive }) => ({
              ...navStyles.navItem,
              ...(isActive ? navStyles.navItemActive : navStyles.navItemInactive)
            })}
          >
            New
          </NavLink>
        </nav>

        {/* Tablet & Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-nav-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="17" x2="20" y2="17"></line>
            </svg>
          )}
        </button>
      </header>

      {/* Full-Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-header">
            <Link 
              to="/" 
              className="nav-brand-text" 
              onClick={() => setMobileMenuOpen(false)}
              title="Unbroken Kraft - Return to Homepage"
            >
              UNBROKEN KRAFT
            </Link>
            <button 
              className="mobile-drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="mobile-drawer-links" aria-label="Mobile Navigation Links">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `mobile-drawer-item ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>

            <NavLink 
              to="/about" 
              className={({ isActive }) => `mobile-drawer-item ${isActive ? 'active' : ''}`}
            >
              About
            </NavLink>

            <NavLink 
              to="/music" 
              className={({ isActive }) => `mobile-drawer-item ${isActive ? 'active' : ''}`}
            >
              Music
            </NavLink>

            <NavLink 
              to="/shows" 
              className={({ isActive }) => `mobile-drawer-item ${isActive ? 'active' : ''}`}
            >
              Shows
            </NavLink>

            <NavLink 
              to="/updates"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `mobile-drawer-item ${isActive ? 'active' : ''}`}
            >
              New
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

const navStyles: { [key: string]: React.CSSProperties } = {
  navItem: {
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.2px',
    padding: '7px 16px',
    borderRadius: '9999px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  navItemActive: {
    background: '#FFFFFF',
    color: '#060707',
    fontWeight: 600,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  navItemInactive: {
    color: 'rgba(245, 245, 243, 0.72)',
    background: 'transparent',
  },
};
