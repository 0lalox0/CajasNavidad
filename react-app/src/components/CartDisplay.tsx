import React from 'react';
import { useCart } from '../context/CartContext';
import './CartDisplay.css';

const CartDisplay = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return null;

  return (
    <div className="cart-display">
      <h3>🛒 Carrito</h3>
      <ul>
        {cart.map(item => (
          <li key={item.title}>
            <img src={item.url} alt={item.title} width={40} />
            <span>{item.title}</span> x{item.quantity} - ${item.price * item.quantity}
            <button onClick={() => removeFromCart(item.title)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${total}</div>
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
};

export default CartDisplay;
