// Simple in-memory repository placeholder.
// Replace with real database logic as needed.

const fs = require('fs');
const { sendMail } = require('../services/mail.service');

const applications = [];

const saveApplication = async (application) => {
  const record = {
    id: applications.length + 1,
    createdAt: new Date().toISOString(),
    ...application,
  };

  applications.push(record);

  // Build email content
  const subject = `New application for ${record.positionOfInterest}`;
  const body = `
    <p>You have received a new application.</p>
    <p><strong>Name:</strong> ${record.name}</p>
    <p><strong>Email:</strong> ${record.email}</p>
    <p><strong>Position of Interest:</strong> ${record.positionOfInterest}</p>
    <p><strong>Message:</strong></p>
    <p>${record.message || '(no message provided)'}</p>
  `;

  const attachments = [];

  if (record.file && record.file.path) {
    try {
      const fileBuffer = fs.readFileSync(record.file.path);
      attachments.push({
        filename: record.file.originalName || record.file.fileName,
        content: fileBuffer,
      });
    } catch (e) {
      console.error('Failed to read attachment file:', e);
    }
  }

  // Call email service (TO, Subject, Body, Attachment)
  // You can change the "to" address as needed.
  await sendMail({
    to: process.env.APPLICATION_NOTIFY_EMAIL || record.email,
    subject,
    body,
    attachments,
  });

  return record;
};

module.exports = {
  saveApplication,
};


