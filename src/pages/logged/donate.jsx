import DonateCard from '../../components/FoodCards/DonateCard'

const requests = [
    {
      image: "https://www.elespectador.com/resizer/v2/QQPTUGKWUJHCFGLSSUZRLXHBSM.png?auth=ae5e249004bb22441948fdd0d19be0e0a4fb85aa8728fca9c44a1f14554c35b4&width=920&height=613&smart=true&quality=60",
      name: "Hamburguesa Clásica",
      description: "Deliciosa hamburguesa con carne de res, queso cheddar y vegetales frescos.",
      price: 5.99,
      available: 20,
      reserved: 5,
      expiration: "2025-03-10"
    },
    {
      image: "https://www.semana.com/resizer/dRqPnA3y--9HkjIcgQEHcjIwjV8=/arc-anglerfish-arc2-prod-semana/public/V65H6NID3FBLVGRHYB7J2OFROE.jpg",
      name: "Pizza Pepperoni",
      description: "Pizza artesanal con salsa de tomate, queso mozzarella y pepperoni.",
      price: 12.99,
      available: 0,
      reserved: 3,
      expiration: "2025-03-15"
    },
    {
      image: "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/JLYGWDUSXFDI7ITQECOXNAG674.jpg",
      name: "Sushi Variado",
      description: "Bandeja con 12 piezas de sushi fresco: nigiri, maki y sashimi.",
      price: 18.50,
      available: 10,
      reserved: 2,
      expiration: "2025-03-12"
    },
    {
      image: "https://www.elespectador.com/resizer/v2/DNKJ2AFQ4VBBVIEQ5ICCXCXO34.jpg?auth=f3bb96795db65e379eaea4de12a38d5df8017da3f5d9518738aa87e502c68dc5&width=920&height=613&smart=true&quality=60",
      name: "Pasta Alfredo",
      description: "Pasta fettuccine con salsa cremosa de queso parmesano y pollo.",
      price: 10.99,
      available: 25,
      reserved: 8,
      expiration: "2025-03-20"
    }
  ];

  const emptyrequests = [];
  

function Donate() {

  return (
    <div className='card' id='donate'>
        <h2>Dona una comida</h2>
        {requests.length === 0 ? <p className='emptySectionText'>No hay niguna petición actualmente.</p>:
        <div className="cardsContainer donate">
          {requests.map((offer, index) => (
            <DonateCard key={index} offer={offer} />
          ))}
        </div>
        }
    </div>
  )
}

export default Donate