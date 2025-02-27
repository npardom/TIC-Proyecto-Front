import FunctionalityCard from "./FunctionalityCard"

import savings from "../../assets/images/savings.png"
import help from "../../assets/images/help.png"
import gift from "../../assets/images/gift.png"

const functionalities = {
    "Consultar y reservar ofertas de comida <b>a precios muy bajos</b>": savings,
    "Solicitar apoyo mediante el programa <b>Dona un alimento</b>": help,
    "Ayudar a una persona mediante <b>donaciones anónimas</b>": gift
};
  
function Functionalities() {
    return (
        <div className="firstPageSection column" id = "functionalities">
            <h2>Con <b>La Pega</b>, podrás:</h2>
            <div className="cardsHolder">
                {Object.entries(functionalities).map(([text, image]) => <FunctionalityCard text={text} image={image} key={text} />)}
            </div>
        </div>
    );
}
  

export default Functionalities