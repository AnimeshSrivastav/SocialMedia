import Messages from "../models/Messages.js";

export const sendMessage = async (req, res) => {
  const { conversationId, senderId, text } = req.body;
  const newMessage = new Messages(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const allMessages = await Messages.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json(error);
  }
};
