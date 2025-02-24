import logoWhite from '../assets/logos/logoWhite.png';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {

  return (
    <footer>
      <img src={logoWhite} className="logo" />
      <div className="divider"/>
      <div className="socialNetworks">
        <p>Conoce nuestras redes</p>
        <a href="https://www.facebook.com/" target='_blank'><FaFacebook className="icon" /></a>
        <a href="https://www.instagram.com/" target='_blank'><FaInstagram className="icon" /></a>
        <a href="https://www.whatsapp.com/" target='_blank'><FaWhatsapp className="icon" /></a>
      </div>
    </footer>

  )
}

export default Footer