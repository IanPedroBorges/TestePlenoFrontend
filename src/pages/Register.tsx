import React, { useState } from "react";
import style from "../styles/register.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../validations/ValidationsInputsUser";
import { RegisterType, initialRegisterState } from "../types/localStorageType";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const [inputs, setInputs] = useState<RegisterType>(initialRegisterState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const disableButton =
    validateName(inputs.username).error ||
    validateEmail(inputs.email).error ||
    validatePassword(inputs.password).error ||
    validateConfirmPassword(inputs.password, inputs.confirmPassword).error;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={logo} alt="Logo" className={style.logo} />
        <Link to="/" className={style.backButton}>
          Voltar
        </Link>
      </header>

      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={style.title}>Crie Sua Conta</h1>
        <p className={style.subtitle}>Rápido e grátis, vamos nessa</p>

        <div className={style.field}>
          <label htmlFor="username" className={style.label}>
            Nome
          </label>
          <input
            id="username"
            type="text"
            value={inputs.username}
            onChange={handleChange}
            placeholder="Digite aqui seu nome"
            className={style.input}
          />
          {validateName(inputs.username).error && (
            <p className={style.error}>
              {validateName(inputs.username).message}
            </p>
          )}
        </div>

        <div className={style.field}>
          <label htmlFor="email" className={style.label}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Digite aqui seu e-mail"
            className={style.input}
          />
          {validateEmail(inputs.email).error && (
            <p className={style.error}>{validateEmail(inputs.email).message}</p>
          )}
        </div>

        <div className={`${style.field} ${style.passwordField}`}>
          <label htmlFor="password" className={style.label}>
            Senha
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            onChange={handleChange}
            placeholder="Digite aqui sua senha"
            className={style.input}
          />
          <button
            type="button"
            className={style.eyeIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
          {validatePassword(inputs.password).error && (
            <p className={style.error}>
              {validatePassword(inputs.password).message}
            </p>
          )}
        </div>

        <div className={style.field}>
          <label htmlFor="confirmPassword" className={style.label}>
            Confirmar Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            onChange={handleChange}
            placeholder="Repita sua senha"
            className={style.input}
          />
          {validateConfirmPassword(inputs.password, inputs.confirmPassword)
            .error && (
            <p className={style.error}>
              {
                validateConfirmPassword(
                  inputs.password,
                  inputs.confirmPassword
                ).message
              }
            </p>
          )}
        </div>

        <div className={style.field}>
          <label htmlFor="bio" className={style.label}>
            Bio
          </label>
          <textarea
            id="bio"
            value={inputs.bio}
            onChange={handleChange}
            placeholder="Fale sobre você"
            className={style.textarea}
          />
        </div>

        <div className={style.field}>
          <label htmlFor="contact" className={style.label}>
            Contato
          </label>
          <input
            id="contact"
            type="text"
            value={inputs.contact}
            onChange={handleChange}
            placeholder="Opções de contato"
            className={style.input}
          />
        </div>
        <div className={style.field}>
          <label htmlFor="role" className={style.label}>
            Selecionar Cargo
          </label>
          <select
            id="role"
            value={inputs.role}
            onChange={handleChange}
            className={style.select}
          >
            <option value="" disabled>
              Escolha um cargo
            </option>
            <option value="FRONTEND">Desenvolvedor Front-end</option>
            <option value="BACKEND">Desenvolvedor Back-end</option>
            <option value="FULLSTACK">Desenvolvedor Full Stack</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={disableButton}
          className={style.button}
          onClick={() => {
            if (!disableButton) {
              navigate("/home");
            }
          }
          }
        >
          Registrar
        </button>
      </form>
    </div>
);
}
