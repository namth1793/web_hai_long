const express = require('express');
const router = express.Router();
const db = require('../db/init');
const { auth } = require('../middleware/auth');

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
    .substring(0, 100);

// GET /api/admin/news
router.get('/', auth, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const data = db.prepare('SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
  const total = db.prepare('SELECT COUNT(*) as c FROM news').get().c;
  res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
});

// POST /api/admin/news
router.post('/', auth, (req, res) => {
  const { tieu_de, slug, mo_ta, noi_dung, hinh_anh, danh_muc, tac_gia } = req.body;
  if (!tieu_de) return res.status(400).json({ message: 'Tiêu đề không được để trống.' });

  const finalSlug = (slug || slugify(tieu_de));
  try {
    const result = db.prepare(`
      INSERT INTO news (tieu_de, slug, mo_ta, noi_dung, hinh_anh, danh_muc, tac_gia)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(tieu_de, finalSlug, mo_ta || '', noi_dung || '', hinh_anh || '', danh_muc || '', tac_gia || 'Admin');
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    if (err.message.includes('UNIQUE'))
      return res.status(400).json({ message: 'Slug đã tồn tại. Vui lòng chọn slug khác.' });
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

// PUT /api/admin/news/:id
router.put('/:id', auth, (req, res) => {
  const { tieu_de, slug, mo_ta, noi_dung, hinh_anh, danh_muc, tac_gia } = req.body;
  if (!tieu_de) return res.status(400).json({ message: 'Tiêu đề không được để trống.' });

  try {
    db.prepare(`
      UPDATE news SET tieu_de=?, slug=?, mo_ta=?, noi_dung=?, hinh_anh=?, danh_muc=?, tac_gia=?
      WHERE id=?
    `).run(tieu_de, slug || slugify(tieu_de), mo_ta || '', noi_dung || '', hinh_anh || '', danh_muc || '', tac_gia || 'Admin', req.params.id);
    res.json({ success: true });
  } catch (err) {
    if (err.message.includes('UNIQUE'))
      return res.status(400).json({ message: 'Slug đã tồn tại.' });
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

// DELETE /api/admin/news/:id
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
