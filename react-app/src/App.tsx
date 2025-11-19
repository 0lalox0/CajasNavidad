import { useState } from "react";
import Titulo from "./components/Titulo";
import CardCaja from "./components/CardCaja";
import CajaDetalle from "./components/CajaDetalle";
import cajas from "./data/cajas.json";
import Footer from "./components/Footer";
import { CartProvider , useCart} from "./context/CartContext";
import CartDisplay from "./components/CartDisplay";
import "./App.css";
import FloatingCartButton from "./components/FloatingCartButton";
type Caja = {
  title: string;
  description: string[];
  price: number;
  url: string;
};

function App() {
  const [cajaSeleccionada, setCajaSeleccionada] = useState<Caja | null>(null);

  const handleCajaClick = (caja: Caja) => {
    setCajaSeleccionada(caja);
  };

  const handleCerrarDetalle = () => {
    setCajaSeleccionada(null);
  };
    // Wrapper que usa el hook dentro del provider y muestra el botón solo si hay items
  const FloatingButtonWrapper: React.FC = () => {
    const { cart } = useCart();
    if (!cart || cart.length === 0) return null;
    return <FloatingCartButton />;
  };
  return (
    <CartProvider>
      <div className="app-container">
        <div className="background-decoration">
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
        </div>
        <header className="header">
          <Titulo />
          <p className="subtitle">
            🎄 Descubrí nuestras cajas navideñas con productos de la mejor calidad 🎁
            <br />
            <span className="subtitle-highlight">¡El regalo perfecto para la familia o empleados en estas fiestas!</span>
            <br />
            <span className="subtitle-highlight">¡Llena tu carrito y hace tu pedido ahora!</span>
            <br />
            ¡Con Envios a todo el pais!
          </p>  
        </header>
        <CartDisplay />
        <main className="main-content">
          <div className="cajas-grid">
            {cajas.map((caja, index) => (
              <CardCaja
                key={index}
                url={caja.url}
                title={caja.title}
                description={caja.description}
                price={`$${caja.price}`}
                onCajaClick={() => handleCajaClick(caja)}
              />
            ))}
          </div>
        </main>
        <Footer />
        {cajaSeleccionada && (
          <CajaDetalle
            caja={cajaSeleccionada}
            onClose={handleCerrarDetalle}
            showAddToCart
          />
        )}
        <FloatingButtonWrapper />

      </div>
    </CartProvider>
  );
}

export default App;

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
