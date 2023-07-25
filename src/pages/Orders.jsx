import React, {useState , useEffect} from 'react';
import Card from '../components/Card';
import axios from "axios";
import { Link } from 'react-router-dom';

function Orders() {
  const [orders , setOrders] = useState([]);
  
  // с помощью хука , получаем даннные с бэка . и с помощью reduce .Записываем их в orders. 
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://64a02e6ded3c41bdd7a713ff.mockapi.io/orders`);
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Error when requesting orders');
        console.error(error);
      }
    })();
  }, []);
  
  const renderItems= () =>{
    return (orders).map((item) => (
      <Card
        key={item.id}
        id ={item.id}
        titile={item.titile}
        price={item.price}
        imgUrl={item.imgUrl}
      />
    ))
  }
  return (
    <div className="content p-40">
      {/* если в массиве есть элементы рендерим эту часть кода */}
      {orders.length > 0 ? (
        <>
        <div div className="d-flex align-center mb-20">
          {/* сслыка на главную */}
        <Link to="/">
        <img className="arrow-back mr-10" src="/img/arrow-back.png" width={29} height={30} alt="arrow-back" />
        </Link>
        <h1>My orders</h1>
        </div>
          <div className="d-flex flex-wrap"> 
          {renderItems()}
        </div>
        </>
) : (
  // если массив пустой рендерим эту часть кода 
  <div>
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
          <img className="mb-20" width="70px" height="70px" src="/img/orders-smile.svg" alt="orders"></img>
          <h2>You have no orders</h2>
          <p className="opacity-6">Place at least one order.</p>
          {/* ссылка на главную */}
          <Link to="/">
            <button className="greenButton">
              <img src="img/arrow.svg" alt="Arrow"></img>
              Сome back
            </button>
          </Link>
        </div>
  </div>
)
}
</div>
  );
}
export default Orders;
