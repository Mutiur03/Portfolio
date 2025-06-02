import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, subject, message: text, name } = await request.json();
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .sender-info { background: white; padding: 15px; margin-bottom: 20px; border-left: 4px solid #667eea; }
            .message-box { background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Portfolio Website Contact</p>
            </div>
            <div class="content">
                <div class="sender-info">
                    <h3 style="margin: 0 0 10px 0; color: #667eea;">Contact Information</h3>
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                </div>
                <div class="message-box">
                    <h3 style="margin: 0 0 15px 0; color: #333;">Message</h3>
                    <p style="margin: 0; white-space: pre-wrap;">${text}</p>
                </div>
                <div class="footer">
                    <p>This email was sent from your portfolio contact form.</p>
                    <p>Received on ${new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: "mutiur5bb@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${text}`,
      html: htmlTemplate,
    });
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
