import React from 'react';
import Card from '../components/Card';
import AppContext from '../contex';
import { Link } from 'react-router-dom';


function Favorites() {
  // достаем данные с контескста 
  const {favoritItems , onAddToCart , onAddFavorite} = React.useContext(AppContext);

  
  return (
    <div className="content p-40">
      {favoritItems.length > 0 ? (
        // если в массиве есть элементы рендерем эту часть кода 
        <>
          <div div className="d-flex align-center mb-20">
            {/* ссылка на главную */}
            <Link to="/">
              <img className="arrow-back mr-10" src="/img/arrow-back.png" width={29} height={30} alt="arrow-back" />
            </Link>
            <h1>My bookmarks</h1>
          </div>
        <div className="d-flex flex-wrap">
          {/* рендерем карточки из favoritItems*/}
          {favoritItems.map((item) => (
            <Card
              key={item.id}
              id ={item.id}
              titile={item.titile}
              price={item.price}
              imgUrl={item.imgUrl}
              favorit={true}
              onPlus={(obj)=> onAddToCart(obj)}
              onFavorite={(obj)=> onAddFavorite(obj)}
            />
          ))}
        </div>
        </>
      ) : (
        // если массив пустой рендерем эту часть кода 
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="70px" height="70px" src="/img/sad-emoticon.svg" alt="sad-emoticon"></img>
            <h2>No bookmarks</h2>
            <p className="opacity-6">You haven't bookmarked anything</p>
            <Link to="/">
              <button className="greenButton">
                <img src="img/arrow.svg" alt="Arrow"></img>
                Сome back
              </button>
            </Link>
          </div>
      )}
    </div>
  );
}

export default Favorites;