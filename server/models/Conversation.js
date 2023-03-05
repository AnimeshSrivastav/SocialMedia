import mongoose from "mongoose";

//Contains the user IDS of two user 
const ConversationSchema = new mongoose.Schema({
    member:{
       type:Array
    }
})

const Conversation = mongoose.model("Conversation", ConversationSchema)
export default Conversation