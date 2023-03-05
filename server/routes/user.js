import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
  randomUsers,
} from "../controllers/users.js";
import { verify } from "../middleware/auth.js";
const router = express.Router();
 
router.get("/:id/friends", getUserFriends); //verify
router.get("/:id/randomUser", randomUsers);  //verify
router.get("/:id", getUser);  //verify

router.get('/:id/:friendId' , addRemoveFriends) //verify


export default router;
