// src/pages/Register.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#01121F" }}
    >
      <form
        className=" py-12 rounded-2xl shadow-xl w-full max-w-md relative"
        style={{ backgroundColor: "#021A30", paddingInline: "2vw" }}
      >
        <h1 className="text-4xl mb-8 font-bold text-white text-center">
          Crie Sua Conta
        </h1>
        <p className="text-center text-sm mt-2" style={{ color: "#868E96" }}>
          Rápido e grátis, vamos nessa
        </p>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            Nome
          </label>
          <input
            id="username"
            type="text"
            value={inputs.username}
            onChange={handleChange}
            placeholder="Digite aqui seu nome"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block"
            style={{ height: "45px" }}
          />
          {validateName(inputs.username).error && (
            <p className="text-red-500 text-sm mt-1">
              {validateName(inputs.username).message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Digite aqui seu e-mail"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block"
            style={{ height: "45px" }}
          />
          {validateEmail(inputs.email).error && (
            <p className="text-red-500 text-sm mt-1">
              {validateEmail(inputs.email).message}
            </p>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            Senha
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            onChange={handleChange}
            placeholder="Digite aqui sua senha"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block"
            style={{ height: "45px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-full flex items-center justify-center text-white cursor-pointer"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </button>
          {validatePassword(inputs.password).error && (
            <p className="text-red-500 text-sm mt-1">
              {validatePassword(inputs.password).message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            Confirmar Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            onChange={handleChange}
            placeholder="Digite novamente sua senha"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block"
            style={{ height: "45px" }}
          />
          {validateConfirmPassword(inputs.password, inputs.confirmPassword)
            .error && (
            <p className="text-red-500 text-sm mt-1">
              {
                validateConfirmPassword(inputs.password, inputs.confirmPassword)
                  .message
              }
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={inputs.bio}
            onChange={handleChange}
            placeholder="Fale sobre você"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block resize-none"
            style={{ height: "80px" }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            Contato
          </label>
          <input
            id="contact"
            type="text"
            value={inputs.contact}
            onChange={handleChange}
            placeholder="Opções de"
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block"
            style={{ height: "45px" }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium mb-1"
            style={{ color: "#868E96" }}
          >
            Selecionar Cargo
          </label>
          <select
            id="role"
            value={inputs.role}
            onChange={handleChange}
            className="w-full p-3 rounded border border-[#F8F9FA] bg-gray-800 text-white block"
            style={{ height: "45px" }}
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
          type="button"
          disabled={disableButton}
          className="w-full py-2 rounded text-white font-semibold transition cursor-not-allowed"
          style={{ backgroundColor: "#8B3D07" }}
        >
          Registrar
        </button>

        <div className="mt-4 text-center">
          <Link to="/" className="hover:underline" style={{ color: "#f6f1f1" }}>
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
