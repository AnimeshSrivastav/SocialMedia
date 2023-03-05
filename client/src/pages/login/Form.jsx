import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../states/auth";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialLoginValues = {
  email: "",
  password: "",
};

function Form() {
  const { user } = useSelector((store) => store.info);
  const [isLogin, changeLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const switchPage = () => {
    changeLogin((prev) => !prev);
  };

  const login = async (values, actions) => {
    const userLoginResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const userLoggedIn = await userLoginResponse.json();
    actions.resetForm();
    if (userLoggedIn) {
      dispatch(
        setLogin({
          user: userLoggedIn.user,
          token: userLoggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const register = async (values, actions) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const newUserRespose = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData,
    });

    const newUser = newUserRespose.json();
    actions.resetForm();

    if (newUser) {
      switchPage((prev) => !prev);
    }
  };

  const handleSubmitForm = async (values, actions) => {
    if (isLogin) {
      login(values, actions);
    }
    if (!isLogin) {
      register(values, actions);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitForm}
      initialValues={isLogin ? initialLoginValues : initialRegisterValue}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        handleReset,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <div className="form_container">
              <TextField
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                className="form__field"
                sx={{ m: 3 }}
              ></TextField>
              <TextField
                label="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                className="form__field"
                sx={{ m: 3 }}
              ></TextField>
              <Button
                type="submit"
                sx={{
                  m: "2rem 0 1rem 0",
                  p: "0.5rem  1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Submit
              </Button>
              <Typography variant="h6">
                Don't have an account?{" "}
                <Typography
                  onClick={() => {
                    resetForm();
                    switchPage();
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  Register here
                </Typography>
              </Typography>
            </div>
          ) : (
            <div className="form_container">
              <TextField
                label="FirstName"
                value={values.firstName}
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__field"
                sx={{ m: 2 }}
              ></TextField>
              <TextField
                label="Last Name"
                value={values.lastName}
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__field"
                sx={{ m: 2 }}
              ></TextField>

              <TextField
                label="Email"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__field"
                sx={{ m: 2 }}
              ></TextField>

              <TextField
                label="Password"
                value={values.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__field"
                sx={{ m: 2 }}
              ></TextField>
              <TextField
                label="Occupation"
                value={values.occupation}
                name="occupation"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__field"
                sx={{ m: 2 }}
              ></TextField>

              <TextField
                label="Location"
                value={values.location}
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ m: 2 }}
                className="form__field"
              ></TextField>

              <br />

              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getInputProps, getRootProps }) => (
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
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <div>
                        <p>{values.picture.name}</p>
                      </div>
                    )}
                  </Box>
                )}
              </Dropzone>
              <Button
                type="submit"
                sx={{
                  m: "2rem 0 1rem 0",
                  p: "0.5rem  1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </form>
      )}
    </Formik>
  );
}

export default Form;
