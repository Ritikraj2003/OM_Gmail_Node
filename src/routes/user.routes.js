const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { handleApplication } = require('../controllers/user.controller');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeOriginalName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${safeOriginalName}`);
  },
});

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

