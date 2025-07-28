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
          <li key={item.title}>
            <img src={item.url} alt={item.title} width={40} />
            <span>{item.title}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
              <button onClick={() => updateQuantity(item.title, item.quantity - 1)} disabled={item.quantity <= 1} style={{padding: '0 7px'}}>–</button>
              <input
                type="number"
                min={1}
                value={qtyInputs[item.title] ?? item.quantity}
                onChange={e => handleInputChange(item.title, e.target.value)}
                onBlur={e => handleInputBlur(item.title, e.target.value)}
                onKeyDown={e => handleInputKeyDown(e, item.title, qtyInputs[item.title] ?? item.quantity.toString())}
                style={{ width: 38, textAlign: 'center', fontSize: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
              />
              <button onClick={() => updateQuantity(item.title, item.quantity + 1)} style={{padding: '0 7px'}}>+</button>
            </div>
            <span style={{ marginLeft: 8 }}> = ${item.price * item.quantity}</span>
            <button onClick={() => removeFromCart(item.title)} style={{ marginLeft: 8 }}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${total}</div>
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
};

export default CartDisplay;
