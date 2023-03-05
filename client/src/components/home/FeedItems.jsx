import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import WrapperComponent from "../Wrappers/WrapperComponent";

function FeedItems({ profilePicture, post, fname, lname }) {
  return (
    <WrapperComponent
      sx={{ margin: "1rem 0", padding: "1rem", borderRadius: "10px" }}
    >
      <Box display="flex" alignItems="center">
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width="40px"
          height="40px"
          alt="user"
          src={`http://localhost:3001/assets/${profilePicture}`}
        />
        <Typography ml={2}>
          {fname}
          {lname}
        </Typography>
      </Box>
      <Divider sx={{ margin: "0.6rem 0" }} />
      <Box>
        <img
          style={{
            objectFit: "cover",
            borderRadius: "1px",
            maxHeight: "30rem",
          }}
          width="100%"
          height="100%"
          alt="user"
          src={`http://localhost:3001/assets/${post}`}
        />
      </Box>
    </WrapperComponent>
  );
}

export default FeedItems;
