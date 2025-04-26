import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/styles.css";

function App() {
  return (
    <main>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </main>
  );
}
//<Route path="/home" element={<Home />} />

export default App;
