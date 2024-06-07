import messageModel from '../model/messageModel.js';
import Message from '../model/messageModel.js';


const messageController = {
  async addMessage(req, res, next) {
  try{
    const {from,to,message}=req.body;
    const data=await Message.create({
      message:{text:message},
      users:[from,to],
      sender:from,
    });
    if(data) return res.json({msg:"Message added successfully."});
   return res.json({msg:"fallied to add msg."});
  }
  catch(ex){
    next(ex);
  }
  },



  async getAllMessage(req, res, next) {
  try{
    const{from,to}=req.body;
    const message=await messageModel.find({
      users:{
        $all:[from,to],
      },
    })
    .sort({updatedAt:1});
    const projectedMessages=message.map((msg)=>{
      return{
        fromSelf:msg.sender.toString()==from,
        message:msg.message.text,
      };
    });
    res.json(projectedMessages);
  }
  catch(ex){
    next(ex);
  }

  },


}
export default messageController;