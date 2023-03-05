import express from "express";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formaattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formaattedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((ids) => ids !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formaattedFriends = friends.map(
      ({ _id, firstName, lastname, occupation, location, picturepath }) => {
        return { _id, firstName, lastname, occupation, location, picturepath };
      }
    );

    res.status(200).json(formaattedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const randomUsers = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const randomUsers = [];
  for (let i = 0; i < 3; i++) {
    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
    if (
      !randomUsers.includes(randomUser.id) &&
      !user.friends.includes(randomUser._id)
    ) {
      randomUsers.push(randomUser[0]);
    }
  }
  res.status(200).json(randomUsers);
};
