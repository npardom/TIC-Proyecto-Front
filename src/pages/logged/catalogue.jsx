import { useState, useEffect } from 'react';
import CatalogueCard from '../../components/FoodCards/CatalogueCard.jsx';
import { FaSearch } from "react-icons/fa";

function Catalogue() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [businessFilters, setBusinessFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Function to get offers from the business
  const getOffers = () => {
    fetch(import.meta.env.VITE_API_URL + "/offer/getAllAvailable", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => res.json())
    .then((res) => {
      setOffers(res);
      generateBusinessFilters(res);
    });
  }

  // Generate business filters dynamically
  const generateBusinessFilters = (offers) => {
    const businessMap = {};
    offers.forEach(offer => {
      if (businessMap[offer.businessName]) {
        businessMap[offer.businessName] += 1;
      } else {
        businessMap[offer.businessName] = 1;
      }
    });
    const initialFilters = Object.keys(businessMap).reduce((acc, business) => ({ ...acc, [business]: true }), {});
    setBusinessFilters(initialFilters);
  };

  // Function to search and filter offers
  const filterOffers = () => {
    let filtered = offers;
    
    // Apply search filter
    const lowerCaseWord = searchTerm.toLowerCase();
    if (lowerCaseWord) {
      filtered = filtered.filter(offer => offer.name.toLowerCase().includes(lowerCaseWord) || offer.description.toLowerCase().includes(lowerCaseWord));
    }
    
    // Apply business filter
    const selectedBusinesses = Object.entries(businessFilters)
      .filter(([_, isChecked]) => isChecked)
      .map(([business]) => business);
    
    if (selectedBusinesses.length > 0) {
      filtered = filtered.filter(offer => selectedBusinesses.includes(offer.businessName));
    } else {
      filtered = [];
    }
    
    setFilteredOffers(filtered);
  };

  // Handle checkbox change
  const toggleBusinessFilter = (business) => {
    setBusinessFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [business]: !prevFilters[business] };
      return updatedFilters;
    });
  };

  // Update filtered offers when search term or filters change
  useEffect(() => { filterOffers(); }, [searchTerm, businessFilters]);

  useEffect(() => { getOffers(); }, []);
  
  return (
    <div className='card' id='catalogue'>
        <h2>Encuentra ofertas</h2>

        <div className='foodCardSearch'>
          <FaSearch className='icon' />
          <input type="text" placeholder="Buscar por producto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="catalogueContainer">

          <div className="filtersContainer">
            <h3>Tienda</h3>
            {Object.entries(businessFilters).map(([business, isChecked]) => (
              
              <label key={business} className="custom-checkbox">
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={() => toggleBusinessFilter(business)} 
              />
              <span className="checkmark"></span>
              <span>{business} ({offers.filter(o => o.businessName === business).length})</span>
              </label>
            ))}
          </div>
          {filteredOffers.length === 0 ? <p className='emptySectionText'>No se encontró ninguna oferta.</p>:
          <div className="cardsContainer">
            {filteredOffers.map((offer, index) => (
              <CatalogueCard key={index} offer={offer} />
            ))}
          </div>
          }

        </div>
    </div>
  );
}

export default Catalogue;