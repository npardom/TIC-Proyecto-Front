import store from '../../assets/images/store.png'
import { NavLink } from 'react-router-dom'

function ForBusinesses() {
    return (
        <div className="firstPageSection" id = "forBusinesses">
            <div className="businessesTextContainer">
                <h2>¿Eres dueño de un negocio y quieres ofrecer tus productos?</h2>
                <p className='paragraph'>Con <b>La Página</b> puedes sacar provecho de aquellos productos próximos a vencer y ayudar a tu comunidad. Es muy sencillo.</p>
                <NavLink to="/login">Haz click aquí para comenzar</NavLink>
            </div>
            <img src={store} />
        </div>
    )
}

export default ForBusinesses