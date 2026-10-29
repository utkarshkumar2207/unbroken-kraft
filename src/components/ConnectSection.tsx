import React from 'react';

export const ConnectSection: React.FC = () => {
  return (
    <section 
      className="connect-homepage-section" 
      style={{ 
        padding: '80px 48px 100px', 
        backgroundColor: '#060707', 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)' 
      }} 
      aria-label="Direct Channels"
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(32px, 4.5vw, 52px)', 
            fontWeight: 900, 
            color: '#FFFFFF', 
            letterSpacing: '-0.8px', 
            margin: '0 0 16px',
            textTransform: 'uppercase',
          }}>
            FIND ME ONLINE
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(245, 245, 243, 0.7)', 
            margin: 0,
            lineHeight: 1.5
          }}>
            Beyond the music, here's where you can find me.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))', 
          gap: '24px',
          justifyContent: 'start',
        }}>
          {/* Discord Card */}
          <a 
            href="https://discord.gg/bAejsZPMuA" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#111312',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '28px 28px 32px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '160px',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              {/* Discord Icon */}
              <svg width="28" height="22" viewBox="0 0 127.14 96.36" fill="#FFFFFF">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '15px' }}>↗</span>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '20px',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: '0 0 8px',
              }}>
                Discord
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(245, 245, 243, 0.65)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                Join the community and chat.
              </p>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a 
            href="https://wa.me/918130671864?s=t" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#111312',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '28px 28px 32px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '160px',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              {/* WhatsApp Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '15px' }}>↗</span>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '20px',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: '0 0 8px',
              }}>
                WhatsApp
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'rgba(245, 245, 243, 0.65)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                Connect with me directly.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
