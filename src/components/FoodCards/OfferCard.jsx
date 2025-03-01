import {useContext} from 'react'

import { IoMdCloseCircle } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

import {formatToColombianMoney, formatToSpanishDate} from '../../assets/constants.js'

import MyContext from "../../context.js";

function OfferCard({offer}) {
  const { putMessage, checkValidity, getMyOffers} = useContext(MyContext);

  const deleteOffer = async() => {
    var confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta oferta?")
    if (confirmDelete){
      fetch(import.meta.env.VITE_API_URL + "/offer/delete/" + offer._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                  "Authorization": await checkValidity() }
      })
      .then((res) => res.json())
      .then((res) => {
        putMessage("Oferta eliminada con éxito.")
        getMyOffers()
      })
    }
  }

  const changeAvailableAmount = async(change) => {
    fetch(import.meta.env.VITE_API_URL + "/offer/changeAvailableAmount/" + offer._id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
                "Authorization": await checkValidity() },
      body: JSON.stringify({change})
    })
    .then((res) => res.json())
    .then((res) => {
      getMyOffers()
    })
  }

  return (
    <div className='foodCard' style={{backgroundImage: `url(${offer.image})`}}>
      
      <IoMdCloseCircle title='Borrar oferta' className='closeIcon' onClick={() => deleteOffer()} />
      
      <div className='foodCardDateContainer'>
        <MdDateRange className='icon' />
        <p>Hasta {formatToSpanishDate(offer.expiration)}</p>
      </div>

      <div className='foodCardHeader'>
        <div>
          <h3>{offer.name}</h3>
          <p className='foodCardPrice'>{formatToColombianMoney(offer.price)}</p>
        </div>

        <div className='offerLocation'>
          <FaLocationDot className='icon' />
          <p>{offer.location}</p>
        </div>
      </div>

  
      
      <p className='description'>{offer.description}</p>


      <div className='offerUnitsInfo'>
        <div className='offerAvailable'>
          <button type ='button' className='noButton white'><FaMinus className={'icon ' + (offer.available === 0 ? 'disabled' : '')} onClick={() => changeAvailableAmount(-1)} /></button>
          <div className='availableInfo'>
            <p>Disponibles</p>
            <p className='number'>{offer.available}</p>
          </div>
          <button type ='button' className='noButton white'><FaPlus className='icon' onClick={() => changeAvailableAmount(1)} /></button>

        </div>

        <div className='offerReserved'>
          <p>Reservadas</p>
          <p className='number'>{offer.reserved}</p>
        </div>
      </div>

    </div>
  )
}

export default OfferCard