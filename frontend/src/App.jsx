import Header from "./components/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { CartProvider, useCartContext } from "./contexts/useCartContext";

// Componente principal do aplicativo
export default function App() {
    return (
        <section className="app-container">
            <CartProvider>
                <AppWithNavbar />
                <main className="app-main">
                    <Outlet />
                </main>
                <Footer />
            </CartProvider>
        </section>
    );
}

// Componente que renderiza o Navbar e calcula o total de itens
function AppWithNavbar() {
    const { cartItems } = useCartContext(); // Acessa o contexto do carrinho

    // Função para calcular o total de itens no carrinho
    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <Header totalItems={calculateTotalItems()} /> // Passa o total de itens para o Navbar
    );
}