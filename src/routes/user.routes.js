const express = require('express');
const multer = require('multer');

const { handleApplication } = require('../controllers/user.controller');

const router = express.Router();

// Use memory storage — no disk writes (required for Vercel serverless)
const storage = multer.memoryStorage();

// File filter to allow pdf, docs, images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: pdf, doc, docx, images'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// POST /api/users/apply
// Use .any() so requests don't fail if the client
// sends the file field with a different name or multiple files.
router.post('/apply', upload.any(), handleApplication);

module.exports = router;

