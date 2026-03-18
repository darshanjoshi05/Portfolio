import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Darshan Joshi — AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
            borderRadius: 2,
            marginBottom: 32,
          }}
        />
        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#e8f0fe',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Darshan Joshi
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 28,
            color: '#a78bfa',
            marginBottom: 32,
            fontWeight: 600,
          }}
        >
          AI Engineer · Computer Vision · NLP · Cybersecurity
        </div>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {['YOLOv8', 'PyTorch', 'FastAPI', '4 Publications', 'MS CS @ LTU'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                borderRadius: 6,
                padding: '6px 16px',
                color: '#c4b5fd',
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        {/* URL */}
        <div style={{ fontSize: 20, color: '#6366f1', fontWeight: 600 }}>
          darshanjoshi.tech
        </div>
      </div>
    ),
    { ...size }
  )
}
