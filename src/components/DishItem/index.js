import './index.css'

const DishItem = props => {
  const {dishDetails, cartItems, addItemToCart, removeItemFromCart} = props

  const {
    dishId,
    dishName,
    dishPrice,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishImage,
    dishAvailability,
    dishType,
    addonCat,
  } = dishDetails
  console.log(addonCat.length)
  const onIncreaseQuantity = () => {
    addItemToCart(dishDetails)
  }

  const onDecreaseQuantity = () => {
    removeItemFromCart(dishDetails)
  }

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dish.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderControllerButton = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item-container">
      <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && (
          <p className="not-availability-text">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default DishItem
