const express = require('express');
const router = express.Router();
const db = require('../db/init');

// POST /api/contacts - Submit contact form
router.post('/', (req, res) => {
  const { ho_ten, email, dien_thoai, cong_ty, dich_vu, noi_dung } = req.body;
  if (!ho_ten || !email) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền họ tên và email.' });
  }
  try {
    const stmt = db.prepare(`
      INSERT INTO contacts (ho_ten, email, dien_thoai, cong_ty, dich_vu, noi_dung)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(ho_ten, email, dien_thoai || '', cong_ty || '', dich_vu || '', noi_dung || '');
    res.json({ success: true, message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24 giờ.', id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server. Vui lòng thử lại.' });
  }
});

// GET /api/contacts - Get all contacts (admin)
router.get('/', (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

module.exports = router;
