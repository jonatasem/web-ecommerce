import Header from "./components/header";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/useCartContext";

// Componente principal do aplicativo
export default function App() {
    return (
        <section className="app-container">
            <CartProvider>
                <Header />
                <Outlet />
            </CartProvider>
        </section>
    );
}