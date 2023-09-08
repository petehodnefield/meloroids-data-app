import React, { useState, useContext, useEffect } from "react";
import { LOGIN } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../../utils/auth";
import Link from "next/link";

const LoginForm = () => {
  const inputStyle =
    "text-1  font-semibold border-light border-2 w-full h-12 rounded-lg pl-4 focus:outline-primary focus:duration-400";
  const labelStyle = "text-0.875 font-semibold mb-0.5";
  const formInputWrapperStyle = "flex flex-col w-full mb-4";
  const formExtraInputWrapperStyle = "flex flex-col w-full mb-2";

  // State handling login form information
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { client, loading, error, data }] = useMutation(LOGIN);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { username: userInfo.username, password: userInfo.password },
      });
      Auth.login(data.login.token);
      await client.resetStore();
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <form id="loginForm" onSubmit={(e) => handleFormSubmit(e)}>
      <div className={`${formInputWrapperStyle}`}>
        <label htmlFor="username" className={`${labelStyle}`}>
          Username
        </label>
        <input
          minLength={3}
          maxLength={20}
          id="username"
          type="text"
          required
          className={inputStyle}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
      </div>

      <div className={`${formExtraInputWrapperStyle} mb-6`}>
        <label htmlFor="password" className={`${labelStyle}`}>
          Password
        </label>
        <input
          minLength={8}
          maxLength={20}
          id="password"
          type="password"
          required
          className={inputStyle}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />

        {errorMessage ? (
          <p className="text-red font-semibold mt-3">{errorMessage}</p>
        ) : (
          ""
        )}
      </div>

      <button
        type="submit"
        className=" mb-6 bg-dark text-white  text-1 font-semibold h-12 w-full md:w-48 rounded  hover:opacity-80 duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
