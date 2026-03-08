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

  const subject = '✅ Xác nhận tài khoản CreatorHub của bạn';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#06090F;font-family:Arial,sans-serif;">
  <table width="100%" style="background:#06090F;padding:40px 20px;"><tr><td align="center">
  <table width="560" style="background:#0C1118;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
  <tr><td style="background:linear-gradient(135deg,#00D4AA,#00a882);padding:32px;text-align:center;">
  <div style="font-size:28px;font-weight:900;color:#06090F;">CreatorHub</div>
  <div style="color:rgba(0,0,0,0.6);font-size:13px;">AI Tools cho Nhà Sáng Tạo</div>
  </td></tr>
  <tr><td style="padding:40px 36px;">
  <h2 style="color:#EEF2F7;">Xin chào ${name || 'Creator'} 👋</h2>
  <p style="color:#8A9BAD;font-size:15px;line-height:1.7;">Cảm ơn bạn đã đăng ký <strong style="color:#00D4AA;">CreatorHub</strong>! Nhấn nút bên dưới để xác nhận tài khoản.</p>
  <div style="text-align:center;margin:32px 0;">
  <a href="${confirmUrl}" style="background:#00D4AA;color:#06090F;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">✅ Xác nhận tài khoản</a>
  </div>
  <p style="color:#607182;font-size:13px;">Link có hiệu lực trong 24 giờ.</p>
  </td></tr>
  <tr><td style="padding:20px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
  <p style="color:#607182;font-size:12px;">© 2026 CreatorHub · creatorhub-topaz-theta.vercel.app</p>
  </td></tr></table></td></tr></table></body></html>`;

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
