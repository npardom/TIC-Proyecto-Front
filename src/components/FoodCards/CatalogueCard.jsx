import {useContext} from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";

import {formatToColombianMoney, formatToSpanishDate} from '../../assets/constants.js'

import MyContext from "../../context.js";
import { useNavigate } from 'react-router-dom';

function CatalogueCard({offer}) {
  const { putMessage, checkValidity, isLogged } = useContext(MyContext);


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

  const navigate = useNavigate()

  return (
    <div className='foodCard' style={{backgroundImage: `url(${offer.image})`}}>
       <div className='catalogueCardHeader'>
        
        <div className='foodCardDateContainer'>
          <MdDateRange className='icon' />
          <p>Hasta <span>{formatToSpanishDate(offer.expiration)}</span></p>
        </div>

        <div className='foodCardDateContainer'>
          <FaStoreAlt  className='icon' />
          <p>Ofrecido por <span>{offer.businessName}</span></p>
        </div>
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

      <div className='cardFooter1'>
        <div className='offerUnitsInfo2'>
          <p>Unidades Disponibles</p>
          <p className='number'>{offer.available}</p>
        </div>

        <div className='catalogueCardButtonsContainer'>
          {isLogged && <button className="whiteNoBackground"
          onClick={()=> {buyRequest()}}>
            Solicitar donación
          </button>
          }

          <button className="white "
          onClick={()=> {
            if (!isLogged) {
              navigate("/login")
            }else{
              buyRequest()
            }
          }}>
            {isLogged ? "Comprar" : "Inicia sesión para comprar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CatalogueCard