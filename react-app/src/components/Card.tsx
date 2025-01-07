interface CardProps {
  children?: React.ReactNode;
  url?: string;
}
function Card(props: CardProps) {
  const { children, url } = props;
  return (
    <div className="card" style={{ width: "350px" }}>
      <img src={url} className="card-img-top" alt="img de caja"></img>
      <div className="card-body">{children}</div>
    </div>
  );
}
interface CardBodyProps {
  titulo?: string;
  text?: string;
}
export function CardBody(props: CardBodyProps) {
  const { titulo, text } = props;
  return (
    <>
      <h5 className="card-title">{titulo}</h5>
      <p className="card-text">{text}</p>
    </>
  );
}
export default Card;
