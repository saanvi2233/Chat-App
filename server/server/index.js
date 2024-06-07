// // require('dotenv').config();

// // import express from "express";
// // import cors from "cors"; // Import cors
// // import mongoose from "mongoose";
// // const app = express();

// // // Use middleware
// // app.use(cors());
// // app.use(express.json());

// // // Check environment variables
// // console.log('DB_URL:', process.env.DB_URL);
// // console.log('PORT:', process.env.PORT);

// // // Connect to MongoDB using environment variable
// // mongoose.set('strictQuery', false); // Suppress strictQuery warning
// // mongoose.connect(process.env.DB_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(() => {
// //     console.log('Connected to MongoDB');
// // }).catch((error) => {
// //     console.error('Error connecting to MongoDB:', error);
// // });

// // // Define the port
// // const port = process.env.PORT || 3000;

// // // Start the server
// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// // });



// import dotenv from 'dotenv';
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import http from 'http'; // Import Node's HTTP module
// import { Server as SocketIOServer } from 'socket.io';
// import { DB_URL, APP_PORT } from './config/server.js';
// import userRoutes from './routes/userRoutes.js';
// import messagesRoutes from './routes/messagesRoutes.js';

// dotenv.config();

// const app = express();

// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };


// mongoose.connect(DB_URL,
//   { useNewUrlParser: true, 
//    useUnifiedTopology: true });


// app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // establishing routers
// app.use("/api/auth",userRoutes)
// app.use("/api/messages", messagesRoutes);





// // establishing connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("DB connected SUCCESSFULLY....");
// });


// const PORT = process.env.PORT || 5000;
// app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`));

// // Socket.io logic
// const onlineUsers = new Map();

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('add-user', (userId) => {
//     onlineUsers.set(userId, socket.id);
//     console.log('User added:', userId);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     // Remove user from onlineUsers map
//     onlineUsers.forEach((value, key) => {
//       if (value === socket.id) {
//         onlineUsers.delete(key);
//       }
//     });
//   });
// });
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http'; // Import Node's HTTP module
import { Server as SocketIOServer } from 'socket.io';
import { DB_URL, APP_PORT } from './config/server.js';
import userRoutes from './routes/userRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server instance

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routers
app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

server.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`);
});

// Initialize socket.io
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// Socket.io logic
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log('User added:', userId);
  });

  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.io);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from onlineUsers map
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});

// MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});
