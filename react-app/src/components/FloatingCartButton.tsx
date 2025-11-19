// ...existing code...
import React from 'react';
import './FloatingCartButton.css';

const FloatingCartButton: React.FC = () => {
  const handleClick = () => {
    // Si quieres ir al top de la página:
    window.scrollTo({ top: 300, behavior: 'smooth' });

    // Si prefieres scrollear a un elemento con id="cart", usa:
    // document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      className="floating-cart-btn"
      aria-label="Ir al carrito"
      onClick={handleClick}
      title="Ver carrito"
      type="button"
    >
      🛒
    </button>
  );
};

export default FloatingCartButton;
// ...existing code...