import { useContext } from 'react';

import DonateCard from '../../components/FoodCards/DonateCard'
import { MdAttachMoney } from "react-icons/md";

import { formatToColombianMoney } from '../../assets/constants.js';

import { useState } from 'react';

import PaymentForm from '../../components/Modals/PaymentForm.jsx';

import MyContext from '../../context.js';

const values = [
    {
      image: "https://www.valoraanalitik.com/wp-content/uploads/2022/09/Chocoramo.jpg",
      name: "Chocoramo",
      price: 3000
    },
    {
      image: "https://lanotapositiva.com/wp-content/uploads/2024/01/23471960_502982080070128_8485327596594136157_n.jpg",
      name: "Corrientazo",
      price: 15000
    },
    {
      image: "https://cdn.colombia.com/sdi/2024/11/08/el-pollo-asado-bajo-de-precio-en-colombia-y-en-varias-ciudades-celebran-por-buenas-noticias-con-la-inflacion-1262002.jpg",
      name: "Pollo asado",
      price: 35000
    },
    {
      image: "https://image.jimcdn.com/app/cms/image/transf/dimension=2140x10000:format=jpg/path/s79b46c029f74af8a/image/i8ef3d6ce27214cc4/version/1600381919/image.jpg",
      name: "Arroba de arroz",
      price: 50000
    }
];

function Donate() {
  const [donationAmount, setDonationAmount] = useState('');

  const { setPayAmount, setPayCardVisible} = useContext(MyContext);

  const donateMoney = (amount) => {
    setDonationAmount('');
    setPayAmount(amount);
    setPayCardVisible(true);
  }

  return (
    <>
    <PaymentForm />
    <div className='card' id='donate'>
        <h2>Dona un alimento</h2>
        
        <form className='foodCardSearch' onSubmit={(e)=>{
          e.preventDefault();
          if (donationAmount === '') return;
          if (donationAmount === '0') return;
          donateMoney(donationAmount)
        }}>
         <MdAttachMoney className='icon' />
          <input type="text" placeholder="Ingresa la cantidad a donar" value={formatToColombianMoney(donationAmount, true)} onChange={(e) =>setDonationAmount(e.target.value.replace(/\D/g, ""))} />
        </form>

        <p>O dona una cantidad preestablecida:</p>

        <div className="cardsContainer donate">
          {values.map((offer, index) => (
            <DonateCard key={index} offer={offer} onClick={()=>donateMoney(offer.price)} />
          ))}
        </div>
    </div>
    </>
  )
}

export default Donate