// React and React Router Imports
import {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context and Constants Import
import MyContext from '../../context.js';
import { API } from "../../assets/constants.js"

function Login() {
  // Used to navigate between pages
  const navigate = useNavigate();

  // Global States
  const {setIsLogged, putMessage} = useContext(MyContext);

  // Local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to send the login request
  const handleSubmit = (e) => {
    e.preventDefault()
    // Create body
    const body = { username: username, email: username, password: password }
    // Send request
    fetch(API + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    .then((res) =>  res.json())
    .then((res) => {
      if (res.error) {
        if (res.error === "User not found." || res.error === "Wrong password.") {
          putMessage("Usuario y/o contraseña incorrectos.")
        }else if (res.error === "Unverified email.") {
          putMessage("La cuenta no ha sido verificada aún.")
        }
      }else if (res.accessToken && res.refreshToken) {
        localStorage.setItem("accessToken", res.accessToken)
        localStorage.setItem("refreshToken", res.refreshToken)
        setIsLogged(true)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='card'>
        <h2>Ingresar</h2>

        <input 
          type='text'
          placeholder='Usuario o correo electrónico'
          value={username}
          onChange = {(e) => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
          required
        />

        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="buttonsContainer">
          <button type='submit' className="secondary">Ingresar</button>
          <button type='button' onClick={() => navigate("/signup")} >Registrarse</button>
        </div>

    </form>
  )
}

export default Login