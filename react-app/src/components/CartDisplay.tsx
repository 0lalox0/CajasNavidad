import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartDisplay.css';

const CartDisplay = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return null;

  return (
    <div className="cart-display">
      <h3>🛒 Carrito</h3>
      <ul>
        {cart.map(item => {
          const [inputValue, setInputValue] = useState(item.quantity.toString());
          // Sincroniza inputValue si cambia el carrito externamente
          React.useEffect(() => {
            setInputValue(item.quantity.toString());
          }, [item.quantity]);
          return (
            <li key={item.title}>
              <img src={item.url} alt={item.title} width={40} />
              <span>{item.title}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
                <button onClick={() => updateQuantity(item.title, item.quantity - 1)} disabled={item.quantity <= 1} style={{padding: '0 7px'}}>–</button>
                <input
                  type="number"
                  min={1}
                  value={inputValue}
                  onChange={e => {
                    setInputValue(e.target.value);
                  }}
                  onBlur={e => {
                    const val = parseInt(e.target.value, 10);
                    if (!e.target.value || isNaN(val) || val < 1) {
                      setInputValue('1');
                      updateQuantity(item.title, 1);
                    } else {
                      updateQuantity(item.title, val);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const val = parseInt((e.target as HTMLInputElement).value, 10);
                      if (!e.currentTarget.value || isNaN(val) || val < 1) {
                        setInputValue('1');
                        updateQuantity(item.title, 1);
                      } else {
                        updateQuantity(item.title, val);
                      }
                    }
                  }}
                  style={{ width: 38, textAlign: 'center', fontSize: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <button onClick={() => updateQuantity(item.title, item.quantity + 1)} style={{padding: '0 7px'}}>+</button>
              </div>
              <span style={{ marginLeft: 8 }}> = ${item.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.title)} style={{ marginLeft: 8 }}>Eliminar</button>
            </li>
          );
        })}
      </ul>
      <div className="cart-total">Total: ${total}</div>
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
};

export default CartDisplay;
