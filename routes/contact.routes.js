import express from 'express';
import { handleContact } from '../controller/contact.controller.js';

const router = express.Router();

// POST /api/contact
router.post('/', handleContact);

export default router;
