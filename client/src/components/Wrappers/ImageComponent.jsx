import { borderRadius, Box } from "@mui/system";
import React from "react";

const ImageComponent = ({ image , size}) => {
  const dim = size || "60px"
  return (
    <Box sx={{ height: {dim}, width: {dim} }}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width= {dim}
        height={dim}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default ImageComponent;
