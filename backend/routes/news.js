const express = require('express');
const router = express.Router();
const db = require('../db/init');

// GET /api/news - All news with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const category = req.query.danh_muc || '';
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM news';
  let countQuery = 'SELECT COUNT(*) as total FROM news';
  const params = [];

  if (category) {
    query += ' WHERE danh_muc = ?';
    countQuery += ' WHERE danh_muc = ?';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

  const news = db.prepare(query).all(...params, limit, offset);
  const total = db.prepare(countQuery).get(...params).total;

  res.json({
    data: news,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// GET /api/news/categories - Distinct categories
router.get('/categories', (req, res) => {
  const cats = db.prepare('SELECT DISTINCT danh_muc FROM news ORDER BY danh_muc').all();
  res.json(cats.map(c => c.danh_muc));
});

// GET /api/news/latest - Latest 3 news (for homepage)
router.get('/latest', (req, res) => {
  const news = db.prepare('SELECT * FROM news ORDER BY created_at DESC LIMIT 3').all();
  res.json(news);
});

// GET /api/news/:slug - Single news by slug
router.get('/:slug', (req, res) => {
  const news = db.prepare('SELECT * FROM news WHERE slug = ?').get(req.params.slug);
  if (!news) return res.status(404).json({ message: 'Bài viết không tồn tại.' });

  // Increment view count
  db.prepare('UPDATE news SET luot_xem = luot_xem + 1 WHERE id = ?').run(news.id);

  // Related news (same category, different article)
  const related = db.prepare(
    'SELECT * FROM news WHERE danh_muc = ? AND id != ? ORDER BY created_at DESC LIMIT 3'
  ).all(news.danh_muc, news.id);

  res.json({ ...news, related });
});

module.exports = router;
