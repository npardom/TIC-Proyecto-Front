import store from '../../assets/images/store.png'
import { useContext } from 'react'

import { NavLink } from 'react-router-dom'

import MyContext from '../../context.js'

function ForBusinesses() {
    const {user, isLogged, putMessage} = useContext(MyContext)

    return (
        <div className="firstPageSection" id = "forBusinesses">
            <div className="businessesTextContainer">
                <h2>¿Eres dueño de un negocio y quieres ofrecer tus productos?</h2>
                <p className='paragraph'>Con <b>La Pega</b> puedes sacar provecho de aquellos productos próximos a vencer y ayudar a tu comunidad. Es muy sencillo.</p>
                {!isLogged ?
                <NavLink to='/login'>Haz click aquí para comenzar</NavLink>:
                isLogged && user.type === 'business' ?
                <NavLink to='/offers'>Haz click aquí para comenzar</NavLink>:
                <a className='fakeNav'
                    onClick={()=>putMessage("Necesitas una cuenta de negocio para acceder")}>Haz click aquí para comenzar</a>
                }   
            </div>
            <img src={store} />
        </div>
    )
}

export default ForBusinesses