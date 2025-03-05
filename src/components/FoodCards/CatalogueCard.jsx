import {useContext} from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";

import {formatToColombianMoney, formatToSpanishDate} from '../../assets/constants.js'

import MyContext from "../../context.js";

function CatalogueCard({offer, isBusiness=false}) {
  const { setDonationRequestApproved, putMessage, setPayCardOffer, isLogged, setPayCardVisible, setPayAmount, checkValidity} = useContext(MyContext);

  const buyRequest = () => {
    setPayCardVisible(true)
    setPayAmount(offer.price)
    setPayCardOffer(offer)
  }

  // Function to request a donation
  const requestDonation = async () => {
    fetch(import.meta.env.VITE_API_URL + "/donation/requestDonation", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                "Authorization": await checkValidity() },
        body: JSON.stringify( {offerId: offer._id} )
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        putMessage(res.error)
      }
      else if (res.message && res.message === "Reserva creada exitosamente con fondos de donación") {
        setDonationRequestApproved(true)
        setPayCardOffer(offer)
        localStorage.setItem("donationId", res.reservation._id)
      }
    })
}

  return (
    <div className='foodCard' style={{backgroundImage: `url(${offer.image})`}}>
       <div className='catalogueCardHeader'>
        
        <div className='foodCardDateContainer'>
          <MdDateRange className='icon' />
          <p>Hasta <span>{formatToSpanishDate(offer.expiration)}</span></p>
        </div>

        <div className='foodCardDateContainer'>
          <FaStoreAlt  className='icon' />
          <p>Ofrecido por <span>{offer.user.username}</span></p>
        </div>
      </div>
  
        <div className='foodCardHeader'>
          <div>
            <h3>{offer.name}</h3>
            <p className='foodCardPrice'>
              {offer.price === 0 ? "Gratis ($0)" : formatToColombianMoney(offer.price)}
            </p>
          </div>
  
          <div className='offerLocation'>
            <FaLocationDot className='icon' />
            <p>{offer.location}</p>
          </div>
        </div>
        
        <p className='description'>{offer.description}</p>

      <div className='cardFooter1'>
        <div className='offerUnitsInfo2'>
          <p>Unidades Disponibles</p>
          <p className='number'>{offer.available}</p>
        </div>

        {!isBusiness &&
        <div className='catalogueCardButtonsContainer'>

        {offer.price > 0 &&
          <button className="whiteNoBackground"
          onClick={()=> {
            if (!isLogged) {
              putMessage("Debes iniciar sesión para usar esta función")
            }else{
              requestDonation()
            }
          }}>
            Solicitar donación
          </button>
        }
          
          <button className="white"
          onClick={()=> {
            if (!isLogged) {
              putMessage("Debes iniciar sesión para usar esta función")
            }else{
              buyRequest()
            }
          }}>
            Reservar
          </button>
        </div>
        }
      </div>
      
    </div>
  )
}

export default CatalogueCard