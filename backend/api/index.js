import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import dbConnection from '../config/dbConnection.js';
import configureSocket from '../config/socketSetup.js';
import errorHandler from '../middlewares/errorHandler.js';
import authRoutes from '../routes/authRoutes.js';
import chatRoutes from '../routes/chatRoutes.js';
import messageRoutes from '../routes/messageRoutes.js';
import userRoutes from '../routes/userRoutes.js';

// #################### environment configuration ####################
dotenv.config();

// ###################### database connection ########################
dbConnection();

const PORT = process.env.PORT || 8000;
const HOST_NAME = process.env.HOST_NAME || `127.0.0.1`;

// ######################### app instance #########################
const app = express();
const server = http.createServer(app);

// Configure Socket.IO separately
const io = configureSocket(server);

// ########################## body-parser #########################
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// ############################# morgan setup #######################
app.use(morgan('dev'));

// ########################## cors policy ##############################
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ######################## routes ##########################
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chats', chatRoutes);
app.use('/api/v1/messages', messageRoutes);

// ########################## customize error ###########################
app.use(errorHandler);

// ########################## default error handler #######################
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  res.status(500).json({ error: 'There was a server side error!' });
});

// ########################## listening the server #########################
server.listen(PORT, HOST_NAME, () => {
  console.log(
    `Your server is running successfully on http://${HOST_NAME}:${PORT}`
  );
});
