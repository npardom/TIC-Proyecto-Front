// React and React Router Imports
import { useContext, useEffect} from 'react';
import { IoMdCloseCircle } from "react-icons/io";

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
      }, 4000);
    }
  }, [popUpIsShown]);

  return (
    <div className={'popUp ' + popUpType + (popUpIsShown ? " show": "")} id = "popUpId" >
      <IoMdCloseCircle onClick={() => setPopUpIsShown(false)} className="closeIcon"/>
      <p>{message}</p>
      <div className={'loader' + (popUpIsShown ? " show": "")} ></div>
    </div>
  )
}

export default PopUp