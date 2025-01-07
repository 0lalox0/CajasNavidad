type Props = {
    url: string;
    title: string;
    description: string[];
    price: string;
}

function CardCaja (props: Props){
 const {url, title, description, price} = props;
  return (
    <div className="card" style={{ width: "350px" }}>
  <img src={url} className="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    {description.map((desc, index) => (
      <p key={index} className="card-text">{desc}</p>
    ))}

    <p className="card-text">{price}</p>
  </div>
</div>
  )
}

export default CardCaja