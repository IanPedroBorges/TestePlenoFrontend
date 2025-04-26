import React, { useState } from "react";
import style from "../styles/register.module.css";
import { Link } from "react-router-dom";
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

    <div className={style.main}>
      <header>
        <img src={logo} alt="Logo" />
        <Link to="/" className={style.link}>
            Voltar
          </Link>
      </header>
    </div>

  );
}
