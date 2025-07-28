import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartDisplay.css';

const CartDisplay = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return null;

  // Estado para los valores de los inputs de cantidad, indexado por título
  const [qtyInputs, setQtyInputs] = useState<{ [title: string]: string }>({});

  // Sincroniza los valores de los inputs con el carrito
  useEffect(() => {
    const newInputs: { [title: string]: string } = {};
    cart.forEach(item => {
      newInputs[item.title] = item.quantity.toString();
    });
    setQtyInputs(newInputs);
  }, [cart]);

  const handleInputChange = (title: string, value: string) => {
    setQtyInputs(prev => ({ ...prev, [title]: value }));
  };

  const handleInputBlur = (title: string, value: string) => {
    const val = parseInt(value, 10);
    if (!value || isNaN(val) || val < 1) {
      setQtyInputs(prev => ({ ...prev, [title]: '1' }));
      updateQuantity(title, 1);
    } else {
      updateQuantity(title, val);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, title: string, value: string) => {
    if (e.key === 'Enter') {
      const val = parseInt(value, 10);
      if (!value || isNaN(val) || val < 1) {
        setQtyInputs(prev => ({ ...prev, [title]: '1' }));
        updateQuantity(title, 1);
      } else {
        updateQuantity(title, val);
      }
    }
  };

  return (
    <div className="cart-display">
      <h3>🛒 Carrito</h3>
      <ul>
        {cart.map(item => (
          <li key={item.title} className="cart-item">
            <div className="cart-item-img-title">
              <img src={item.url} alt={item.title} width={40} />
              <span className="cart-item-title">{item.title}</span>
            </div>
            <div className="cart-qty-controls">
              <button onClick={() => updateQuantity(item.title, item.quantity - 1)} disabled={item.quantity <= 1} className="cart-qty-btn">–</button>
              <input
                type="number"
                min={1}
                value={qtyInputs[item.title] ?? item.quantity}
                onChange={e => handleInputChange(item.title, e.target.value)}
                onBlur={e => handleInputBlur(item.title, e.target.value)}
                onKeyDown={e => handleInputKeyDown(e, item.title, qtyInputs[item.title] ?? item.quantity.toString())}
                className="cart-qty-input"
              />
              <button onClick={() => updateQuantity(item.title, item.quantity + 1)} className="cart-qty-btn">+</button>
            </div>
            <span className="cart-item-total">${item.price * item.quantity}</span>
            <button onClick={() => removeFromCart(item.title)} className="cart-remove-btn" title="Eliminar">✕</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${total}</div>
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
};

export default CartDisplay;
