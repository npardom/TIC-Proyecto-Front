import { useContext } from "react";

import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaAt } from "react-icons/fa";

import { IoIosTime } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

import MyContext from "../../context.js";

import {formatToColombianMoney, formatToSpanishDate} from '../../assets/constants.js'

function ReservationCard({reservation, isBusiness=false}) {
  const{ checkValidity,putMessage, getAllReservations } = useContext(MyContext);

  async function deleteReservation() {
    var confirmDelete = confirm("¿Validar el retiro de esta reserva?")
    if (!confirmDelete) return
    fetch(import.meta.env.VITE_API_URL + "/reservation/deleteReservation/" + reservation._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': await checkValidity()
      }   
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.message ==='Reservation deleted successfully') {
        putMessage('Reserva eliminada con éxito')
        getAllReservations()
      }
    })
  }

  return (
    <div className='foodCard' style={{backgroundImage: `url(${reservation.offer.image})`}}>
      
      <div className='foodCardHeader3'>
      
        <div className='foodCardDateContainer'>
          <MdDateRange className='icon' />
          <p>Hasta {formatToSpanishDate(reservation.offer.expiration)}</p>
        </div>

        {isBusiness && 
        <div className='validateReservation' onClick={deleteReservation}>
          <FaCheckCircle/>
          <p>Validar reserva</p>
        </div>
        }
      </div>


      <div>
        <h3>{reservation.offer.name} (x{reservation.quantity})</h3>
        <p className='foodCardPrice'>{formatToColombianMoney(reservation.offer.price * reservation.quantity)}</p>
       </div>


      <div className='cardFooter4'>

        <div className="cardFooter5">

          {isBusiness &&
          <div className='cardFooter3'>
            <FaAt className='icon' />
            <p>{reservation.receiver.username}</p>
          </div>
          }

          <div className='cardFooter3'>
            <FaLocationDot className='icon' />
            <p>{reservation.offer.location}</p>
          </div>

          <div className='cardFooter3'>
            {reservation.isPaid ? <FaCheckCircle className='icon' /> : <IoIosTime className='icon' />}
            <p><b>{reservation.isPaid ? 'Pagado' : 'Pago en tienda'}</b></p>
          </div>


        </div>

        <div className='cardFooter2'>
          <p><b>Código de reserva</b></p>
          <p>{reservation._id}</p>
        </div>

      </div>

    </div>
  )
}

export default ReservationCard