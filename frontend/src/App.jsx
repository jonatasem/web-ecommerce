import Header from "./components/headerComponent";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/useCartContext";

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
