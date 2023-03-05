import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FlexBetween from "../Wrappers/FlexBetween";

function FriendsComponent({ image, firstName, lastName }) {
  return (
    <FlexBetween>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width="40px"
        height="40px"
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
      <Typography ml={2}>
        {firstName}
        {lastName}
      </Typography>
    </FlexBetween>
  );
}

export default FriendsComponent;
