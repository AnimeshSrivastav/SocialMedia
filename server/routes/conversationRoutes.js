import express from 'express'
import {createNewConversation, getuserConversation} from '../controllers/conversation.js'

const router = express.Router()

router.post('/', createNewConversation)
router.get('/:userId', getuserConversation)
export default router
