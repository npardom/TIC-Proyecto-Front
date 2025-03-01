// React and React Router Imports
import {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context and Constants Import
import MyContext from '../../context.js';

function Login() {
  // Used to navigate between pages
  const navigate = useNavigate();

  // Global States
  const {setIsLogged, putMessage} = useContext(MyContext);

  // Local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validFields = (username !== '') && (password !== '') 

  // Function to send the login request
  const handleSubmit= (e) => {
    e.preventDefault()
    // Create body
    const body = { email: username, password: password }
    // Send request
    fetch(import.meta.env.VITE_API_URL + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    .then((res) =>  res.json())
    .then((res) => {
      if (res.error) {
        if (res.error === "User not found." || res.error === "Wrong password.") {
          putMessage("Correo y/o contraseña incorrectos.")
        }else{
          putMessage(res.error)
        }
      }else if (res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken)
        setIsLogged(true)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='card formCard'>
        <h2>Ingresar</h2>

        <input 
          type='email'
          placeholder='Correo electrónico'
          value={username}
          onChange = {(e) => setUsername(e.target.value)}
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
          <button type='submit' className={"secondary " + (!validFields ? "disabled":'')} disabled={!validFields}>Ingresar</button>
          <button type='button' onClick={() => navigate("/signup")} >Registrarse</button>
        </div>

    </form>
  )
}

export default Login