import React, { useState } from "react";
import styled from "styled-components";
import { GetProfile, Login } from "../services/AuthService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import authStore from "../store/auth-store";

const UnauthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
  min-height: 100vh;
  margin: 0 auto;
  margin-bottom: 44px;
`;
const AuthCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
  margin: 0 0 10px;
  border: solid 1px #dbdbdb;
  background: white;
`;
const AuthInput = styled.input`
  background-color: #fafafa;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  padding: 9px 0 7px 8px;
  width: 100%;
  &::placeholder {
    color: #8e8e8e;
  }
  &:focus {
    outline: none;
    border: solid 1px rgb(168, 168, 168);
  }
`;

const InputContainer = styled.div`
  margin: 0 40px 6px;

  & small {
    color: red;
    font-size: 12px;
  }
`;

const AuthButton = styled.button`
  padding: 5px 9px;
  width: auto;
  margin: 0 40px;
  margin-top: 8px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  height: 30px;
  background: #0095f6;
  color: white;
  font-weight: bold;
`;

const AuthForgotLink = styled.a`
  margin-top: 12px;
  color: rgb(0, 55, 107);
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

const AuthRegister = styled.div`
  display: inline;
  text-align: center;
  font-size: 14px;
  margin: 15px;
  & > a {
    color: #0095f6;
  }
`;

const LogoContainer = styled.div`
  margin: 0 90px;
  margin-top: 60px;
  margin-bottom: 40px;
  & img {
    width: 100%;
  }
`;
const Unauth = observer(() => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleLogin();
    },
  });

  const handleLogin = async () => {
    await authStore.authenticate({ username: "bjing", password: "12345" });
  };

  return (
    <UnauthWrapper>
      <form onSubmit={formik.handleSubmit}>
        <AuthCard>
          <LogoContainer>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
              alt="instagram_logo"
            />
          </LogoContainer>
          <InputContainer>
            <AuthInput
              id="login"
              name="login"
              placeholder="username or email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.login}
            />
            {formik.touched.login && formik.errors.login ? (
              <small>{formik.errors.login}</small>
            ) : null}
          </InputContainer>
          <InputContainer>
            <AuthInput
              id="password"
              name="password"
              placeholder="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <small>{formik.touched.password && formik.errors.password}</small>
            ) : null}
          </InputContainer>
          <AuthButton type="submit">Login</AuthButton>
          <AuthButton
            onClick={() => {
              GetProfile().then((response) => {
                console.log(response.data);
              });
            }}
            type="button"
          >
            Profile
          </AuthButton>
          <AuthForgotLink>Forgot password?</AuthForgotLink>
        </AuthCard>
      </form>
      <AuthCard>
        <AuthRegister>
          Don't have an account? <a href="/">Register</a>
        </AuthRegister>
      </AuthCard>
    </UnauthWrapper>
  );
});
export default Unauth;
