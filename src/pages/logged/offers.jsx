import {  useEffect, useContext } from 'react';
import OfferCard from '../../components/FoodCards/OfferCard';

import { useNavigate } from 'react-router-dom';

import MyContext from '../../context.js';

function Offers() {
  const navigate = useNavigate();

  const { myOffers, getMyOffers} = useContext(MyContext);

  // Get the offers
  useEffect(()=> { getMyOffers() }, []);
  
  return (
    <div className='card' id='offers'>
        <div className='offersTitleContainer'>
          <h2>Mis ofertas</h2>
          <button className='secondary' onClick={() => navigate("/createOffer")}>Crear oferta</button>
        </div>
        {myOffers.length === 0 ? <p className='emptySectionText'>No tienes ninguna oferta actualmente.</p>:
        <div className="cardsContainer">
          {myOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
        }
    </div>
  )
}

export default Offers