import Header from "./components/header";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/useCartContext";
import { AuthProvider } from "./contexts/useAuthContext";

// Componente principal do aplicativo
export default function App() {
    return (
        <section className="app-container">
            <AuthProvider>
                <CartProvider>
                    <Header />
                    <Outlet />
                </CartProvider>
            </AuthProvider>
        </section>
    );
}