import { transporter } from '../config/nodemailer.js';

export const handleApplication = async (req, res) => {
  try {
    const { name, email, positionOfInterest, message } = req.body;
    const file = req.file; // From multer upload.single('file')

    // 1. Validate required fields
    if (!name || !email || !positionOfInterest) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and positionOfInterest are required fields.',
      });
    }

    // 2. Validate file existence
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required.',
      });
    }

    // 3. Prepare email options
    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to site owner
      subject: `New Job Application: ${positionOfInterest} - ${name}`,
      text: `
You have received a new job application.

Name: ${name}
Email: ${email}
Position of Interest: ${positionOfInterest}
Message: ${message || 'No additional message provided.'}
      `,
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer, // Buffer from multer memoryStorage
        },
      ],
    };

    // 4. Send email with attachment
    await transporter.sendMail(mailOptions);

    // 5. Return success message only
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully.',
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your application.',
      error: error.message || String(error)
    });
  }
};
