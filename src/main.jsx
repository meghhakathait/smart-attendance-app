import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </AuthProvider>
      {/* authprovider mai wrap karege kiuki humko vo data sb jegh use krna hai */}
    </BrowserRouter>
    {/* BrowserRouter yahin kyu?
Kyuki poori application ko routing ki facility deni hoti hai. Agar BrowserRouter sirf AppRouter ke andar lagate, to uske bahar routing kaam nahi karti. Isliye ek hi baar sabse upar wrap karte hain. */}
  </StrictMode>,
);

// main.jsx → React application start karta hai.
