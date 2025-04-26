// src/pages/Login.tsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

import {
  validateEmail,
  validatePassword,
} from "../validations/ValidationsInputsUser";

import { LocalStorageContext } from "../context/LocalStorageContext";
import { initialLoginState, LoginType } from "../types/localStorageType";

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
    const passErr = validatePassword(inputsLogin.password);
    if (emailErr.error || passErr.error) {
      setErrorMessage("Preencha corretamente os campos.");
      return;
    }

    if (
      inputsLogin.email === "usuario@exemplo.com" &&
      inputsLogin.password === "senha123"
    ) {
      if (remember) setLogin(inputsLogin);
      else setLogin(initialLoginState);
      navigate("/home");
    } else {
      setErrorMessage("Usuário ou senha inválidos.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#01121F" }}
    >
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="Logo" className="w-60 h-auto" />
      </div>

      <form
        onSubmit={handleLogin}
        className=" py-12 rounded-2xl shadow-xl w-full max-w-md relative"
        style={{ backgroundColor: "#021A30", paddingInline: "2vw" }}
      >
        <h1 className="text-4xl mb-8 font-bold text-white text-center">
          Login
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#767F89] mb-1"
            style={{ color: "#868E96" }}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white"
            value={inputsLogin.email}
            onChange={handleInputChange}
            style={{ height: "45px" }}
          />
          {validateEmail(inputsLogin.email).error && (
            <p className="text-red-500 text-sm mt-1">
              {validateEmail(inputsLogin.email).message}
            </p>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#767F89] mb-1"
            style={{ color: "#868E96" }}
          >
            Senha
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Senha"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white"
            value={inputsLogin.password}
            onChange={handleInputChange}
            style={{ height: "45px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 h-full text-white"
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </button>
          {validatePassword(inputsLogin.password).error && (
            <p className="text-red-500 text-sm mt-1">
              {validatePassword(inputsLogin.password).message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold transition"
          style={{ backgroundColor: "#8B1D07", cursor: "pointer" }}
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center mt-3">{errorMessage}</p>
        )}

        <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={remember}
              onChange={() => setRemember((prev) => !prev)}
            />
            Lembrar-me
          </label>
        </div>

        <p className="text-center mt-4" style={{ color: "#868E96" }}>
          Ainda não possui uma conta?
        </p>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full py-2 rounded text-white font-semibold transition mt-4"
          style={{ backgroundColor: "#868E96", cursor: "pointer" }}
        >
          Cadastre-se
        </button>
      </form>
    </div>
  );
}
