import Info from "../Info";
import React, { useState , useContext } from "react";
import axios from "axios";
import { useCart } from "../../hook/useCart ";
import AppContext from "../../contex";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise ((resolve) =>setTimeout(resolve , ms))


function Drawer({ onCloseCart, onRemove , items = [] ,opened }) {
  const {setCartopened} = useContext(AppContext)
  // использовался костомный хук
  const {setCartItems , cartItems , totalPrise} = useCart()
  const [isOrderComplete , setisOrderComplete] = useState(false);
  const [orderId , setOrderId] = useState(null);
  const [isLoading , setIsloading] = useState(false)

  const addToOrder = async()=>{
    try{
      setIsloading(true)
      // при нажатии добавляет обьект в заказы orders на бэк
      const {data} = await axios.post(`https://64a02e6ded3c41bdd7a713ff.mockapi.io/orders` , {items : cartItems});
      // устанавливаем номер заказа 
      setOrderId (data.id)
      setisOrderComplete(true)
      // очищаем визуально корзину 
      setCartItems([])

      // цикл удаляет обьекты с бэка с cart
      for(let i=0 ; i< cartItems.length ; i++){
        const item = cartItems[i];
        axios.delete(`https://6463b8d3127ad0b8f88fbd53.mockapi.io/cart/${item.id}`)
        await delay(500);
      }
    }catch{
      alert("Error. I can't add order")
    }
    setIsloading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible: "" }`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Cart
          <img
            onClick={onCloseCart}
            className="removeBtn cu-p"
            src="/img/btn-rem.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div><div className="item">
          {items.map((obj) => (
          <div className="cartItem d-flex align-center mb-20" key={obj.id}>
            <img
              className="mr-20"
              width={70}
              height={70}
              src={obj.imgUrl}
              alt="sneakers" />
            <div className="mr-20">
              <p className="mb-5">{obj.titile}</p>
              <b>{obj.price}$</b>
            </div>
            <img
              onClick={() => onRemove(obj.id)}
              className="removeBtn"
              src="/img/btn-rem.svg"
              alt="Remove" />
              </div>
        ))}
        </div>
         <div className="cartTotalBlock">
         <ul>
           <li>
             <span>Total:</span>
             <div></div>
             <b>{totalPrise}$</b>
           </li>
           <li>
             <span>Tax 5%</span>
             <div></div>
             <b>{Math.floor(totalPrise*0.05)}$</b>
           </li>
         </ul>
         <button disabled={isLoading} onClick={addToOrder} className="greenButton">
           Buy <img src="/img/arrow.svg" alt="Arrow" />
         </button>
       </div> </div>
          )
          :(
            <Info
              tittle= {isOrderComplete ? "Order is processed!" : "Cart is empty"}
              description= {isOrderComplete ? `Your order #${orderId} will soon be delivered by courier` : "Add at least one pair of sneakers to place an order" }
              img ={isOrderComplete ? "/img/order.svg" :"/img/basket.svg" }
              url = {()=>setCartopened(false)}
            />
          )}
          </div>
          </div>)}
export default Drawer;
