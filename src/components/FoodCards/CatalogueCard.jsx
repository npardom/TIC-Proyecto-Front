import {useContext} from 'react'
import { FaLocationDot } from "react-icons/fa6";

import {formatToColombianMoney, formatToSpanishDate} from '../../assets/constants.js'

import MyContext from "../../context.js";

function CatalogueCard({offer}) {
  const { putMessage, checkValidity } = useContext(MyContext);

  const buyRequest = async() => {
    var confirmDonate= confirm("¿Estás seguro de que deseas reservar esta oferta?")
    if (confirmDonate){
      fetch(import.meta.env.VITE_API_URL + "/offer/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                  "Authorization": await checkValidity() },
        body: JSON.stringify({offerId: offer._id})
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) putMessage(res.message)
        if (res.error) putMessage(res.error)
      })
    }
  }

  return (
    <div className='foodCard' style={{backgroundImage: `url(${offer.image})`}}>
      <div className='foodCardHeader'>
        <div>
          <h3>{offer.name}</h3>
          <p className='foodCardPrice'>{formatToColombianMoney(offer.price)}</p>
        </div>
        <div className='foodAvailabilityContainer'>
          <p>Disponible hasta</p>
          <p className='foodCardDate'>{formatToSpanishDate(offer.expiration)}</p>
        </div>
      </div>

      <div className='offerLocation'>
        <FaLocationDot className='icon' />
        <p>{offer.location}</p>
      </div>
      
      <p className='description'>{offer.description}</p>

      <div className='cardFooter1'>
        <div className='offerUnitsInfo2'>
          <p>Unidades Disponibles</p>
          <p className='number'>{offer.available}</p>
        </div>
        <button className="white" onClick={()=>buyRequest()}>Comprar</button>
      </div>
    </div>
  )
}

export default CatalogueCard