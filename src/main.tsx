import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import LocalStorageProvider from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LocalStorageProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LocalStorageProvider>
);
