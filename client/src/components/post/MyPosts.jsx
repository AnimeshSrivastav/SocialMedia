import { IconButton, InputBase, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../states/auth";
import FlexBetween from "../Wrappers/FlexBetween";
import ImageComponent from "../Wrappers/ImageComponent";

function MyPosts({ picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { user, token } = useSelector((store) => store.info);

  const handlePost = async () => {
    const formData = FormData();
    formData.append("userId", user._id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <Box>
      <FlexBetween>
        <ImageComponent image={picturePath} size="40px" />
        <InputBase
          placeholder="descripstion"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            borderRadius: "2rem",
            backgroundColor: palette.background.alt,
            padding: "1rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getInputProps, getRootProps }) => (
            <FlexBetween>
              <Box
                {...getRootProps()}
                sx={{
                  cursor: "pointer",
                  border: `1px solid ${palette.primary.dark}`,
                  p: "0 2rem",
                  mb: "2rem",
                }}
              >
                <input {...getInputProps()} />
                {!image  ? (
                  <p>Add Picture Here</p>
                ) : (
                  <div>
                    <p>{image.name}</p>
                  </div>
                )}
              </Box>
              {
                image &&(
                    <IconButton>
                        
                    </IconButton>
                )
              }
            </FlexBetween>
          )}
        </Dropzone>
      )}
    </Box>
  );
}

export default MyPosts;
