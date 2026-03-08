const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'creatorhub.officialss@gmail.com',
    pass: 'xcdiozfnhosdzdpo',
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, name, type, confirmUrl } = req.body;
  if (!to || !type) return res.status(400).json({ error: 'Missing fields' });

  const subject = '✅ Confirm your CreatorHub account';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#06090F;font-family:Arial,sans-serif;">
  <table width="100%" style="background:#06090F;padding:40px 20px;"><tr><td align="center">
  <table width="560" style="background:#0C1118;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#00D4AA,#00a882);padding:32px;text-align:center;">
    <div style="font-size:28px;font-weight:900;color:#06090F;">CreatorHub</div>
    <div style="color:rgba(0,0,0,0.6);font-size:13px;margin-top:4px;">AI Tools for Creators</div>
  </td></tr>
  <tr><td style="padding:40px 36px;">
    <h2 style="color:#EEF2F7;font-size:22px;margin:0 0 12px;">Hey ${name || 'Creator'} 👋</h2>
    <p style="color:#8A9BAD;font-size:15px;line-height:1.7;margin:0 0 28px;">
      Thanks for signing up for <strong style="color:#00D4AA;">CreatorHub</strong>!
      You're one step away from unlocking unlimited creative power.
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${confirmUrl}" style="background:#00D4AA;color:#06090F;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">
        ✅ Confirm my account
      </a>
    </div>
    <p style="color:#607182;font-size:13px;line-height:1.6;margin:0;">
      This link expires in <strong style="color:#8A9BAD;">24 hours</strong>.
      If you didn't create this account, you can safely ignore this email.
    </p>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:28px 0;">
    <p style="color:#8A9BAD;font-size:13px;margin:0 0 14px;font-weight:600;">🚀 Once confirmed, you can start using:</p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="33%" style="text-align:center;padding:12px 8px;background:rgba(0,212,170,0.06);border-radius:10px;">
        <div style="font-size:20px;">✍️</div>
        <div style="color:#EEF2F7;font-size:11px;font-weight:600;margin-top:4px;">AI Caption</div>
      </td>
      <td width="4%"></td>
      <td width="33%" style="text-align:center;padding:12px 8px;background:rgba(0,212,170,0.06);border-radius:10px;">
        <div style="font-size:20px;">#️⃣</div>
        <div style="color:#EEF2F7;font-size:11px;font-weight:600;margin-top:4px;">Hashtag Tool</div>
      </td>
      <td width="4%"></td>
      <td width="33%" style="text-align:center;padding:12px 8px;background:rgba(0,212,170,0.06);border-radius:10px;">
        <div style="font-size:20px;">📅</div>
        <div style="color:#EEF2F7;font-size:11px;font-weight:600;margin-top:4px;">Content Calendar</div>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="background:rgba(255,255,255,0.02);padding:20px 36px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="color:#607182;font-size:12px;margin:0;">
      © 2026 CreatorHub · AI Tools for Creators Worldwide<br>
      <a href="https://creatorhub-topaz-theta.vercel.app" style="color:#00D4AA;text-decoration:none;">creatorhub-topaz-theta.vercel.app</a>
    </p>
  </td></tr>
  </table></td></tr></table>
  </body></html>`;

  try {
    await transporter.sendMail({
      from: '"CreatorHub" <creatorhub.officialss@gmail.com>',
      to, subject, html,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
