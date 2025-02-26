import { useState, useEffect, useContext } from 'react';
import CatalogueCard from '../../components/FoodCards/CatalogueCard.jsx';

import { FaSearch } from "react-icons/fa";

import MyContext from '../../context.js';

function Catalogue() {
  const { checkValidity} = useContext(MyContext);

  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

   // Function to get offers from the business
   const getOffers = async () => {
    fetch(import.meta.env.VITE_API_URL + "/offer/getAllAvailable", {
      method: "GET",
      headers: { "Content-Type": "application/json",
                "Authorization": await checkValidity() } 
    })
    .then((res) => res.json())
    .then((res) => setOffers(res))
  }

  const search = (e) => {
    e.preventDefault()
    alert(searchTerm)
  }

  // Get the offers
  useEffect(()=> { getOffers() }, []);
  
  return (
    <div className='card' id='catalogue'>
        <h2>Encuentra ofertas</h2>

        <form className='foodCardSearch' onSubmit={(e) => search(e)}>
          <FaSearch className='icon' />
          <input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </form>

        {offers.length === 0 ? <p className='emptySectionText'>No hay ninguna oferta actualmente.</p>:
        <div className="cardsContainer">
          {offers.map((offer, index) => (
            <CatalogueCard key={index} offer={offer} />
          ))}
        </div>
        }
    </div>
  )
}

export default Catalogue