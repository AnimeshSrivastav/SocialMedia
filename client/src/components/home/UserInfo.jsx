import { useTheme } from "@emotion/react";
import { LocationOn, ChatBubble, GroupRemove } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FlexBetween from "../Wrappers/FlexBetween";
import ImageComponent from "../Wrappers/ImageComponent";
import WrapperComponent from "../Wrappers/WrapperComponent";
import FriendsComponent from "./FriendsComponent";

function UserInfo() {
  const { user } = useSelector((store) => store.info);
  const { palette } = useTheme();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getUserFriends = async () => {
      const userFriends = await fetch(
        `http://localhost:3001/users/${user._id}/friends`,
        {
          method: "GET",
        }
      ).then((res) => res.json().then((data) => setFriends(data)));
    };
    getUserFriends();
  }, [user.friends]);

  return (
    <WrapperComponent sx={{ width: "20rem" }}>
      <FlexBetween>
        <ImageComponent image={user.picturePath} />
        <Box>
          <Typography variant="h4">
            {user.firstName}
            {user.lastName}
          </Typography>
          <Typography variant="h6">{user.friends.length} Friends</Typography>
        </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1rem 0rem" }} />
      <FlexBetween>
        <Box display="flex">
          <LocationOn />
          <Typography>{user.location}</Typography>
        </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1rem 0rem" }} />
      <Box>
        <Typography
          variant="h5"
          mb={2}
          color={palette.primary.main}
          sx={{ alignItem: "centre" }}
        >
          Friends
        </Typography>
          {friends.map((friend, index) => (
            <>
              <FlexBetween sx={{ margin: "1rem 0" }}>
                <FriendsComponent
                key={index}
                  image={friend.picturePath}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                />
                <Box display= "flex">
                  <Link to="/messages">
                    <IconButton>
                      <ChatBubble sx={{ mr: "0.5rem" }} />
                    </IconButton>
                  </Link>
                  <IconButton>
                    <GroupRemove />
                  </IconButton>
                </Box>
              </FlexBetween>
            </>
          ))}
      </Box>
    </WrapperComponent>
  );
}

export default UserInfo;
