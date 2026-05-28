const express = require('express');
const router = express.Router();
const db = require('../db/init');
const { auth } = require('../middleware/auth');

// GET /api/admin/contacts
router.get('/contacts', auth, (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// GET /api/admin/applications
router.get('/applications', auth, (req, res) => {
  const apps = db.prepare(`
    SELECT ja.*, j.vi_tri as job_title
    FROM job_applications ja
    LEFT JOIN jobs j ON ja.job_id = j.id
    ORDER BY ja.created_at DESC
  `).all();
  res.json(apps);
});

// DELETE /api/admin/applications/:id
router.delete('/applications/:id', auth, (req, res) => {
  db.prepare('DELETE FROM job_applications WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
