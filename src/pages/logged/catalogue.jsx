import { useState, useEffect } from 'react';
import CatalogueCard from '../../components/FoodCards/CatalogueCard.jsx';
import { FaSearch } from "react-icons/fa";

function Catalogue() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [businessFilters, setBusinessFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [allSelected, setAllSelected] = useState(true);
  const [sortBy, setSortBy] = useState("date");

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

  const filterOffers = () => {
    let filtered = offers;
    
    const lowerCaseWord = searchTerm.toLowerCase();
    if (lowerCaseWord) {
      filtered = filtered.filter(offer => offer.name.toLowerCase().includes(lowerCaseWord) || offer.description.toLowerCase().includes(lowerCaseWord));
    }
    
    const selectedBusinesses = Object.entries(businessFilters)
      .filter(([_, isChecked]) => isChecked)
      .map(([business]) => business);
    
    if (selectedBusinesses.length > 0) {
      filtered = filtered.filter(offer => selectedBusinesses.includes(offer.businessName));
    } else {
      filtered = [];
    }
    
    if (sortBy === "date") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }
    
    setFilteredOffers(filtered);
  };

  const toggleBusinessFilter = (business) => {
    setBusinessFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [business]: !prevFilters[business] };
      setAllSelected(Object.values(updatedFilters).every(Boolean));
      return updatedFilters;
    });
  };

  const toggleAllFilters = () => {
    const newState = !allSelected;
    const updatedFilters = Object.keys(businessFilters).reduce((acc, business) => ({ ...acc, [business]: newState }), {});
    setBusinessFilters(updatedFilters);
    setAllSelected(newState);
  };

  const toggleSortBy = (key) => {
    setSortBy(prevSort => (prevSort === key ? "" : key));
  };

  useEffect(() => { filterOffers(); }, [searchTerm, businessFilters, sortBy]);
  useEffect(() => { getOffers(); }, []);

  return (
    <div className='card' id='catalogue'>
        <h2>Encuentra las mejores ofertas</h2>

        <div className='foodCardSearch'>
          <FaSearch className='icon' />
          <input type="text" placeholder="Buscar por producto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="catalogueContainer">

          <div className="filtersContainer">
            <h3>Filtrar por tienda</h3>
            <label className="custom-checkbox">
              <input type="checkbox" checked={allSelected} onChange={toggleAllFilters} />
              <span className="checkmark"></span>
              <span>Todas</span>
            </label>
            {Object.entries(businessFilters).map(([business, isChecked]) => (
              <label key={business} className="custom-checkbox">
              <input type="checkbox" checked={isChecked} onChange={() => toggleBusinessFilter(business)} />
              <span className="checkmark"></span>
              <span>{business} ({offers.filter(o => o.businessName === business).length})</span>
              </label>
            ))}

            <h3>Ordenar por</h3>
            <label className="custom-checkbox">
              <input type="checkbox" checked={sortBy === "date"} onChange={() => toggleSortBy('date')} />
              <span className="checkmark"></span>
              <span>Fecha</span>
            </label>
            <label className="custom-checkbox">
              <input type="checkbox" checked={sortBy === "price"} onChange={() => toggleSortBy('price')} />
              <span className="checkmark"></span>
              <span>Precio</span>
            </label>
          </div>

          {filteredOffers.length === 0 ? <p className='emptySectionText'>No se encontró ninguna oferta.</p> :
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
