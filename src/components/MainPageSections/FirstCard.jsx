import foodPlate from '../../assets/images/foodPlate.png'
import foodBag from '../../assets/images/foodBag.png'
import foodBox from '../../assets/images/foodBox.png'

import { motion } from 'framer-motion'

function FirstCard() {
  return (
    <motion.div className="firstPageSection" id = "firstCard"
        initial={{ opacity: 0, x:-50}}
        whileInView={{ opacity: 1, x: 0  }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
    >
        <img src={foodPlate} id="firstCardImage1" />
        <img src={foodBag} id="firstCardImage2" />
        <img src={foodBox} id="firstCardImage3" />
        
        <img src={foodPlate} id="firstCardImageBlank" />

        <div className="firstCardText">
            <h2>Una gran variedad de alimentos a menor costo</h2>
            <p>Con la página texto texto texto texto texto 
                texto texto texto texto texto texto 
                podrás podrás podrás podrás podrás 
                podrás podrás podrás podrás podrás podrás podrás 
                podrás podrás podrás podrás podrás.
            </p>
        </div>
    </motion.div>
  )
}

export default FirstCard