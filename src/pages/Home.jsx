import React from "react";
import Card from "../components/Card";

function Home ({items ,
    searchValue , 
    onChangeSearchInput ,
    Clear ,
    onAddToCart, 
    onAddFavorite ,  
    isLoading
    }){
        const renderitems = () =>{
            // при загрузке пока непришли данные с бэка грузится фантом карточек
            const emptyArrays = Array(Number(8)).fill([]);
            // фильтруем данные с items и если item.name есть даннные котрые включают с searchValue . Тогда рендерим эти карточки . 
            const filtredItems = items.filter((item) => 
                item.name.toLocaleLowerCase().includes(searchValue));
            return ((isLoading ? emptyArrays : filtredItems)
                    .map((item) =>(<Card 
                    key={item.id}
                    id = {item.id}
                    titile={item.name} 
                    price={item.price} 
                    imgUrl ={item.img}
                    onPlus={(obj)=> onAddToCart(obj)}
                    onFavorite={(obj)=> onAddFavorite(obj)}
                    loading ={isLoading}
            />)))
        }
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `On request: "${searchValue}"` : 'All sneakers'}</h1>
        <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {/* кнопка появляется только тогда когда  searchValue = true,  тоесть что--то есть в инпуте*/}
            {searchValue && <img onClick={Clear} className="clear removeBtn cu-p" src="/img/btn-rem.svg" alt="Remove"/>}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
        </div>
        </div>
        <div className="d-flex flex-wrap">
            {renderitems()}
        </div>
    </div>
    )
}

export default Home