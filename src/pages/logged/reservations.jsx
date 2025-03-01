import { useState, useEffect, useContext } from 'react';
import ReservationCard from '../../components/FoodCards/ReservationCard.jsx';
import { FaSearch } from "react-icons/fa";
import MyContext from '../../context.js';

import { IoQrCodeOutline } from "react-icons/io5";
import { formatCode } from '../../assets/constants.js'

import QrScan from '../../components/Modals/QrScan.jsx';

function Reservations() {
  const { user ,getAllReservations, reservations} = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedSearchTerm, setFormattedSearchTerm] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const fetchReservations = async () => {
    const reservations = await getAllReservations();
    setFilteredReservations(reservations);
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  useEffect(() => {
    setFilteredReservations(reservations.filter((reservation) => reservation._id.includes(searchTerm)));
  }, [searchTerm, reservations]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\W/g, '').toLowerCase();
    setSearchTerm(rawValue);
    setFormattedSearchTerm(formatCode(rawValue));
  };

  return (
    <>
    {user.type === "business" && <QrScan isVisible={isVisible} setIsVisible={setIsVisible} />}
    <div className='card' id='offers'>
      <h2>{user.type === "business" ? "Gestionar reservas" : "Mis reservas"}</h2>

      <div className='reservationsBar'>
      
        <form className='foodCardSearch' onSubmit={(e) => e.preventDefault()}>
          <FaSearch className='icon' />
          <input
            type="text"
            placeholder="Busca por código de reserva"
            value={formattedSearchTerm}
            onChange={handleInputChange}
          />
        </form>

        {user.type === "business" && 
          <button className='secondary qrButton'
            onClick={() => setIsVisible(true)}
            title='Escanear código QR'
          >
            <IoQrCodeOutline className='icon' />
          </button>
      }

      </div>
      
      
      {filteredReservations.length === 0 ? (
        <p className='emptySectionText'>No se encontró ninguna reserva.</p>
      ) : (
        <div className="cardsContainer">
          {filteredReservations.map((reservation, index) => (
            <ReservationCard key={index} reservation={reservation} isBusiness={user.type === "business"} />
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Reservations;
