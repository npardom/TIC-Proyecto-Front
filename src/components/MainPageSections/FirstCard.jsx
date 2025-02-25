import foodPlate from '../../assets/images/foodPlate.png'
import foodBag from '../../assets/images/foodBag.png'
import foodBox from '../../assets/images/foodBox.png'

function FirstCard() {
  return (
    <div className="firstPageSection" id = "firstCard"    >
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
    </div>
  )
}

export default FirstCard