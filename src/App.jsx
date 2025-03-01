// React and React Router Imports
import { BrowserRouter  as Router, Routes, Route , Navigate, data} from 'react-router-dom';
import { useEffect, useState } from 'react'

// Context and Constants Import
import MyContext from './context.js';

// Component Imports
import PopUp from './components/Modals/PopUp.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Page Imports
import Login from './pages/notLogged/login.jsx';
import Signup from './pages/notLogged/signup.jsx';
import MainPage from './pages/notLogged/mainPage.jsx';
import Donate from './pages/notLogged/donate.jsx';

import Offers from './pages/logged/offers.jsx';
import CreateOffer from './pages/logged/createOffer.jsx';
import Reservations from './pages/logged/reservations.jsx';
import Catalogue from './pages/logged/catalogue.jsx';

// CSS Imports
import './styles/index.css'


function App() {
  // States to be used globally
  const [isLogged, setIsLogged] = useState(localStorage.getItem('accessToken'))
  const [popUpIsShown, setPopUpIsShown] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [user, setUser] = useState(localStorage.getItem('accessToken') || {})
  const [myOffers, setMyOffers] =useState([])

  const [payCardVisible, setPayCardVisible] = useState(false);
  const [payAmount, setPayAmount] = useState('');

  const [payCardOffer, setPayCardOffer] = useState({});

  const [offers, setOffers] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [donationRequestApproved, setDonationRequestApproved] = useState(false);

  // Function to show a pop up message
  const putMessage = (message) => {
    setPopUpMessage(message)
    setPopUpIsShown(true)
  }

  // Function to signout
  function signOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("donationId")
    setIsLogged(false)
    setUser({})
    setReservations([])
    setOffers([])
    setMyOffers([])
    setDonationRequestApproved(false)
    setPayAmount('')
    setPayCardVisible(false)
    setPayCardOffer({})
    setPopUpIsShown(false)
    setPopUpMessage('')
  }

  // Function to check token validity and refresh access token if it's expired
  async function checkValidity() { 
    return await fetch(import.meta.env.VITE_API_URL + "/user/authenticate", {
      method: "GET",
      headers: { "Content-Type": "application/json"  ,
                  "Authorization": localStorage.getItem("accessToken"),
               }
    })
    .then((res) => res.json())
    .then((res) => {
      // If access token is refreshed (or still valid), save it and set isLogged to true
      if (res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken)
        setIsLogged(true)
      }
      // If tokens are expired or there's an error, signout
      else if (res.error){ 
        signOut()
        putMessage("Tu acceso expiró. Por favor vuelve a ingresar.")
      }
      // Return the access token for further use
      return res.accessToken
    })
  }

  // Check token validity on page load
  useEffect(() => {
    if (localStorage.getItem("accessToken")){
      checkValidity() 
    }
  }, [])

  // Check token validity every 10 minutes (600.000 ms)
  useEffect(() => {
    if (isLogged){
      const interval = setInterval(checkValidity, 600000);
      return () => clearInterval(interval);
    }
  }, [isLogged])

  // Function to get offers from the business
  const getMyOffers = async () => {
    fetch(import.meta.env.VITE_API_URL + "/offer/getByBusiness", {
      method: "GET",
      headers: { "Content-Type": "application/json",
                "Authorization": await checkValidity() } 
    })
    .then((res) => res.json())
    .then((res) => setMyOffers(res))
  }

  // Function to get reservations from the user or business
  const getAllReservations = async () => 
    fetch(import.meta.env.VITE_API_URL + (user.type === "business" ? "/reservation/getByBusiness" : "/reservation/getByUser"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": await checkValidity()
      },
    })
    .then(res => res.json())
    .then(data => (setReservations(data), data));

  // Function to get all available offers
  const getAllOffers = async () => 
    fetch(import.meta.env.VITE_API_URL + '/offer/getAllAvailable')
    .then(res => res.json())
    .then(data => (setOffers(data), data));

    // Get user
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
  

  return (
    <MyContext.Provider value={{reservations, setReservations,getAllReservations, donationRequestApproved, setDonationRequestApproved,offers, getAllOffers, payCardOffer, setPayCardOffer,payAmount, setPayAmount, payCardVisible, setPayCardVisible, user, checkValidity , isLogged, setIsLogged ,signOut, putMessage, popUpIsShown, setPopUpIsShown, myOffers, setMyOffers, getMyOffers}}>
      <Router>
        <div className="appContainer">
          <PopUp message = {popUpMessage} />
          <Header/>
          <div className="content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<MainPage />} />
              <Route path="/login" element={!isLogged ? <Login />: <Navigate replace to={"/search"}/>} />
              <Route path="/signup" element={!isLogged ? <Signup />: <Navigate replace to={"/"}/>} />

              <Route path="/search" element={ <Catalogue /> } />
              <Route path="/donate" element={<Donate /> } />
              <Route path="/offers" element={isLogged ? <Offers /> : <Navigate replace to={"/login"}/>} />
              <Route path="/createOffer" element={isLogged ? <CreateOffer /> : <Navigate replace to={"/login"}/>} />

              <Route path="/reservations" element={isLogged ? <Reservations /> : <Navigate replace to={"/login"}/>} />
            </Routes>
          </div>
          <Footer/>  
        </div>   
      </Router>
    </MyContext.Provider>
  )
}

export default App