import {
  DarkMode,
  LightMode,
  Notifications,
  Person,
  Chat,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { setmode } from "../../states/auth.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../Wrappers/FlexBetween";
import { useTheme } from "@emotion/react";

function Navbar() {
  const { mode } = useSelector((store) => store.info);
  const theme = useTheme();
  const primarylight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;

  const dispatch = useDispatch();
  return (
    <FlexBetween sx={{ height: "10vh" }}>
      <Typography
        variant="h1"
        sx={{ p: 2, fontWeight: 600, color: primaryDark }}
      >
        Social Media
      </Typography>
      <FlexBetween sx={{ m: 2, p: 1 }}>
        <IconButton color="primary" onClick={() => dispatch(setmode())}>
          {mode === "light" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton>
          <Notifications color="primary" sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton>
          <Chat color="primary" sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton>
          <Person color="primary" sx={{ fontSize: "25px" }} />
        </IconButton>
      </FlexBetween>
    </FlexBetween>
  );
}

export default Navbar;
