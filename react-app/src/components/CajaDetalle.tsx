import { useState, useEffect } from 'react';
import './CajaDetalle.css';

import { useCart } from '../context/CartContext';

type CajaDetalleProps = {
  caja: {
    title: string;
    description: string[];
    price: number;
    url: string;
  };
  onClose: () => void;
  showAddToCart?: boolean;
};

function CajaDetalle({ caja, onClose, showAddToCart }: CajaDetalleProps) {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [cantidadInput, setCantidadInput] = useState('1');
  const [agregado, setAgregado] = useState(false);

  // Efecto para prevenir scroll del body cuando el modal esté abierto
  useEffect(() => {
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart({
      title: caja.title,
      price: caja.price,
      url: caja.url,
      quantity: cantidad,
    });
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
      onClose();
    }, 1);
  };

  const handleInputChange = (value: string) => {
    setCantidadInput(value);
    if (value === '') {
      return; // Allow empty input temporarily
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setCantidad(numValue);
    }
  };

  const handleInputBlur = () => {
    if (cantidadInput === '' || parseInt(cantidadInput) < 1) {
      setCantidadInput('1');
      setCantidad(1);
    }
  };

  // WhatsApp/Instagram removido para flujo de carrito

  return (
    <div className="detalle-overlay" onClick={onClose}>
      <div className="detalle-container" onClick={(e) => e.stopPropagation()}>
        <button className="btn-cerrar" onClick={onClose}>
          ✕
        </button>
        
        <div className="detalle-content">
          <div className="detalle-imagen">
            <img src={caja.url} alt={caja.title} />
            <div className="detalle-badge">
              🎁 Oferta Especial
            </div>
          </div>
          
          <div className="detalle-info">
            <div className="detalle-header">
              <h2 className="detalle-titulo">{caja.title}</h2>
              <div className="detalle-decoracion">
                <span>🎄</span>
                <span>⭐</span>
                <span>🎁</span>
              </div>
            </div>
            
            <div className="detalle-descripcion">
              <h3 className="descripcion-titulo">📦 Contenido de la caja:</h3>
              <div className="descripcion-lista">
                {caja.description.map((item, index) => {
                    const [numero, ...resto] = item.split('-');
                    const texto = resto.join('-').trim();

                    return (
                             <div key={index} className="descripcion-item">
                                  <span className="item-numero">{numero.trim()}</span>
                                  <span className="item-texto">{texto}</span>
                             </div>
  );
})}
              </div>
            </div>
            
            <div className="detalle-precio-section">
              <div className="precio-info">
                <span className="precio-label">Precio unitario:</span>
                <span className="precio-valor">${caja.price.toLocaleString()}</span>
              </div>
              
              <div className="cantidad-selector">
                <label htmlFor="cantidad">Cantidad:</label>
                <div className="cantidad-controls">
                  <button 
                    className="btn-cantidad"
                    onClick={() => {
                      const newValue = Math.max(1, cantidad - 1);
                      setCantidad(newValue);
                      setCantidadInput(newValue.toString());
                    }}
                    disabled={cantidad <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="cantidad"
                    className="cantidad-input"
                    value={cantidadInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={handleInputBlur}
                    min="1"
                    max="999"
                  />
                  <button 
                    className="btn-cantidad"
                    onClick={() => {
                      const newValue = cantidad + 1;
                      setCantidad(newValue);
                      setCantidadInput(newValue.toString());
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="precio-total">
                <span className="total-label">Total:</span>
                <span className="total-valor">${(caja.price * cantidad).toLocaleString()}</span>
              </div>
            </div>
            
            {showAddToCart && (
              <div className="detalle-acciones">
                <button className="btn-comprar" onClick={handleAddToCart} disabled={agregado}>
                  {agregado ? '¡Agregado!' : '🛒 Agregar al carrito'}
                </button>
                <button className="btn-volver" onClick={onClose}>
                  ← Seguir viendo 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CajaDetalle;
