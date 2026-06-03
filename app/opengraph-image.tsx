import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0b1220',
          color: '#f8fafc',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 30, color: '#38bdf8', fontWeight: 700 }}>Mutiur Rahman</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1, fontWeight: 800 }}>Fullstack Web Developer</div>
          <div style={{ maxWidth: 850, fontSize: 34, lineHeight: 1.25, color: '#cbd5e1' }}>
            React, Next.js, TypeScript, Node.js, and scalable modern web applications.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 26, color: '#e2e8f0' }}>
          <span>Portfolio</span>
          <span>Projects</span>
          <span>Developer Tools</span>
        </div>
      </div>
    ),
    size
  );
}
