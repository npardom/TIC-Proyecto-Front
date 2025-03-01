import { Scanner } from '@yudiel/react-qr-scanner';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyContext from '../../context';

function ScanQR() {
  const { checkValidity,putMessage, user } = useContext(MyContext);
  const navigate = useNavigate();

  // Redirect to search if user is a client
    useEffect(()=> { if(user.type === "client") navigate("/search") }, [user]);

  async function deleteReservation(id) {
    fetch(import.meta.env.VITE_API_URL + "/reservation/deleteReservation/" + id, {
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
        navigate('/reservations')
      }
    })
  }

  return (
    <>
    {user.type === "business" &&
    <Scanner onScan={(result) => deleteReservation(result[0].rawValue)} />
    }
    </>
  )
}

export default ScanQR