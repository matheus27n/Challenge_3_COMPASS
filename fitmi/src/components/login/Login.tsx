import React, { useState } from "react";
import axios from "axios";
import Footer from "../footer/Footer";
import styles from "../login/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Novo estado para mostrar/esconder senha

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const headers = {
        "X-Parse-Application-Id": "lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh",
        "X-Parse-REST-API-Key": "8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08",
        "X-Parse-Revocable-Session": "1",
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `https://parseapi.back4app.com/login?username=${username}&password=${password}`,
        {
          headers,
        }
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
