import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import styles from '../register/Register.module.css';
import { Link } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const headers = {
        'X-Parse-Application-Id': 'lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh',
        'X-Parse-REST-API-Key': '8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08',
        'X-Parse-Revocable-Session': '1',
        'Content-Type': 'application/json',
      };

      const userData = {
        username,
        password,
      };

      const response = await axios.post('https://parseapi.back4app.com/users', userData, { headers });

      console.log('Usuário cadastrado:', response.data);

      // Limpa os campos do formulário após o cadastro
      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <div className={styles.register__container__logo}>
          <img className="logo" src="..\src\assets\img\Logo.png" alt="logo" />
        </div>
        <div className={styles.register__container__form}>
          <h1>Register</h1>
          <form className={styles.form_register}>
            <p>Full Name</p>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <p>Username</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <p>E-mail</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>Password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>Confirm Password</p>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </form>
          <button className={styles.form__button_register} onClick={handleRegister}>
            CADASTRAR
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
