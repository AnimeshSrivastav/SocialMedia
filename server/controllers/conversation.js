import express from "express";
import Conversation from "../models/Conversation.js";

export const createNewConversation = async (req, res) => {
  const { userId, receiverId } = req.body;
  const newConversation = new Conversation({
    member: [userId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save()
    res.status(201).json(savedConversation)
  } catch (error) {
    res.status(500).json(error)
  }
};


export const getuserConversation= async (req, res)=>{
    const {userId} = req.params
    try {
        const userConversation = await Conversation.find({
            member:{$in : [userId]}
        })
        res.status(200).json(userConversation)
    } catch (error) {
        res.status(500).json(error)
    }
}
