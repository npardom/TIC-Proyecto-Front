import { useState, useEffect, useContext, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

import CatalogueCard from "../../components/FoodCards/CatalogueCard.jsx";
import PaymentForm from "../../components/Modals/PaymentForm.jsx";

import MyContext from "../../context.js";

function Catalogue() {
  const { getAllOffers, offers, user } = useContext(MyContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [businessFilters, setBusinessFilters] = useState({});

  useEffect(() => {
    (async () => {
      const fetchedOffers = await getAllOffers();
      setBusinessFilters(
        fetchedOffers.reduce((acc, { user }) => ({ ...acc, [user.username]: true }), {})
      );
    })();
  }, []);

  const filteredOffers = useMemo(() => {
    return offers
      .filter(({ name, description, user }) => {
        const matchesSearch = [name, description].some(text =>
          text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesSearch && businessFilters[user.username];
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.expiration) - new Date(b.expiration);
        } else {
          return a.price - b.price;
        }
      });
  }, [offers, searchTerm, businessFilters, sortBy]);

  const toggleBusinessFilter = business => {
    setBusinessFilters(prev => ({ ...prev, [business]: !prev[business] }));
  };

  const toggleAllFilters = () => {
    const allSelected = Object.values(businessFilters).every(Boolean);
    setBusinessFilters(Object.keys(businessFilters).reduce((acc, business) => ({ ...acc, [business]: !allSelected }), {}));
  };

  return (
    <>
      <PaymentForm isOffer />
      <div className="card" id="catalogue">
        <h2>Encuentra las mejores ofertas</h2>

        <div className="foodCardSearch">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Buscar por producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="catalogueContainer">
          <div className="filtersContainer">
            <h3>Filtrar por tienda</h3>
            <label className="custom-checkbox">
              <input type="checkbox" checked={Object.values(businessFilters).every(Boolean)} onChange={toggleAllFilters} />
              <span className="checkmark"></span>
              <span>Todas</span>
            </label>
            {Object.entries(businessFilters).map(([business, isChecked]) => (
              <label key={business} className="custom-checkbox">
                <input type="checkbox" checked={isChecked} onChange={() => toggleBusinessFilter(business)} />
                <span className="checkmark"></span>
                <span>{business} ({offers.filter(o => o.user.username === business).length})</span>
              </label>
            ))}

            <h3>Ordenar por</h3>
            {["date", "price"].map((key) => (
              <label key={key} className="custom-checkbox">
                <input type="checkbox" checked={sortBy === key} onChange={() => setSortBy(key)} />
                <span className="checkmark"></span>
                <span>{key === "date" ? "Fecha más próxima" : "Precio más barato"}</span>
              </label>
            ))}
          </div>

          {filteredOffers.length === 0 ? (
            <p className="emptySectionText">No se encontró ninguna oferta.</p>
          ) : (
            <div className="cardsContainer">
              {filteredOffers.map((offer, index) => (
                <CatalogueCard key={index} offer={offer} isBusiness={user.type === "business"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Catalogue;