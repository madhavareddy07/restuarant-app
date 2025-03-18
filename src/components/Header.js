import {FiShoppingCart} from 'react-icons/fi'

const Header = ({restaurantName, totalItems}) => (
  <header className="header">
    <h1 className="restaurant-name">{restaurantName || 'UNI Resto Cafe'}</h1>
    <div className="header-right">
      <p>My Orders</p>
      <div className="cart-container">
        <FiShoppingCart className="cart-icon" />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>
    </div>
  </header>
)

export default Header
