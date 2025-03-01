// React and React Router Imports
import { useContext, useRef, useEffect, useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import POS from '../../assets/images/pos.png';

import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

// Context and Constants Import
import MyContext from '../../context.js';
import { formatToColombianMoney, formatExpirationDate, formatCreditCardNumber, formatToSpanishDate } from '../../assets/constants.js';

function PaymentForm({isOffer=false}) {

    const canvasRef = useRef(null);

    function generateQRCode(id) {
        if (!canvasRef.current) return;
        QRCode.toCanvas(canvasRef.current, id);
    }

    // Global States
    const { donationRequestApproved, setDonationRequestApproved, getAllOffers, payCardOffer, setPayCardOffer, checkValidity , payCardVisible, setPayCardVisible, payAmount, setPayAmount} = useContext(MyContext);

    // Local States
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const [amount, setAmount] = useState(1);
    const [reservationCode, setReservationCode] = useState('');
    const [isPaid, setIsPaid] = useState(false);

    const handleCardNumberChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "").slice(0, 16);
        setCardNumber(rawValue);
    };

    const handleExpirationDateChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, "").slice(0, 4);
        
        // Check if user is deleting (avoiding forced "/")
        if (expirationDate.length > rawValue.length) {
            setExpirationDate(rawValue);
            return;
        }

        setExpirationDate(rawValue);
    };

    const handleCvvChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "").slice(0, 3);
        setCvv(rawValue);
    };

    const resetCardForm = () => {
        setPayCardVisible(false);
        setTimeout (() => {
            setCardNumber("");
            setExpirationDate("");
            setCvv("");
            setPayAmount("");
            setPayCardOffer({});
            setIsApproved(false);
            setAmount(1);
            setReservationCode('');
            setDonationRequestApproved(false);
        }, 500);
    };

    const donateMoney = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(import.meta.env.VITE_API_URL + "/donation/donate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await checkValidity()
            },
            body: JSON.stringify({ amount: payAmount })
        })
        .then((res) => res.json())
        .then(() => {
            setTimeout(() => {
                setIsLoading(false);
                setIsApproved(true);
            }, 2000);
        });
    };

    // Function to make a payment
    const makeReservation = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(import.meta.env.VITE_API_URL + "/reservation/makeReservation", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                    "Authorization": await checkValidity() },
            body: JSON.stringify({offerId: payCardOffer._id, isPaid: isPaid, quantity: amount })
        })
        .then((res) => res.json())
        .then((res) => {  
            setTimeout(() => {
                setIsLoading(false);
                setIsApproved(true);
                getAllOffers();
                setReservationCode(res.reservation._id);
            }, 2000);
        })
    }

    // Function to approve a donation request
    const approveDonation = () => {
        setPayCardVisible(true);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsApproved(true);
            getAllOffers();
            setReservationCode(localStorage.getItem("donationId"));
        }, 2000);
    }

    useEffect(() => {
        if (donationRequestApproved) approveDonation();
    }, [donationRequestApproved]);

    useEffect(() => {
        if (reservationCode) {
            generateQRCode(reservationCode);
            downloadDiv(reservationCode);
        }
    }, [reservationCode]);

    function downloadDiv(id) {
        const element = document.getElementById("donateForm");
        html2canvas(element).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = id + ".png";
            link.click();
        });
    }

    return (
      <div className={"modalContainer " + (payCardVisible ? "visible" : "")}>
        <form onSubmit={isOffer ? makeReservation : donateMoney} className={'card formCard' + (payCardVisible ? ' visible' : '') + (isLoading ? ' loading' : '')}
        id='donateForm'>
          {isLoading && 
            <AiOutlineLoading3Quarters className='loadingIcon' />
          } 

        {isApproved && 
            <>
                <IoCloseCircle className='closeIcon' onClick={resetCardForm} />
                <h3>{isOffer ? 'Tu reserva fue exitosa' : 'Tu donación fue exitosa'}
                </h3>
                {isOffer ?
                    <canvas ref={canvasRef} id="qrcanvas"></canvas>:
                    <FaRegCheckCircle className='approvedIcon' />
                }
                <p className='reservationCodeIntro'>{isOffer ? 'Tu código de reserva es' : 'Gracias por tu contribución.'}</p>
                {isOffer &&
                <>
                <p className='reservationCode'>{reservationCode}</p>
                <p className='justified'>
                    Para reclamar tu compra, debes ir al establecimiento <b>{payCardOffer.businessName}</b>, ubicado en <b>{payCardOffer.location}</b>.
                    <br/><br/><br/>
                    <i>Válido hasta {formatToSpanishDate(payCardOffer.expiration)}.</i>
                </p>
                </>
                }
            </>
        }

        {!isLoading &&  !isApproved && <>
          <IoCloseCircle className='closeIcon' onClick={resetCardForm} />
          <h2>{isOffer ? 'Reservar oferta' : 'Donar'}</h2>
            <div className='donateFormAmount'>
              <p>Valor a pagar</p>
              <p className='money'>{formatToColombianMoney(payAmount)}</p>
            </div>

            {isOffer &&

            <div className='donateFormAmount'>
              <p>Cantidad</p>
              <div className='amountContainer'>
                <button type ='button' className='noButton'><FaMinus className={'icon ' + (amount === 1 ? 'disabled' : '')} onClick={() => {
                    setAmount(amount - 1)
                    setPayAmount(payCardOffer.price * (amount - 1))
                }} /></button>
                <p className='money'>{amount}</p>
                <button type ='button' className='noButton'><FaPlus className={'icon ' + ((amount === 10 ||  amount === payCardOffer.available) ? 'disabled' : '')}  onClick={() => {
                    setAmount(amount + 1)
                    setPayAmount(payCardOffer.price * (amount + 1))
                }} /></button>
              </div>
            </div>
            }

        {isOffer && payCardOffer.price !== 0 &&
            <>
            <p>Método de pago</p>
            <div className="radioContainer">
                <button type="button" className={"radio " + (isPaid ? "active" : "")}
                    onClick={() => setIsPaid(true)}>
                Tarjeta 
                </button>
                <button type="button" className={"radio " + (!isPaid ? "active" : "")}
                    onClick={() => setIsPaid(false)}>
                Efectivo 
                </button>
            </div>
            </>
        }

            {(isOffer && !isPaid  && payCardOffer.price !== 0) && <p>Tendrás que pagar al reclamar tu pedido.</p>}

            {((isOffer && payCardOffer.price !== 0 && isPaid) || (!isOffer && payAmount !== 0)) &&
            <>
            <p>Por favor ingresa los datos de pago</p>

            <input
                type='text'
                placeholder='Número de tarjeta'
                value={formatCreditCardNumber(cardNumber)}
                onChange={handleCardNumberChange}
                required
            />

            <input
                type='text'
                placeholder='Fecha de expiración'
                value={expirationDate.length > 2 ? formatExpirationDate(expirationDate) : expirationDate}
                onChange={handleExpirationDateChange}
                required
            />

            <input
                type='text'
                placeholder='CVV'
                value={cvv}
                onChange={handleCvvChange}
                required
            />
            </>
            }

            <div className="buttonsContainer">
                <button type='submit' className="secondary">
                    {isOffer ? 'Reservar' : 'Donar'}
                </button>
            </div>
            </>
            }
        </form>

        <img src={POS} className={'POS ' + (isLoading ? 'visible' : '')} />
      </div>
    );
}

export default PaymentForm;
