// React and React Router Imports
import { useContext, useEffect} from 'react';

// Context and Constants Import
import MyContext from '../../context.js';

function PopUp({message}) {
  // Global States
  const {setPopUpIsShown, popUpIsShown, popUpType } = useContext(MyContext);

  // Set a timeout to hide the popUp after 4 seconds
  useEffect(() => {
    if(popUpIsShown) {
      setTimeout(() => {
        setPopUpIsShown(false);
      }, 2000);
    }
  }, [popUpIsShown]);

  return (
    <div
      className={"popupBackground" + (popUpIsShown ? " show" : "")} onClick={() => setPopUpIsShown(false)}>
      <div className={"popUp " + popUpType + (popUpIsShown ? " show" : "")} onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className={"loader" + (popUpIsShown ? " show" : "")}></div>
      </div>
    </div>
  )
}

export default PopUp