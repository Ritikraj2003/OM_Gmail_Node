import express from 'express';
import { upload } from '../config/multer.js';
import { handleApplication } from '../controller/apply.controller.js';

const router = express.Router();

// POST /api/apply
// Field name for file must be "file"
router.post('/', upload.single('file'), handleApplication);

export default router;
