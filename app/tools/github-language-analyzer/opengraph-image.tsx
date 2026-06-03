import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  const languages = [
    ['TypeScript', '#3178c6', '38%'],
    ['JavaScript', '#f1e05a', '26%'],
    ['CSS', '#563d7c', '18%'],
    ['HTML', '#e34c26', '12%'],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 72,
          background: '#08111f',
          color: '#f8fafc',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '58%', gap: 26 }}>
          <div style={{ fontSize: 28, color: '#38bdf8', fontWeight: 700 }}>Free Developer Tool</div>
          <div style={{ fontSize: 78, lineHeight: 0.95, fontWeight: 800 }}>GitHub Language Analyzer</div>
          <div style={{ fontSize: 32, lineHeight: 1.25, color: '#cbd5e1' }}>
            Analyze public GitHub repositories and generate a README-ready top languages SVG card.
          </div>
        </div>
        <div
          style={{
            width: '42%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 22,
            padding: 38,
            border: '1px solid #334155',
            borderRadius: 28,
            background: '#0f172a',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700 }}>Top languages</div>
          {languages.map(([name, color, value]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24 }}>
                <span>{name}</span>
                <span style={{ color: '#cbd5e1' }}>{value}</span>
              </div>
              <div style={{ display: 'flex', height: 16, borderRadius: 999, background: '#1e293b', overflow: 'hidden' }}>
                <div style={{ display: 'flex', width: value, height: '100%', background: color, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
