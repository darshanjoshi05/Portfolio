import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ── Nodemailer transporter ──
    // Uses Gmail SMTP. In .env.local, set:
    //   GMAIL_USER=joshidarshan193@gmail.com
    //   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  (Google App Password — NOT your real password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'joshidarshan193@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // ── Email to YOU (Darshan) ──
    const toYou = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER || 'joshidarshan193@gmail.com'}>`,
      to: 'joshidarshan193@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New Contact Form Submission'} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#050810;font-family:'Courier New',monospace;color:#e8f0fe;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            
            <!-- Header -->
            <div style="border-bottom:2px solid #00d4ff;padding-bottom:20px;margin-bottom:30px;">
              <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#00d4ff;margin-bottom:8px;">
                New Portfolio Message
              </div>
              <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:700;margin:0;color:#e8f0fe;">
                ${subject || 'Contact Form Submission'}
              </h1>
            </div>

            <!-- Sender Info -->
            <div style="background:#0c1120;border:1px solid rgba(100,180,255,0.12);padding:20px;margin-bottom:24px;">
              <div style="display:grid;gap:12px;">
                <div>
                  <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7fa3;margin-bottom:4px;">From</div>
                  <div style="font-size:15px;color:#e8f0fe;font-weight:600;">${name}</div>
                </div>
                <div>
                  <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7fa3;margin-bottom:4px;">Email</div>
                  <a href="mailto:${email}" style="font-size:14px;color:#00d4ff;text-decoration:none;">${email}</a>
                </div>
                <div>
                  <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7fa3;margin-bottom:4px;">Subject</div>
                  <div style="font-size:14px;color:#e8f0fe;">${subject || '(No subject)'}</div>
                </div>
                <div>
                  <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7fa3;margin-bottom:4px;">Sent At</div>
                  <div style="font-size:13px;color:#6b7fa3;">${new Date().toLocaleString('en-US', { timeZone: 'America/Detroit', dateStyle: 'full', timeStyle: 'short' })}</div>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom:30px;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#00d4ff;margin-bottom:12px;">Message</div>
              <div style="background:#0c1120;border-left:3px solid #00d4ff;padding:20px;font-size:14px;line-height:1.8;color:#e8f0fe;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>

            <!-- Reply CTA -->
            <div style="text-align:center;margin-bottom:30px;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your message to Darshan Joshi')}"
                style="display:inline-block;background:#00d4ff;color:#000;font-family:Georgia,serif;font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;text-decoration:none;">
                Reply to ${name} →
              </a>
            </div>

            <!-- Footer -->
            <div style="border-top:1px solid rgba(100,180,255,0.08);padding-top:20px;text-align:center;">
              <div style="font-size:11px;color:#6b7fa3;letter-spacing:1px;">
                Received via <span style="color:#00d4ff;">darshanjoshi.tech</span> portfolio contact form
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // ── Auto-reply to sender ──
    const autoReply = {
      from: `"Darshan Joshi" <${process.env.GMAIL_USER || 'joshidarshan193@gmail.com'}>`,
      to: email,
      subject: `Got your message — Darshan Joshi`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#050810;font-family:'Courier New',monospace;color:#e8f0fe;">
          <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
            <div style="border-bottom:1px solid rgba(0,212,255,0.2);padding-bottom:16px;margin-bottom:28px;">
              <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#00d4ff;margin-bottom:6px;">Auto-Reply</div>
              <h1 style="font-family:Georgia,serif;font-size:22px;font-weight:700;margin:0;">
                Hey ${name}, got your message!
              </h1>
            </div>
            <p style="font-size:14px;line-height:1.85;color:#6b7fa3;margin-bottom:20px;">
              Thanks for reaching out through my portfolio. I've received your message and will get back to you within 24 hours.
            </p>
            <div style="background:#0c1120;border:1px solid rgba(100,180,255,0.1);padding:16px;margin-bottom:28px;border-left:3px solid #00d4ff;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7fa3;margin-bottom:8px;">Your message</div>
              <div style="font-size:13px;line-height:1.75;color:#e8f0fe;white-space:pre-wrap;">${message.substring(0, 300).replace(/</g, '&lt;').replace(/>/g, '&gt;')}${message.length > 300 ? '...' : ''}</div>
            </div>
            <p style="font-size:13px;color:#6b7fa3;margin-bottom:24px;">
              In the meantime, feel free to check out my work:
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px;">
              <a href="https://darshanjoshi.tech" style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#00d4ff;text-decoration:none;border:1px solid rgba(0,212,255,0.3);padding:8px 16px;">Portfolio</a>
              <a href="https://github.com/darshanjoshi05" style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#00d4ff;text-decoration:none;border:1px solid rgba(0,212,255,0.3);padding:8px 16px;">GitHub</a>
              <a href="https://linkedin.com/in/darshanjoshi05" style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7c3aed;text-decoration:none;border:1px solid rgba(124,58,237,0.3);padding:8px 16px;">LinkedIn</a>
            </div>
            <div style="border-top:1px solid rgba(100,180,255,0.06);padding-top:16px;">
              <div style="font-size:12px;font-weight:700;color:#00d4ff;margin-bottom:4px;">Darshan Joshi</div>
              <div style="font-size:11px;color:#6b7fa3;">AI Engineer · Lawrence Technological University · Southfield, MI</div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(toYou)
    await transporter.sendMail(autoReply)

    return NextResponse.json({ success: true, message: 'Message sent successfully!' })

  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please email directly at joshidarshan193@gmail.com' },
      { status: 500 }
    )
  }
}
