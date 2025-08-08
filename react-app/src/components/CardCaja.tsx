import './CardCaja.css';

type Props = {
  url: string;
  title: string;
  description: string[];
  price: string;
  onCajaClick: () => void;
};

function CardCaja(props: Props) {
  const { url, title, description, price, onCajaClick } = props;
  
  const handleClick = () => {
    onCajaClick();
  };
  
  return (
    <div className="card-caja" onClick={handleClick}>
      <div className="card-image-container">
        <img src={url} className="card-image" alt={title} />
        <div className="card-overlay">
          <span className="card-overlay-text">Ver detalles</span>
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <div className="card-decoration">🎄</div>
        </div>
        
        <div className="card-description">
          {description.slice(0, 3).map((desc, index) => (
            <p key={index} className="description-item">
              • {desc}
            </p>
          ))}
          {description.length > 3 && (
            <p className="description-more">
              ... y {description.length - 3} productos más
            </p>
          )}
        </div>
        
        <div className="card-footer">
          <div className="price-container">
            <span className="price-label">Precio:</span>
            <span className="price-value">{price}</span>
          </div>
            <button className="btn-select" onClick={(e) => {
            e.stopPropagation();
            handleClick();
            }}>
            <span role="img" aria-label="lupa">🔍</span> Ver detalles
            </button>
        </div>
      </div>
      
      <div className="card-shine"></div>
    </div>
  );
}

export default CardCaja;
