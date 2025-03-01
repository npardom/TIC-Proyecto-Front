import { Scanner } from '@yudiel/react-qr-scanner';
import { useContext, useState, useEffect } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { TbQrcodeOff } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";

import MyContext from '../../context';

function QrScan({isVisible, setIsVisible}) {
  const { checkValidity, user, getAllReservations } = useContext(MyContext);

  const [resultVisible, setResultVisible] = useState(false);
  const [error, setError] = useState(false);

  const putResult = (error = false) => {
    setResultVisible(true)
    setError(error)
  }

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
      setIsVisible(false)
      if(res.error) putResult(true);
      if(res.message ==='Reservation deleted successfully') {
        putResult()
        getAllReservations()
      }
    })
  }

  // Set a timeout to hide the popUp after 2 seconds
  useEffect(() => {
    if(resultVisible) {
      setTimeout(() => {
        setResultVisible(false);
      }, 2000);
    }
  }, [resultVisible]);

  return (
    <>
    {user.type === "business" && 
      <>
      <div className={'card formCard' + (resultVisible ? ' visible' : '') + (error ? ' error' : '')} id='qrResult'>
        <IoCloseCircle className='closeIcon' onClick={()=>setResultVisible(false)}/>
        {error ? <TbQrcodeOff className='icon'/>:<FaRegCheckCircle className='icon'/>}
        <h3>{!error ? 'Retiro exitoso' : 'QR inválido'}</h3>
      </div>
      <div className={"modalContainer" + (isVisible ? ' visible' : '')}>	
          <div className={'card formCard' + (isVisible ? ' visible' : '')} id='qrScanContainer'>
            <IoCloseCircle className='closeIcon' onClick={()=>setIsVisible(false)}/>
            <p className='qrCodeTextDescription'>Escanea el <b>código QR</b> de la reserva para validar su retiro</p>
            {isVisible &&
            <Scanner onScan={(result) => deleteReservation(result[0].rawValue)} />
            } 
          </div>
      </div>
      </>
    }
    </>
  )
}

export default QrScan
