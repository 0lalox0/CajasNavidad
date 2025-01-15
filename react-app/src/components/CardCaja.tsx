type Props = {
  url: string;
  title: string;
  description: string[];
  price: string;
};

function CardCaja(props: Props) {
  const { url, title, description, price } = props;
  const handleClick = () => {
    let str = "Click en la " + title;
    alert(str);
    //Rutear al detalle de la caja
  };
  return (
    <div className="card" style={{ width: "350px" }} onClick={handleClick}>
      <img src={url} className="card-img-top" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {/*{description.map((desc, index) => (
          <p key={index} className="card-text">
            {desc}
          </p>
        ))}*/}
        <p className="card-text" style={{ fontSize: "1.5em" }}>
          {price}
        </p>
      </div>
    </div>
  );
}

export default CardCaja;
