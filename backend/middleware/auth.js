const crypto = require('crypto');
const SECRET = process.env.ADMIN_SECRET || 'hk_admin_2024_secret';

const sign = (payload) => {
  const data = { ...payload, exp: Date.now() + 86400000 }; // 24h
  const b64 = Buffer.from(JSON.stringify(data)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
  return `${b64}.${sig}`;
};

const verify = (token) => {
  try {
    const [b64, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
    if (sig !== expected) return null;
    const data = JSON.parse(Buffer.from(b64, 'base64url').toString());
    if (data.exp < Date.now()) return null;
    return data;
  } catch { return null; }
};

const auth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập.' });
  const payload = verify(token);
  if (!payload) return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  req.admin = payload;
  next();
};

module.exports = { sign, verify, auth };
