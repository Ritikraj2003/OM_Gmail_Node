import { transporter } from '../config/nodemailer.js';

export const handleContact = async (req, res) => {
  try {
    // Extracting the fields based on your requirements
    const { name, email, phone, gmail, message, subject } = req.body;

    // 1. Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    // 2. Prepare email options
    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send it to the site owner
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      text: `
You have received a new contact form submission.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Gmail: ${gmail || 'Not provided'}
Subject: ${subject || 'Not provided'}

Message:
${message}
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    // 4. Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully.',
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your contact form.',
      error: error.message || String(error)
    });
  }
};
