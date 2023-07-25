const Info = ({tittle , description , img , url}) => {

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="70px" height="70px" src={img} alt={img}></img>
            <h2>{tittle}</h2>
            <p className="opacity-6">{description}</p>
            <button  onClick={url} className="greenButton">
              <img src="img/arrow.svg" alt="Arrow"></img>
              Сome back
            </button >
     </div>
  )
}

export default Info; 