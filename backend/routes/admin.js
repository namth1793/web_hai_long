const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../db/init');
const { sign, auth } = require('../middleware/auth');

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || admin.password_hash !== sha256(password))
    return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng.' });

  const token = sign({ id: admin.id, username: admin.username });
  res.json({ token, username: admin.username });
});

// GET /api/admin/me
router.get('/me', auth, (req, res) => {
  res.json({ username: req.admin.username });
});

// GET /api/admin/stats
router.get('/stats', auth, (req, res) => {
  const news = db.prepare('SELECT COUNT(*) as c FROM news').get().c;
  const jobs = db.prepare('SELECT COUNT(*) as c FROM jobs WHERE trang_thai = 1').get().c;
  const contacts = db.prepare('SELECT COUNT(*) as c FROM contacts').get().c;
  const applications = db.prepare('SELECT COUNT(*) as c FROM job_applications').get().c;
  res.json({ news, jobs, contacts, applications });
});

module.exports = router;
