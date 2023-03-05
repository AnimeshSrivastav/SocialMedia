import { Box, width } from "@mui/system";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import WrapperComponent from "../../components/Wrappers/WrapperComponent";
import Navbar from "../../components/home/Navbar";
import Message from "../../components/conversation/Message";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, TextField, useTheme } from "@mui/material";
import FlexBetween from "../../components/Wrappers/FlexBetween";
import { useSelector } from "react-redux";
import UserConversation from "../../components/conversation/UserConversation";
import axios from "axios";

import { useRef } from "react";
function Conversation() {
  const { palette } = useTheme();
  const { user } = useSelector((store) => store.info);
  const [conversations, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const { currentChat, conversationId } = useSelector(
    (store) => store.conversation
  );
  useEffect(() => {
    const getUserConversation = async () => {
      const userConversations = await fetch(
        `http://localhost:3001/conversations/${user._id}`
      ).then((res) => res.json().then((data) => setConversation(data)));
    };

    getUserConversation();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      axios
        .get(`http://localhost:3001/messages/${conversationId}`)
        .then((res) => setMessages(res.data));
    };
    getMessages();
  }, [currentChat]);

  const sendMessage = async (values, actions) => {
    const sendMessage = {
      conversationId: conversationId,
      senderId: user._id,
      text: values.inputMessage,
    };

    axios
      .post(`http://localhost:3001/messages`, sendMessage)
      .then((res) => setMessages([...messages, res.data]));
    actions.resetForm();
  };
  return (
    <>
      <Navbar />
      <Box display="flex" mt="2remx">
        <WrapperComponent sx={{ width: "18rem", mr: "3rem" }}>
          {conversations.map((conversation) => (
            <UserConversation info={conversation} />
          ))}
        </WrapperComponent>
        <WrapperComponent
          sx={{
            width: "37rem",
            mr: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "30rem",
              overflowY: "scroll",
              scrollMargin: "10px",
            }}
          >
            {messages.map((message) => (
              <Message id={message.senderId} text={message.text} />
            ))}
          </div>
          <FlexBetween>
            <Formik onSubmit={sendMessage} initialValues={{ inputMessage: "" }}>
              {({
                handleChange,
                values,
                handleSubmit,
                handleBlur,
                handleReset,
                resetForm,
              }) => (
                <form>
                  <FlexBetween>
                    <TextField
                      value={values.inputMessage}
                      sx={{ width: "31rem", maxHeight: "100rem" }}
                      placeholder="Type your message here"
                      name="inputMessage"
                      onChange={handleChange}
                    />
                    <IconButton
                      onClick={handleSubmit}
                      sx={{
                        backgroundColor: palette.background.default,
                        m: 0.5,
                      }}
                    >
                      <SendIcon sx={{ color: palette.primary.main }} />
                    </IconButton>
                  </FlexBetween>
                </form>
              )}
            </Formik>
          </FlexBetween>
        </WrapperComponent>
      </Box>
    </>
  );
}

export default Conversation;
