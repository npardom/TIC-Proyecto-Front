import FunctionalityCard from "./FunctionalityCard"

import savings from "../../assets/images/savings.png"
import help from "../../assets/images/help.png"
import gift from "../../assets/images/gift.png"

import { motion } from "framer-motion"

const functionalities = {
    "Consultar y reservar ofertas de comida <b>a precios muy bajos</b>": savings,
    "Solicitar apoyo mediante el programa <b>Dona una Comida</b>": help,
    "<b>Ayudar</b> a una persona mediante compras anónimas": gift
};
  
function Functionalities() {
    return (
        <motion.div className="firstPageSection column" id = "functionalities"
            initial={{ opacity: 0, x: -50}}
            whileInView={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <h2>Con <b>La Pagina</b>, podrás:</h2>
            <div className="cardsContainer">
                {Object.entries(functionalities).map(([text, image]) => <FunctionalityCard text={text} image={image} key={text} />)}
            </div>
        </motion.div>
    );
}
  

export default Functionalities