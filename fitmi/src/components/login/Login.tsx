import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import styles from "../login/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); 



  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setLoginError(""); 

    if (!username) {
      setUsernameError("Username  vazio.");
      return;
    }

    if (!password) {
      setPasswordError("Password vazio.");
      return;
    }

    try {
      const headers = {
        "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
        "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
        "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        "Content-Type": "application/json",
      };

      const loginQuery = `
        mutation LogIn($username: String!, $password: String!) {
          logIn(input: { username: $username, password: $password }) {
            viewer {
              user {
                id
                createdAt
              }
              sessionToken
            }
          }
        }
      `;

      const variables = {
        username,
        password,
      };

      const response = await axios.post(
        "https://parseapi.back4app.com/graphql",
        {
          query: loginQuery,
          variables: variables,
        },
        { headers }
      );

      if (response.data.data && response.data.data.logIn.viewer.user) {
        // User exists in the database, proceed with login
        console.log("User logged in:", response.data);
        setUsername("");
        setPassword("");
        window.alert("Login successful!");
        navigate("/");
      } else {
        // User does not exist in the database, show login error
        setLoginError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Invalid username or password. Please try again.");
    }
  };
  

  return (
    <div className={styles.login}>
    <div className={styles.login__container}>
      <Link to="/">
        <div className={styles.login__container__logo}>
          <img className="logo" src="..\src\assets\img\Logo.png" alt="logo" />
        </div>
      </Link>
      <h1>Login</h1>
      <div className={styles.login__container__form}>
          <form className={styles.form}>
            <p>Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={styles.error}>{usernameError}</p>
            <p>Password</p>
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.showPasswordIcon}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </span>
            </div>
            <p className={styles.error}>{passwordError}</p>
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
        {loginError && <p className={styles.error}>{loginError}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default Login;
