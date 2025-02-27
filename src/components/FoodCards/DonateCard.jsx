import {formatToColombianMoney} from '../../assets/constants.js'


function DonateCard({offer, onClick}) {
  return (
    <div className='foodCard donateCard' 
    style={{backgroundImage: `url(${offer.image})`}}
    onClick={onClick}>
        <h3>{offer.name}</h3>
        <p className='foodCardPrice'>{formatToColombianMoney(offer.price)}</p>
    </div>
  )
}

export default DonateCard