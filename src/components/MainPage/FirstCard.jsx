import foodPlate from '../../assets/images/foodPlate.png'
import foodBag from '../../assets/images/foodBag.png'
import foodBox from '../../assets/images/foodBox.png'
import { useNavigate } from 'react-router-dom'

function FirstCard() {

  const navigate = useNavigate()
  return (
    <div className="firstPageSection" id = "firstCard"    >
        <img src={foodPlate} id="firstCardImage1" />
        <img src={foodBag} id="firstCardImage2" />
        <img src={foodBox} id="firstCardImage3" />
        
        <img src={foodPlate} id="firstCardImageBlank" />

        <div className="firstCardText">
            <h2>Una gran variedad de alimentos a menor costo</h2>
            <p>En <b>La Pega</b>, encontrarás una amplia oferta de alimentos cercanos a su fecha de consumo a precios reducidos.
              <br></br><br></br>
              Ahorra mientras ayudas a <b>reducir el desperdicio de comida.</b>
            </p>
            <button className="firstCardButton" onClick={()=>navigate('/search')}
            >Ir al catálogo</button>
        </div>
    </div>
  )
}

export default FirstCard