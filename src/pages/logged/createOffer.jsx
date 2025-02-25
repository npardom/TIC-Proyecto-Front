// React and React Router Imports
import {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context and Constants Import
import MyContext from '../../context.js';
import { API } from "../../assets/constants.js"

function CreateOffer() {

  // Used to navigate between pages
  const navigate = useNavigate();

  // Global States
  const { putMessage} = useContext(MyContext);

  // Local states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [expiration, setExpiration] = useState("");

  // Function to send the create offer request
  const handleSubmit = (e) => {
    e.preventDefault()
    // Create body
    const body = { name, description, price, available, expiration }
    // Send request
    fetch(API + "/offer/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    .then((res) =>  res.json())
    .then((res) => {
      putMessage("Oferta creada con éxito.")
      navigate('/offers')
    })
  }

  return (
    <form onSubmit={handleSubmit} className='card formCard'>
        <h2>Añadir oferta</h2>

        <input 
          type='text'
          placeholder='Nombre del producto'
          value={name}
          onChange = {(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder='Descripción'
          value={description}
          onChange = {(e) => setDescription(e.target.value)}
          required
        />

        <input
          type='text'
          placeholder='Precio ($)'
          value={price}
          onChange = {(e) => setPrice(e.target.value)}
          required
        />

        <input
          type='text'
          placeholder='Unidades disponibles'
          value={available}
          onChange = {(e) => setAvailable(e.target.value)}
          required
        />

        <input
          type='date'
          placeholder='Fecha de expiración'
          value={expiration}
          onChange = {(e) => setExpiration(e.target.value)}
          required
        />

        <div className="buttonsContainer">
          <button type='submit' className="secondary">Crear oferta</button>
        </div>

    </form>
  )
}

export default CreateOffer