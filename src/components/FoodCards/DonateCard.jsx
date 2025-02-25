const buyRequest = (id) => {
  var confirmDonate= confirm("¿Estás seguro de que deseas donar esta orden?")
  if (confirmDonate){
    // Donate order with id
  }
}

function DonateCard({offer}) {
  return (
    <div className='foodCard' style={{backgroundImage: `url(${offer.image})`}}>

      <div>
        <h3>{offer.name}</h3>
        <p className='foodCardPrice'>${offer.price}</p>
        <p className='description'>{offer.description}</p>
      </div>

      <button className="white" onClick={() => buyRequest(offer.id)}>Pagar orden</button>

    </div>
  )
}

export default DonateCard