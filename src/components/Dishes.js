const getVegNonVegIndicator = dishType => (
  <div className={`veg-indicator ${dishType === 'VEG' ? 'veg' : 'non-veg'}`}>
    <div className="indicator-inner">
      {dishType === 'VEG' ? 'veg' : 'non-veg'}
    </div>
  </div>
)

const Dishes = ({dishes, cart, addItemToCart, removeItemFromCart}) => (
  <div className="dishes-container">
    {dishes.map(dish => (
      <div key={dish.dish_id} className="dish-card">
        <div className="dish-info">
          {getVegNonVegIndicator(dish.dish_Type)}
          <h3 className="dish-name">{dish.dish_name}</h3>
          <p className="dish-price">
            {dish.dish_currency} {dish.dish_price}
          </p>
          <p className="dish-description">{dish.dish_description}</p>
          {dish.addonCat?.length > 0 && (
            <p className="customizations">Customizations available</p>
          )}
          {dish.dish_Availability ? (
            <div className="dish-controls">
              <button
                type="button"
                className="control-button remove"
                onClick={() => removeItemFromCart(dish.dish_id)}
                role="button"
              >
                -
              </button>
              <span className="dish-count">{cart[dish.dish_id] || 0}</span>
              <button
                type="button"
                className="control-button add"
                onClick={() => addItemToCart(dish.dish_id)}
                role="button"
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available">Not available</p>
          )}
          <p className="dish-calories">{dish.dish_calories} calories</p>
        </div>
        {dish.dish_image && (
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="dish-image"
            role="img"
          />
        )}
      </div>
    ))}
  </div>
)

export default Dishes
