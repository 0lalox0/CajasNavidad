import { useState, useEffect } from 'react';
import './CajaDetalle.css';

type CajaDetalleProps = {
  caja: {
    title: string;
    description: string[];
    price: number;
    url: string;
  };
  onClose: () => void;
};

function CajaDetalle({ caja, onClose }: CajaDetalleProps) {
  const [cantidad, setCantidad] = useState(1);
  const [mostrarContacto, setMostrarContacto] = useState(false);

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

  const handleComprar = () => {
    setMostrarContacto(true);
  };

  const handleWhatsApp = () => {
    const mensaje = `¡Hola! Me interesa la ${caja.title} (${cantidad} unidad${cantidad > 1 ? 'es' : ''}) por $${(caja.price * cantidad).toLocaleString()}. ¿Podrían darme más información?`;
    const numeroWhatsApp = "+542216143354"; // Reemplaza con tu número real
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

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
                {caja.description.map((item, index) => (
                  <div key={index} className="descripcion-item">
                    <span className="item-numero">{index + 1}</span>
                    <span className="item-texto">{item}</span>
                  </div>
                ))}
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
                    onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                    disabled={cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="cantidad-valor">{cantidad}</span>
                  <button 
                    className="btn-cantidad"
                    onClick={() => setCantidad(cantidad + 1)}
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
            
            {!mostrarContacto ? (
              <div className="detalle-acciones">
                <button className="btn-comprar" onClick={handleComprar}>
                  🛒 ¡Quiero esta caja!
                </button>
                <button className="btn-volver" onClick={onClose}>
                  ← Seguir viendo cajas
                </button>
              </div>
            ) : (
              <div className="contacto-section">
                <div className="contacto-mensaje">
                  <h4>🎉 ¡Excelente elección!</h4>
                  <p>Contáctanos para finalizar tu pedido:</p>
                </div>
                <div className="contacto-acciones">
                  <button className="btn-whatsapp" onClick={handleWhatsApp}>
                    📱 Contactar por WhatsApp
                  </button>
                  <button className="btn-instagram" onClick={() => window.open('https://www.instagram.com/cajas_navidad_lp', '_blank')}>
                    📷 Ver en Instagram
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CajaDetalle;
