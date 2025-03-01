// React and React Router Imports
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Context and Constants Import
import MyContext from '../../context.js';
import {isValidUsername} from '../../assets/constants.js';

function Signup() {
  // Local states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [type, setType] = useState("client");

  // Global States
  const { putMessage } = useContext(MyContext);

  const validFields = (type === "client" ? isValidUsername(username) : username !== '') && (email !== '') && (password !== '') && (password === password2)

  // Navigate function
  const navigate = useNavigate()

  // Function to send the signup request
  const handleSubmit = (e) => {
    e.preventDefault()
    // Create body
    const body = { username, email, password, type };
    
    // Send request
    fetch(import.meta.env.VITE_API_URL + "/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          if (res.error === "Username already exists.") { putMessage("Este nombre de usuario ya está registrado.") }
          else if (res.error === "Email already exists.") { putMessage("Este correo ya está registrado.") }
          else putMessage(res.error) 
        } else if (res.message && res.message === "User created.") {
          putMessage("Usuario creado. Ya puedes ingresar.")
          navigate("/login");
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className='card formCard'>
      <h2>Crear cuenta</h2>

      <p className='accountTypeTitle'>Tipo de cuenta</p>
      <div className="radioContainer signup">
        <button type="button" className={"radio " + (type === "client" ? "active" : "")}
            onClick={() => setType("client")}> 
          Cliente 
        </button>
        <button type="button" className={"radio " + (type === "business" ? "active" : "")}
            onClick={() => setType("business")}> 
          Negocio 
        </button>
      </div>

      <input
        required
        type='text'
        placeholder={type === "client" ? 'Nombre de usuario' : 'Nombre del negocio'}
        value={username}
        onChange={(e) => {
          if(type === "client") setUsername(e.target.value.replace(/\s/g, ''))
          else setUsername(e.target.value)  
        }}
      />

      <input
        type='email'
        placeholder='Correo electrónico'
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        required
      />

      <input
        type='password'
        placeholder='Contraseña'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type='password'
        placeholder='Confirmar contraseña'
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
      />

      

      <div className="buttonsContainer">
        <button type='submit' className={"secondary " + (!validFields ? "disabled":'')} disabled={!validFields}>Registrarse</button>
      </div>
    </form>
  )
}

export default Signup;
