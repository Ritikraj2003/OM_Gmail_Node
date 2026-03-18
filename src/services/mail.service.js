const nodemailer = require('nodemailer');

// Configure this transporter with your real SMTP details
// (e.g. host, port, auth.user, auth.pass) via environment variables.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Send an email.
 * @param {string|string[]} to
 * @param {string} subject
 * @param {string} body - HTML or plain text
 * @param {{ filename: string, path: string }[]=} attachments
 */
const sendMail = async ({ to, subject, body, attachments = [] }) => {
  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html: body,
    attachments,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = {
  sendMail,
};

