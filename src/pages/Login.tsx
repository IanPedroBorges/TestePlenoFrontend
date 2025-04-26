import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

import {
  validateEmail,
  validatePassword,
} from "../validations/ValidationsInputsUser";

import style from "../styles/login.module.css";

import { LocalStorageContext } from "../context/LocalStorageContext";
import { initialLoginState, LoginType } from "../types/localStorageType";

import { ResponseLogin } from "../Mocks/login";

export default function Login() {
  const [inputsLogin, setInputsLogin] = useState<LoginType>(initialLoginState);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login, setLogin } = useContext(LocalStorageContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (login.email) {
      setInputsLogin(login);
      setRemember(true);
    }
  }, [login]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsLogin((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailErr = validateEmail(inputsLogin.email);
    const passErr  = validatePassword(inputsLogin.password);
    if (emailErr.error || passErr.error) {
      setErrorMessage("Preencha corretamente os campos.");
      return;
    }

    const response = ResponseLogin({
      Email: inputsLogin.email,
      Senha: inputsLogin.password,
    });

    if (response.status === 200) {
      alert(response.data.mensagem);
      if (remember) setLogin(inputsLogin);
      else          setLogin(initialLoginState);
      navigate("/home");
    } else {
      setErrorMessage("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className={style.main}>
      <img src={logo} alt="logo" />

      <form className={style.form} onSubmit={handleLogin}>
        <h1 className={style.title}>Login</h1>

        <div>
          <label htmlFor="email" className={style.label}>E-mail</label>
          <input
            type="email"
            id="email"
            value={inputsLogin.email}
            onChange={handleInputChange}
            className={style.input}
          />
          {validateEmail(inputsLogin.email).error && (
            <p className={style.error}>
              {validateEmail(inputsLogin.email).message}
            </p>
          )}
        </div>

        <div className={style.passwordContainer}>
          <label htmlFor="password" className={style.label}>Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={inputsLogin.password}
            onChange={handleInputChange}
            className={style.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={style.eyeIcon}
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
          {validatePassword(inputsLogin.password).error && (
            <p className={style.error}>
              {validatePassword(inputsLogin.password).message}
            </p>
          )}
        </div>

        <div className={style.rememberContainer}>
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
            className={style.checkbox}
          />
          <label htmlFor="remember" className={style.rememberLabel}>
            Lembrar-me
          </label>
        </div>

        {errorMessage && <p className={style.error}>{errorMessage}</p>}

        <button type="submit" className={style.button}>Entrar</button>

        <p className={style.registerText}>Ainda não possui uma conta?</p>
        <Link to="/register" className={style.registerLink}>Cadastre-se</Link>
      </form>
    </div>
  );
}
