// // config/server.js
// import dotenv from 'dotenv';
// dotenv.config();

// const APP_PORT = process.env.PORT || 3000;
// const DB_URL = process.env.MONGO_URI;

// module.exports = {
//     APP_PORT,
//     DB_URL
// };


import dotenv from 'dotenv';
dotenv.config();

export const{
    
    DB_URL,
    APP_PORT
    
}=process.env;