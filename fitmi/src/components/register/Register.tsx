import React, { useState } from "react";
import axios from "axios";
import Footer from "../footer/Footer";
import styles from "../register/Register.module.css";
import { Link } from "react-router-dom";

interface SignUpInput {
  username: string;
  email: string;
  fullName: string;
  password: string;
}

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const headers = {
        "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
        "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
        "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        "Content-Type": "application/json",
      };

      const userExists = await checkUserExists(username, email);

      if (userExists) {
        setErrorMessage("Username or email already in use.");
        return;
      }

      const userData: SignUpInput = {
        username,
        email,
        fullName,
        password,
      };



      const registerQuery = `
        mutation SignUp($userData: SignUpInput!) {
          signUp(input: $userData) {
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
        userData,
      };

      const response = await axios.post(
        "https://parseapi.back4app.com/graphql",
        {
          query: registerQuery,
          variables: variables,
        },
        { headers }
      );

      console.log("Usuário cadastrado:", response.data);

      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      window.alert("Registro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      window.alert(
        "Ocorreu um erro ao cadastrar. Verifique seus dados e tente novamente."
      );
    }
  };

  const checkUserExists = async (username: string, email: string) => {
    try {
      const response = await axios.get(
        `https://parseapi.back4app.com/users?where={"$or":[{"username":"${username}"},{"email":"${email}"}]}`,
        {
          headers: {
            "X-Parse-Application-Id":
              "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
            "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
            "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.results.length > 0;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false;
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <Link to="/">
        <div className={styles.register__container__logo}>
          <img className="logo" src="../src/assets/img/Logo.png" alt="logo" />
        </div>
        </Link>
        <div className={styles.register__container__form}>
          <h1>Register</h1>
          <form className={styles.form_register}>
            <p>Full Name</p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p>Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>E-mail</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              title="Please enter a valid email address"
            />
            <p>Password</p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <p>Confirm Password</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
            <label>
              Show Password
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
            <p className={styles.error}>{errorMessage}</p>
          </form>
          <button
            className={styles.form__button_register}
            onClick={handleRegister}
          >
            CADASTRAR
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
