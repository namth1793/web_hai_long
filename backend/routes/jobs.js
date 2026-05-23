const express = require('express');
const router = express.Router();
const db = require('../db/init');

// GET /api/jobs - All active jobs
router.get('/', (req, res) => {
  const jobs = db.prepare('SELECT * FROM jobs WHERE trang_thai = 1 ORDER BY created_at DESC').all();
  res.json(jobs);
});

// GET /api/jobs/:id - Single job
router.get('/:id', (req, res) => {
  const job = db.prepare('SELECT * FROM jobs WHERE id = ? AND trang_thai = 1').get(req.params.id);
  if (!job) return res.status(404).json({ message: 'Vị trí không tồn tại.' });
  res.json(job);
});

// POST /api/jobs/apply - Submit job application
router.post('/apply', (req, res) => {
  const { job_id, ho_ten, email, dien_thoai, vi_tri, gioi_thieu } = req.body;
  if (!ho_ten || !email) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin.' });
  }
  try {
    db.prepare(`
      INSERT INTO job_applications (job_id, ho_ten, email, dien_thoai, vi_tri, gioi_thieu)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(job_id || null, ho_ten, email, dien_thoai || '', vi_tri || '', gioi_thieu || '');
    res.json({ success: true, message: 'Hồ sơ của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server. Vui lòng thử lại.' });
  }
});

module.exports = router;
