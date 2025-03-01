import { useContext, useState, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

import { FaStoreAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

// Context and Constants Import
import MyContext from '../context.js';

// Function to check if the current path matches the button's path
const isActive = (path) => useLocation().pathname === path ? 'active' : '';

function UserMenu() {
  // Global States and Functions
  const { signOut, isLogged, user, setUser, checkValidity} = useContext(MyContext)

  const navigate = useNavigate();

  // Define function to get user information
  const getUserInfo = async () => {
    fetch(import.meta.env.VITE_API_URL + "/user/getUser", {
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
      <button onClick={() => !isLogged ? navigate('/login') : handleSignOut()}
      className={`userMenuButton ${isActive('/login')}`}
      title={isLogged ? 'Cerrar sesión' : 'Ingresar'}>
        {isLogged && user.type === 'business' &&
          <FaStoreAlt className='signOutIcon' />
        }
        {isLogged && user.type === 'client' &&
          <FaUserAlt className='signOutIcon' />
        }
        {isLogged ? user.username : 'Ingresar'}
        
      </button>

    </div>
  )
}

export default UserMenu