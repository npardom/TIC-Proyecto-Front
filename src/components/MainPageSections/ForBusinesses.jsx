import store from '../../assets/images/store.png'
import { NavLink } from 'react-router-dom'

import { motion } from 'framer-motion'

function ForBusinesses() {
    return (
        <motion.div className="firstPageSection" id = "forBusinesses"
            initial={{ opacity: 0, y: 50}}
            whileInView={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
        >
            <div className="businessesTextContainer">
                <h2>¿Eres dueño de un negocio y quieres ofrecer tus productos?</h2>
                <p className='paragraph'>Con <b>La Página</b> puedes sacar provecho de aquellos productos próximos a vencer y ayudar a tu comunidad. Es muy sencillo.</p>
                <NavLink to="/login">Haz click aquí para comenzar</NavLink>
            </div>
            <img src={store} />
        </motion.div>
    )
}

export default ForBusinesses