import { Route , Routes } from 'react-router-dom';
import axios from "axios";
import Header from "./components/Header";
import Drawer from './components/Drawer';
import React, { useState , useEffect } from 'react';
import AppContext from './contex';

import Home from './pages/Home';
import Favorites from './pages/Favorits';
import Orders from './pages/Orders';

function App(){
    const [items,setItems] = useState([]); 
    // хук useState первым записано состояние вторым функция изменения состояния , в скобочках состояние по умолчанию
    const [cartItems, setCartItems] = useState([]);
    const [favoritItems, setFavoritItems] = useState([]);
    const [cartOpened , setCartopened]= useState(false);
    const [searchValue , setSearchValue] = useState("");
    const [isLoading , setIsLoading] = useState(true)

    // отправляет запрос на сервер с json файлами
    useEffect(()=>{
        async function fetchData (){
            // библеотека axios для запросов на сервер бєк 
            const cartResponse = await axios.get('https://6463b8d3127ad0b8f88fbd53.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://64a02e6ded3c41bdd7a713ff.mockapi.io/favorit');
            const itemResponse = await axios.get('https://6463b8d3127ad0b8f88fbd53.mockapi.io/items');
            
            setIsLoading(false)
    
            setCartItems(cartResponse.data);
            setFavoritItems(favoritesResponse.data)
            setItems(itemResponse.data);
            // после получения данных записываем их в функцию изменения состояния
        }
        fetchData ()
    }, [])
    const onAddToCart = async(obj) =>{
        const fiindItem = cartItems.find((item)=>Number(item.parentId) === Number(obj.id))
        try{
            if(fiindItem){
            // если у нас есть такой обьект и данные с бека равнны , то тогда удали этот элемент . 
                setCartItems((prev)=>prev.filter((item)=>Number(item.parentId) !== Number(obj.id)))
                axios.delete(`https://6463b8d3127ad0b8f88fbd53.mockapi.io/cart/${fiindItem.id}`)
            }else{
            // если у нас нет такого элемента , при нажатии на кнопку оправялется запрос пост на серер и добавляется обьекст в массив .
            setCartItems(prev => [...prev, obj])
            const{data} = await axios.post('https://6463b8d3127ad0b8f88fbd53.mockapi.io/cart' ,obj )
            setCartItems(prev => prev.map(item =>{
                if(item.parentId === data.parentId){
                    return {
                        ...item,
                        id:data.id
                    }
                }
                return item;
            }))
            }
        } catch(error){
            alert ("Error add to cart");
            console.error(error)
        }

    }

    const onAddFavorite = async (obj) =>{
        try{
            // если у нас есть такой обьект и данные с бека равнны , то тогда удали этот элемент . 
            if (favoritItems.find(item => Number(item.id) === Number(obj.id))){
                axios.delete(`https://64a02e6ded3c41bdd7a713ff.mockapi.io/favorit/${obj.id}`);
                setFavoritItems((prev)=>prev.filter((item)=>Number(item.id) !== Number(obj.id)))
            }else{
             // если у нас нет такого элемента , при нажатии на кнопку оправялется запрос пост на серер и добавляется обьекст в массив .
                const {data} = await axios.post(`https://64a02e6ded3c41bdd7a713ff.mockapi.io/favorit` , obj)
                setFavoritItems(prev=> [...prev , data])
            }
        }catch(error){
            alert("Failed to add to favorites")
        }
    }

    const onChangeSearchInput = (event) =>{
        setSearchValue(event.target.value)
    }

    const Clear = ()=>{
        // очищает импут
        setSearchValue('')    
    }
    const onRemoveItem = (id) =>{
        // если у нас уже есть такой id удаляет данныс с бэка и фильрует массив 
        axios.delete(`https://6463b8d3127ad0b8f88fbd53.mockapi.io/cart/${id}`)
        setCartItems((prev)=> prev.filter(item=>item.id !== id))
    }

    const isItemAdded = (id)=>{
        //  Если элемент с id найден в массиве cartItems, функция вернет true, иначе - false.
        return cartItems.some(obj=> Number(obj.parentId) === Number(id))
    }

    return <AppContext.Provider value={{cartItems ,favoritItems, items , isItemAdded , onAddToCart , onAddFavorite ,setCartopened, setCartItems}}>
        {/* подключение констекста , файлы что находятся в value , можно применть ко всем компонентам внутри AppContext.Provider*/}
            <div className="wrapper clear">
            <Drawer 
                items={cartItems} 
                onCloseCart={()=>setCartopened(false)} 
                onRemove={onRemoveItem} 
                opened={cartOpened}/>
            <Header items={cartItems.length} favoritItems={favoritItems.length} onClickCart={()=>setCartopened(true)}/>
            <Routes>
            <Route
            path="/"
            element={
                <Home
                    items={items}
                    cartItems={cartItems}
                    searchValue={searchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    Clear={Clear}
                    onAddToCart={onAddToCart}
                    onAddFavorite={onAddFavorite}
                    isLoading={isLoading}
                />
            }
            exact
            />
            <Route
            path="/favorites"
            element={
                <Favorites/>
            }
            exact
            />
            <Route
            path="/orders"
            element={
                <Orders/>
            }
            exact
            />
            </Routes>
        </div>
        </AppContext.Provider>
}

export default App;