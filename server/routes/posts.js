import express from 'express'
import {getFeedPosts , getUserPosts, likePost} from '../controllers/posts.js'
import { verify } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getFeedPosts)
router.get('/:userid/posts ', getUserPosts)

router.patch('/:id/like', likePost)
export default router