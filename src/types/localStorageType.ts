export type LocalStorageType = {
    login: LoginType,
    setLogin: (login: LoginType) => void
}

export type LoginType = {
    email: string;
    password: string;
}

export const initialLoginState: LoginType = {
	email: '',
	password: ''
};

export type RegisterType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    bio: string;
    contact: string;
    role: "FRONTEND" | "BACKEND" | "FULLSTACK" | ""; 
  };
  
  export const initialRegisterState: RegisterType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    contact: "",
    role: "",
  };