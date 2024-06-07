// messagesRoute.js
import express from 'express';
import messageController from '../controllers/messageController.js';  // Ensure the correct path

const router = express.Router();

router.post('/addmsg', messageController.addMessage);
router.post('/getmsg', messageController.getAllMessage);

export default router;

// import express from 'express';
// import { addMessage, getAllMessage } from '../controllers/messagesController.js';


// const router = express.Router();

// router.post('/addmsg', addMessage);
//  router.post('/getmsg', getAllMessage);
// export default router;
