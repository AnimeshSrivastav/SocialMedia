import express from 'express'
import {sendMessage , getUserMessages } from '../controllers/message.js'

const router = express.Router()

router.post("/", sendMessage)

router.get('/:conversationId', getUserMessages)

export default router
