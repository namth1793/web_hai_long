const express = require('express');
const router = express.Router();
const db = require('../db/init');
const { auth } = require('../middleware/auth');

// GET /api/admin/jobs
router.get('/', auth, (req, res) => {
  const jobs = db.prepare('SELECT * FROM jobs ORDER BY created_at DESC').all();
  res.json(jobs);
});

// POST /api/admin/jobs
router.post('/', auth, (req, res) => {
  const { vi_tri, phong_ban, dia_diem, loai_hinh, muc_luong, so_luong, mo_ta, yeu_cau, quyen_loi, han_nop, trang_thai } = req.body;
  if (!vi_tri) return res.status(400).json({ message: 'Vị trí không được để trống.' });

  const result = db.prepare(`
    INSERT INTO jobs (vi_tri, phong_ban, dia_diem, loai_hinh, muc_luong, so_luong, mo_ta, yeu_cau, quyen_loi, han_nop, trang_thai)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    vi_tri, phong_ban || '', dia_diem || 'Hà Nội',
    loai_hinh || 'Toàn thời gian', muc_luong || '', parseInt(so_luong) || 1,
    mo_ta || '', yeu_cau || '', quyen_loi || '', han_nop || '',
    trang_thai !== undefined ? parseInt(trang_thai) : 1
  );
  res.json({ success: true, id: result.lastInsertRowid });
});

// PUT /api/admin/jobs/:id
router.put('/:id', auth, (req, res) => {
  const { vi_tri, phong_ban, dia_diem, loai_hinh, muc_luong, so_luong, mo_ta, yeu_cau, quyen_loi, han_nop, trang_thai } = req.body;
  if (!vi_tri) return res.status(400).json({ message: 'Vị trí không được để trống.' });

  db.prepare(`
    UPDATE jobs SET vi_tri=?, phong_ban=?, dia_diem=?, loai_hinh=?, muc_luong=?, so_luong=?,
      mo_ta=?, yeu_cau=?, quyen_loi=?, han_nop=?, trang_thai=?
    WHERE id=?
  `).run(
    vi_tri, phong_ban || '', dia_diem || 'Hà Nội',
    loai_hinh || 'Toàn thời gian', muc_luong || '', parseInt(so_luong) || 1,
    mo_ta || '', yeu_cau || '', quyen_loi || '', han_nop || '',
    trang_thai !== undefined ? parseInt(trang_thai) : 1,
    req.params.id
  );
  res.json({ success: true });
});

// DELETE /api/admin/jobs/:id
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM jobs WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
