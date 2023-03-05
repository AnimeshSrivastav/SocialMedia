import { useTheme } from "@emotion/react";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WrapperComponent from "../../components/Wrappers/WrapperComponent";
import Navbar from "../../components/home/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import FriendsComponent from "../../components/home/FriendsComponent";
import FeedItems from "../../components/home/FeedItems";
import UserInfo from "../../components/home/UserInfo";
import { setFriends, setLogin } from "../../states/auth";
import FlexBetween from "../../components/Wrappers/FlexBetween";
import MyPosts from "../../components/post/MyPosts";
function Home() {
  const { palette } = useTheme();
  const { user, token } = useSelector((store) => store.info);
  const [randomUser, setRandomUser] = useState([]);
  const [feed, setFeed] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getFeeds = async () => {
      const feeds = await fetch("http://localhost:3001/posts", {
        method: "GET",
      }).then((res) => res.json().then((data) => setFeed(data)));
    };
    getFeeds();
  }, []);

  useEffect(() => {
    const getRandomUser = async () => {
      const randomUsers = await fetch(
        `http://localhost:3001/users/63b474ac4910f1e684862e9f/randomUser`,
        {
          method: "GET",
        }
      ).then((res) =>
        res.json().then((data) => {
          setRandomUser(data);
        })
      );
    };
    getRandomUser();
  }, []);

  const getUserDetails = async () => {
    const userRes = await fetch(`http://localhost:3001/users/${user._id}`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        dispatch(
          setFriends({
            friends: data.friends,
          })
        );
      })
    );
  };

  const handleClick = async (friendId) => {
    const friends = await fetch(
      `http://localhost:3001/users/${user._id}/${friendId}`,
      {
        method: "GET",
      }
    );
    getUserDetails();
  };

  return (
    <>
      <Navbar />
      <Box display="flex" padding="1rem">
        <UserInfo />
        <Box sx={{ ml: "3rem", width: "30rem" }}>
          <Box>
            <MyPosts picturePath={user.picturePath} />
          </Box>
          <Divider />
          <Box>
            {feed.map((post, index) => (
              <FeedItems
                key={index}
                profilePicture={post.userPicturePath}
                fname={post.firstName}
                lname={post.lastName}
                post={post.picturePath}
              />
            ))}
          </Box>
        </Box>

        <WrapperComponent sx={{ ml: "3rem", width: "20rem" }}>
          <Typography
            variant="h5"
            mb={2}
            color={palette.primary.main}
            sx={{ alignItem: "centre" }}
          >
            Add Friends
          </Typography>

          {randomUser.map((friend, index) => (
            <>
              <FlexBetween>
                <FriendsComponent
                  key={index}
                  userId={user._id}
                  friendId={friend._id}
                  image={friend.picturePath}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                />
                <IconButton
                  sx={{ marginRight: "1rem" }}
                  onClick={() => handleClick(friend._id)}
                >
                  <GroupAddIcon />
                </IconButton>
              </FlexBetween>
              <Divider sx={{ margin: "0.8rem 0" }} />
            </>
          ))}
        </WrapperComponent>
      </Box>
    </>
  );
}

export default Home;
