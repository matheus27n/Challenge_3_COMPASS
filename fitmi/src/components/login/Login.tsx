import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import styles from "../login/Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

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

      console.log("Usuário logado:", response.data);

      // Limpa os campos do formulário após o login
      setUsername("");
      setPassword("");
      window.alert("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
