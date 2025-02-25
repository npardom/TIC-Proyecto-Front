// React and React Router Imports
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Context and Constants Import
import { API } from "../../assets/constants.js"
import MyContext from '../../context.js';

function Signup() {
  // Local states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userType, setUserType] = useState("client");

  // Global States
  const { putMessage, setCurrentlyLoading } = useContext(MyContext);

  // Navigate function
  const navigate = useNavigate()

  // Function to send the signup request
  const handleSubmit = (e) => {
    setCurrentlyLoading(true)
    e.preventDefault()
    // Create body
    const body = { username, email, password, userType };
    
    // Send request
    fetch(API + "/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        setCurrentlyLoading(false)
        if (res.error) {
          if (res.error === "Username already exists.") { putMessage("Este nombre de usuario ya está registrado.") }
          else if (res.error === "Email already exists.") { putMessage("Este correo ya está registrado.") }
          else if (res.error === "Error sending email.") { putMessage("Ocurrió un error. Por favor, inténtalo de nuevo.") }
        } else if (res.message && res.message === "User created.") {
          putMessage("Usuario creado. Se envió un correo para verificar la cuenta.", 'good')
          navigate("/login");
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className='card'>
      <h2>Crear cuenta</h2>
      <input
        required
        type='text'
        placeholder='Nombre de usuario'
        value={username}
        onChange={(e) => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
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

      <p>Tipo de cuenta:</p>
      <div className="radioContainer">
        <button type="button" className={"radio " + (userType === "client" ? "active" : "")}
            onClick={() => setUserType("client")}> 
          Cliente 
        </button>
        <button type="button" className={"radio " + (userType === "business" ? "active" : "")}
            onClick={() => setUserType("business")}> 
          Negocio 
        </button>
      </div>

      <div className="buttonsContainer">
        <button type='submit' className="secondary">Registrarse</button>
      </div>
    </form>
  )
}

export default Signup;
