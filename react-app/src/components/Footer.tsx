import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">🎄 Cajas Navideñas La Plata</h3>
          <p className="footer-description">
            Las mejores cajas navideñas con productos de calidad para hacer tu navidad especial
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Síguenos</h4>
          <div className="social-links">
            <a
              href="https://www.instagram.com/cajas_navidad_lp"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              📱 @cajas_navidad_lp
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contacto</h4>
          <div className="contact-info">
            <a
              href="https://wa.me/yourwhatsappnumber"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link whatsapp"
            >
              📱 WhatsApp: +542216143354
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Cajas Navideñas La Plata. Todos los derechos reservados.</p>
        <div className="footer-decoration">
          <span>🎁</span>
          <span>⭐</span>
          <span>🎄</span>
          <span>⭐</span>
          <span>🎁</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
