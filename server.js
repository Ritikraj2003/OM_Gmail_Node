import http from 'http';
import app from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
