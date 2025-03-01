import { useState, useEffect, useContext } from 'react';
import ReservationCard from '../../components/FoodCards/ReservationCard.jsx';
import { FaSearch } from "react-icons/fa";
import MyContext from '../../context.js';

function Reservations() {
  const { user ,getAllReservations, reservations} = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reservations = await getAllReservations();
      setFilteredReservations(reservations);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredReservations(reservations.filter((reservation) => reservation._id.includes(searchTerm)));
  }, [searchTerm, reservations]);

  return (
    <div className='card' id='offers'>
      <h2>{user.type === "business" ? "Gestionar reservas" : "Mis reservas"}</h2>
      
      <form className='foodCardSearch' onSubmit={(e) => e.preventDefault()}>
        <FaSearch className='icon' />
        <input
          type="text"
          placeholder="Busca por código de reserva"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      
      {filteredReservations.length === 0 ? (
        <p className='emptySectionText'>No se encontró ninguna reserva.</p>
      ) : (
        <div className="cardsContainer">
          {filteredReservations.map((offer, index) => (
            <ReservationCard key={index} offer={offer} isBusiness={user.type === "business"} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;
