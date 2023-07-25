import React from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from '../../contex';


function Card({
    onFavorite,
    imgUrl,
    titile,
    price,
    id,
    onPlus,
    favorit = false,
    loading
}){
    const {isItemAdded} = React.useContext(AppContext)
    const [isFavorit , setisFavorit] = React.useState(favorit)
    const obj = { id ,parentId:id,  titile , imgUrl ,price}

    const onClickPlus = () =>{
        // При вызове функции , данные передаются в props из каждого компонента и добавляются в обьект {obj} id..titile...imgUrl
        onPlus(obj);
    }

    const onClickFavorit = () =>{
        // при указании ! значение переменной инвертируется truth => false
        setisFavorit(!isFavorit);
        // При вызове функции , данные передаются в props из каждого компонента и добавляются в обьект {obj} id..titile...imgUrl
        onFavorite(obj);
    }

    return(

    <div className={styles.card}>
        {loading ? 
        (<ContentLoader 
        speed={2}
        width={155}
        height={265}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" /> 
        <rect x="120" y="230" rx="10" ry="10" width="32" height="32" /> 
      </ContentLoader>) 
      :(
          <>
          {/* если  onFavorite равен true тогда отображаем кнопку */}
            {onFavorite && <div className="favorite" onClick={onClickFavorit}>
            <img src={ isFavorit ? "/img/heart-like.svg" :"/img/heart-dislike.svg"} alt="heart-dislike"/>
            </div>}   
            <img width={133} height={112} src={imgUrl} alt=""/>
            <h5>{titile}</h5>
            <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>PRICE:</span>
                    <b>{price} $</b>
                </div>
                {/* если  onPlus равен true тогда отображаем кнопку */}
            {onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-chek.svg":"/img/btn-bye.svg" } alt="Bye" />}
            </div>
            </>
            )}
          </div>
)
}


export default Card;