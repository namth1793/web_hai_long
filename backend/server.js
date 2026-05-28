const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5030;

// CORS: allow Netlify frontend (set FRONTEND_URL in Railway env vars)
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin (curl, Postman, Railway health check)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/news', require('./routes/news'));
app.use('/api/jobs', require('./routes/jobs'));

// Admin routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/news', require('./routes/admin-news'));
app.use('/api/admin/jobs', require('./routes/admin-jobs'));
app.use('/api/admin', require('./routes/admin-contacts'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hoang Khang API is running', port: PORT });
});

app.listen(PORT, () => {
  console.log(`✅ Hoang Khang Backend running on http://localhost:${PORT}`);
});
