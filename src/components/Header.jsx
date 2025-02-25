import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useContext, useState, useEffect } from 'react';
import MyContext from '../context.js';
import UserMenu from './UserMenu.jsx';
import logoDark from '../assets/logos/logoDark.png';


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged, putMessage, user } = useContext(MyContext);
  
  const [hasShadow, setHasShadow] = useState(false);

  // Function to check if the user has scrolled down
  const checkScroll = () => {
    setHasShadow(window.scrollY > 0); // Apply class only if scrolled down
  };

  // Effect to track scrolling
  useEffect(() => {
    checkScroll(); // Check initially
    window.addEventListener("scroll", checkScroll);
    
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Also check when navigating to a new route
  useEffect(() => {
    checkScroll();
  }, [location]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  function handleClick(path) {
    if (isLogged) navigate(path);
    else putMessage("Inicia sesión para acceder a esta página.");
  }

  return (
    <header className={hasShadow ? 'withShadow':''}>
      <div className='mainLogoContainer'>
        <img src={logoDark} alt="Logo" />
        <h1>La <b>Pagina</b></h1>
      </div>

      <nav className='headerNav'>
        <a className={'headerButton '+ isActive('/search')} onClick={() => handleClick('/search')}>
          <FaSearch className='searchIcon'/>
        </a>
        <a className={'headerButton '+ isActive('/')} onClick={() => navigate('/')}>
          Inicio
        </a>
        <a className={'headerButton '+ isActive('/donate')} onClick={() => handleClick('/donate')}>
          Dona una comida
        </a>
        {user && user.type === 'business' &&
          <a className={'headerButton '+ isActive('/offers')} onClick={() => handleClick('/offers')}>
            Mis ofertas
          </a>
        }
      </nav>

      <UserMenu />
    </header>
  );
}

export default Header;
