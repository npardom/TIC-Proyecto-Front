// React and React Router Imports
import { BrowserRouter  as Router, Routes, Route , Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react'

// Context and Constants Import
import MyContext from './context.js';
import { API } from "./assets/constants.js"

// Component Imports
import PopUp from './components/Modals/PopUp.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Page Imports
import Login from './pages/notLogged/login.jsx';
import Signup from './pages/notLogged/signup.jsx';
import MainPage from './pages/notLogged/mainPage.jsx';

// CSS Imports
import './styles/index.css'

function App() {
  // States to be used globally
  const [isLogged, setIsLogged] = useState(localStorage.getItem('accessToken'))
  const [popUpIsShown, setPopUpIsShown] = useState(false)
  const [popUpType, setPopUpType] = useState('error')
  const [popUpMessage, setPopUpMessage] = useState('')

  // Function to show a pop up message
  const putMessage = (message, type = 'error') => {
    setPopUpMessage(message)
    setPopUpType(type)
    setPopUpIsShown(true)
  }

  // Function to signout
  function signOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setIsLogged(false)
    setPopUpMessage('') 
    setPopUpIsShown(false)
    setPopUpType('error')
  }

  // Function to check token validity and refresh access token if it's expired
  async function checkValidity() { 
    return await fetch(API + "/user/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json"  ,
                  "Authorization": localStorage.getItem("accessToken"),
               },
      body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken")})
    })
    .then((res) => res.json())
    .then((res) => {
      // If access token is refreshed (or still valid), save it and set isLogged to true
      if (res.accessToken) { 
        localStorage.setItem("accessToken", res.accessToken)
        setIsLogged(true)
      }
      // If tokens are expired or there's an error, signout
      else if (res.error){ signOut() }
      // Return the access token for further use
      return res.accessToken
    })
  }

  // Check token validity on page load
  //useEffect(() => { checkValidity() }, [])

  // Check token validity every 10 minutes (600.000 ms)
  useEffect(() => {
    if (isLogged){
      const interval = setInterval(checkValidity, 600000);
      return () => clearInterval(interval);
    }
  }, [isLogged])

  return (
    <MyContext.Provider value={{ checkValidity , isLogged, setIsLogged ,signOut, putMessage, popUpIsShown, setPopUpIsShown, popUpType }}>
      <Router>
        <div className="appContainer">
          <PopUp message = {popUpMessage} />
          <Header/>
          <div className="content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<MainPage />} />
              <Route path="/login" element={!isLogged ? <Login />: <Navigate replace to={"/"}/>} />
              <Route path="/signup" element={!isLogged ? <Signup />: <Navigate replace to={"/"}/>} />
            </Routes>
          </div>
          <Footer/>  
        </div>   
      </Router>
    </MyContext.Provider>
  )
}

export default App