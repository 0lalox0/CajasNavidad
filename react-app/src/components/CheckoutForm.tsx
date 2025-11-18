import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutForm.css';

interface CheckoutFormProps {
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    formaPago: 'efectivo',
    zonaEnvio: '',
    calle: '',
    numero: '',
    indicaciones: ''
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    const detalleCompra = cart.map(item => 
      `${item.title} x${item.quantity} - $${item.price * item.quantity}`
    ).join('\n');

    const mensaje = `🎄 *NUEVO PEDIDO - CAJAS NAVIDEÑAS* 🎁

👤 *Cliente:*
Nombre: ${formData.nombre}
Apellido: ${formData.apellido}

💳 *Forma de pago:* ${formData.formaPago}

📍 *Zona de envío:* ${formData.zonaEnvio}

🛒 *Detalle de la compra:*
${detalleCompra}

💰 *Total: $${total}*

${formData.indicaciones ? `📝 *Indicaciones especiales:*\n${formData.indicaciones}` : ''}

¡Gracias por tu pedido! 🙌`;

    return encodeURIComponent(mensaje);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.zonaEnvio || !formData.calle || !formData.numero) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const mensaje = generateWhatsAppMessage();
    // IMPORTANTE: Reemplaza este número con tu número de WhatsApp real
    // Formato: código de país + número (sin espacios, guiones ni símbolos)
    // Ejemplo para Argentina: 5491134567890 (54 + 9 + 11 + número)
    const numeroWhatsApp = '5492216143354'; 
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(url, '_blank');
    
    // Limpiar carrito y cerrar formulario
    clearCart();
    onClose();
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>🎁 Finalizar Compra</h2>
          <button className="checkout-close" onClick={onClose}>✕</button>
        </div>

        <div className="checkout-content">
          <div className="order-summary">
            <h3>📋 Resumen del pedido</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.title} className="order-item">
                  <img src={item.url} alt={item.title} />
                  <div className="order-item-details">
                    <span className="order-item-title">{item.title}</span>
                    <span className="order-item-qty">Cantidad: {item.quantity}</span>
                    <span className="order-item-price">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <strong>Total: ${total}</strong>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>👤 Datos personales</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido *</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu apellido"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>💳 Forma de pago</h3>
              <div className="form-group">
                <select
                  id="formaPago"
                  name="formaPago"
                  value={formData.formaPago}
                  onChange={handleInputChange}
                  required
                >
                  <option value="efectivo">💵 Efectivo</option>
                  <option value="transferencia">🏦 Transferencia bancaria/Mercado Pago</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>📍 Información de envío</h3>
              <div className="form-group">
                <label htmlFor="zonaEnvio">Zona de envío *</label>
                <input
                  type="text"
                  id="zonaEnvio"
                  name="zonaEnvio"
                  value={formData.zonaEnvio}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: La Plata centro, Villa Elisa, Avellaneda, etc."
                />
              </div>
            </div>
            <div className="form-section">
              <h3>🏠 Dirección</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="calle">Calle *</label>
                  <input
                    type="text"
                    id="calle"
                    name="calle"
                    value={formData.calle}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Calle 44"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numero">Número *</label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 2347"
                  />
                </div>
              </div>
            </div>
            <div className="form-section">
              <h3>📝 Indicaciones adicionales</h3>
              <div className="form-group">
                <label htmlFor="indicaciones">Indicaciones especiales (opcional)</label>
                <textarea
                  id="indicaciones"
                  name="indicaciones"
                  value={formData.indicaciones}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Cualquier indicación especial para tu pedido..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-submit">
                🚀 Enviar pedido por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
