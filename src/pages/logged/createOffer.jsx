// React and React Router Imports
import {  useContext,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TiDelete } from "react-icons/ti";

// Context and Constants Import
import MyContext from '../../context.js';

function CreateOffer() {

  // Used to navigate between pages
  const navigate = useNavigate();

  // Global States
  const { putMessage, user, checkValidity} = useContext(MyContext);

   // Check that the user is a business
  useEffect(()=> { 
    if(user.type === "client") navigate("/search");
  }, [user]);
   

  // Local states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [expiration, setExpiration] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  const [fileName, setFileName] = useState("");


  // Function to send the create offer request
  const handleSubmit = async(e) => {
    e.preventDefault()
    // Create body
    const body = { name, description, price, available,location,expiration, image }
    
    // Send request
    fetch(import.meta.env.VITE_API_URL + "/offer/create", {
      method: "POST",
      headers: { "Content-Type": "application/json",
            "Authorization": await checkValidity() } ,
      body: JSON.stringify(body)
    })
    .then((res) =>  res.json())
    .then((res) => {
      putMessage("Oferta creada con éxito.")
      navigate('/offers')
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    setFileName(file.name);
  
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert to Base64
  
    reader.onload = () => {
      setImage(reader.result); // Store Base64 string in state
    };
  
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  };
  
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

        <input
          type='text'
          placeholder='Ubicación'
          value={location}
          onChange = {(e) => setLocation(e.target.value)}
          required
        />

        <p className="imageLabel" >Imagen del producto</p>

        <div className='fileInputContainer'>
          <label className="imageButton" htmlFor="fileInput">Seleccionar</label>
          <input 
          type="file" 
          accept="image/*" 
          id="fileInput" 
          className="imageInput" 
          onChange={handleFileChange} 
          required
          />    
          {
            fileName !== '' &&
            <div className="fileIndicatorContainer">
              <div className='filename'>{fileName}</div>
              <TiDelete className="deleteIcon" onClick={() => {
                setFileName('');
                setImage('');
                document.getElementById('fileInput').value = ''; 
              }} />
            </div>
          }
        </div>

        <div className="buttonsContainer">
          <button type='submit' className="secondary">Crear oferta</button>
        </div>

    </form>
  )
}

export default CreateOffer