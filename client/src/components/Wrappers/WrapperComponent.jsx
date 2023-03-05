import { Box, styled } from "@mui/material";

const WrapperComponent = styled(Box)(({ theme }) => ({
    padding: "1rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
    height:"100%"
}));

export default WrapperComponent;
