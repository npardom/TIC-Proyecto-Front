import { useContext, useState, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { GrLogout } from "react-icons/gr";

// Context and Constants Import
import MyContext from '../context.js';

// Function to check if the current path matches the button's path
const isActive = (path) => useLocation().pathname === path ? 'active' : '';

function UserMenu() {
  // Global States and Functions
  const { signOut, isLogged } = useContext(MyContext)

  // Local States
  const [user, setUser] = useState({})

  const navigate = useNavigate();

  // Define function to get user information
  const getUserInfo = async () => {
    fetch(API + "/user", {
      method: "GET",
      headers: { "Content-Type": "application/json",
                "Authorization": await checkValidity() } 
    })
    .then((res) => res.json())
    .then((res) => setUser(res))
  }

  // Get the user information from the database
  useEffect(()=> { 
    if (isLogged) getUserInfo();
  }, [isLogged]);

  // Define function to handle sign out
  function handleSignOut() {
    if (window.confirm("¿Estas seguro que deseas cerrar sesión?")) signOut()
  }

  return (
    <div className='userMenuContainer'>
      <button className={isActive(isLogged ? '/user' : '/login')}
      onClick={() => navigate(isLogged ? '/user' : '/login')}>
        {isLogged ? user.name : 'Ingresar'}
      </button>

      {isLogged && 
      <GrLogout className='signOutIcon' onClick={handleSignOut} title='Cerrar Sesión' />
      }

    </div>
  )
}

export default UserMenu