import { IoMdCloseCircle } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const deleteOffer = (id) => {
  var confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta oferta?")
  if (confirmDelete){
    // Delete offer with id
  }
}

function OfferCard({offer}) {
  return (
    <div className='foodCard offer' style={{backgroundImage: `url(${offer.image})`}}>
      
      <IoMdCloseCircle title='Borrar oferta' className='closeIcon' onClick={() => deleteOffer(offer.id)} />
      
      <div className='foodCardHeader'>
        <div>
          <h3>{offer.name}</h3>
          <p className='foodCardPrice'>${offer.price}</p>
        </div>
        <div>
          <p>Disponible hasta</p>
          <p className='foodCardDate'>{offer.expiration}</p>
        </div>
      </div>

      <p className='description'>{offer.description}</p>


      <div className='offerUnitsInfo'>
        <div className='offerAvailable'>
          <FaMinus className={'icon ' + (offer.available === 0 ? 'disabled' : '')} />
          <div className='availableInfo'>
            <p>Disponibles</p>
            <p className='number'>{offer.available}</p>
          </div>
          <FaPlus className='icon' />

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