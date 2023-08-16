import React, { useState } from "react";
import axios from "axios";
import Footer from "../footer/Footer";
import styles from "../login/Login.module.css";
import { Link } from "react-router-dom";

const LOGIN_API_URL = "https://parseapi.back4app.com/login"; // Certifique-se de ter o endpoint correto para autenticação
const BACK4APP_GRAPHQL_ENDPOINT = "https://parseapi.back4app.com/graphql";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginHeaders = {
        "X-Parse-Application-Id": "lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh",
        "X-Parse-REST-API-Key": "8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08",
        "Content-Type": "application/json",
      };

      const loginResponse = await axios.post(
        LOGIN_API_URL,
        {
          username,
          password,
        },
        {
          headers: loginHeaders,
        }
      );

      const sessionToken = loginResponse.data.sessionToken;

      // Realizar consulta GraphQL após o login
      const graphQLQuery = `
        query GetUserQuery {
          getUser {
            objectId
            username
            email
          }
        }
      `;

      const graphQLHeaders = {
        "X-Parse-Application-Id": "lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh",
        "X-Parse-Session-Token": sessionToken,
        "Content-Type": "application/json",
      };

      const graphQLResponse = await axios.post(
        BACK4APP_GRAPHQL_ENDPOINT,
        { query: graphQLQuery },
        { headers: graphQLHeaders }
      );

      console.log("GraphQL response:", graphQLResponse.data);

      setUsername("");
      setPassword("");
      window.alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      window.alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__container__logo}>
          <img className="logo" src="..\src\assets\img\Logo.png" alt="logo" />
        </div>
        <div className={styles.login__container__form}>
          <h1>Login</h1>
          <form className={styles.form}>
            <p>Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>Password</p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              Show Password
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
          </form>
          <button className={styles.form__button} onClick={handleLogin}>
            Login
          </button>
          <h4>
            Don't have an account?{" "}
            <Link to="/register">
              <button className={styles.register_btn}>Register</button>
            </Link>
          </h4>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
