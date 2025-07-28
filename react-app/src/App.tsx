import { useState } from "react";
import Titulo from "./components/Titulo";
import CardCaja from "./components/CardCaja";
import CajaDetalle from "./components/CajaDetalle";
import cajas from "./data/cajas.json";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import CartDisplay from "./components/CartDisplay";
import "./App.css";

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
            🎄 Descubre nuestras cajas navideñas especialmente preparadas para ti 🎁
            <br />
            ¡Con Envios particular a toda la Plata, Villa Elisa y alrededores!
            <br />
            ¡Tambien hacemos envios a Avellaneda, Buenos Aires y envios por correo a todo el pais!
            <br />
            <span className="subtitle-highlight">¡Haz tu pedido ahora!</span>
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
