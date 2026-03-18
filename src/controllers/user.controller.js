const { saveApplication } = require('../repositories/user.repository');

/**
 * Handle application submission from frontend.
 * Expected fields:
 * - name (string, required)
 * - email (string, required)
 * - positionOfInterest (string, required)
 * - message (string, optional)
 * - file (uploaded file, optional but usually present)
 */
const handleApplication = async (req, res, next) => {
  try {
    const { name, email, positionOfInterest, message } = req.body;
    const file =
      req.file ||
      (Array.isArray(req.files) && req.files.length > 0 ? req.files[0] : null);

    if (!name || !email || !positionOfInterest) {
      return res.status(400).json({
        message: 'name, email and positionOfInterest are required.',
      });
    }

    const applicationData = {
      name,
      email,
      positionOfInterest,
      message: message || '',
      file: file
        ? {
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            buffer: file.buffer, // in-memory buffer (memoryStorage, no disk path)
          }
        : null,
    };

    const saved = await saveApplication(applicationData);

    return res.status(201).json({
      message: 'Application received successfully.',
      data: saved,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  handleApplication,
};

