import { Box, useTheme } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import FriendsComponent from "../home/FriendsComponent";
import FlexBetween from "../Wrappers/FlexBetween";
import { setCurrentChat } from "../../states/conversation.js";
import { useDispatch } from "react-redux";

function Conversation({ info }) {
  const friendId = info.member[1];
  const conversationId = info._id;
  const { palette } = useTheme();
  const [friend, setFriend] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const getFriendsDetails = async () => {
      const userRes = await fetch(`http://localhost:3001/users/${friendId}`, {
        method: "GET",
      }).then((res) => res.json().then((data) => setFriend(data)));
    };

    getFriendsDetails();
  }, []);

  return (
    <FlexBetween
      mt={2.5}
      sx={{ cursor: "pointer", backgroundColor: palette.background.messagebg }}
      onClick={() => {
        dispatch(
          setCurrentChat({
            currentChat: friendId,
            conversationId: conversationId,
          })
        );
      }}
    >
      <FriendsComponent
        image={friend.picturePath}
        firstName={friend.firstName}
        lastName={friend.lastName}
      />
    </FlexBetween>
  );
}

export default Conversation;
