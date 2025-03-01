// React and React Router Imports
import { useContext, useEffect} from 'react';

// Context and Constants Import
import MyContext from '../../context.js';

function PopUp({message}) {
  // Global States
  const {setPopUpIsShown, popUpIsShown } = useContext(MyContext);

  // Set a timeout to hide the popUp after 4 seconds
  useEffect(() => {
    if(popUpIsShown) {
      setTimeout(() => {
        setPopUpIsShown(false);
      }, 2000);
    }
  }, [popUpIsShown]);

  return (
    <div className={"popUp " + (popUpIsShown ? " show" : "")}>
      <p>{message}</p>
      <div className={"loader" + (popUpIsShown ? " show" : "")}></div>
    </div>
  )
}

export default PopUp