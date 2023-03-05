import { Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ImageComponent from "../Wrappers/ImageComponent";

function Message({id, text}) {
  const { user } = useSelector((store) => store.info);
  const own = id === user._id ? true : false;
  const dir = own ? "row-reverse" : "row";
  const { palette } = useTheme();
  const { currentChat, conversationId } = useSelector(
    (store) => store.conversation
  );
  return (
    <Box m={2} style={{ display: "flex", flexDirection: dir }}>
      <ImageComponent image="info3.jpeg" size="30px" />
      <Typography
        borderRadius="1rem"
        padding="0.5rem"
        maxWidth="20rem"
        variant="h5"
        sx={
          own
            ? {
                mr: "10px",
                backgroundColor: palette.background.messagebg,
                color: "black",
              }
            : {
                ml: "10px",
                backgroundColor: palette.primary.dark,
                color: palette.background.default,
              }
        }
      >
       {text}
      </Typography>
    </Box>
  );
}

export default Message;
