import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PortfolioProvider } from "./context/PortfolioContext";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
        <AuthProvider>
            <PortfolioProvider>
                <App />
            </PortfolioProvider>
        </AuthProvider>
    </BrowserRouter>
</HelmetProvider>
);