import './index.css'

const Header = props => {
  const {cartItems, restaurantName} = props
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const renderCartItem = () => (
    <div className="cart-item-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="#585555"
        className="bi bi-cart3 cart-item"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
      <div className="cart-count-badge">
        <p className="cart-count">{getCartItemsCount()}</p>
      </div>
    </div>
  )

  return (
    <header className="nav-header">
      <h1 className="logo-heading">{restaurantName}</h1>
      <div className="cart-container">
        <p className="my-orders-text">My Orders</p>
        {renderCartItem()}
      </div>
    </header>
  )
}

export default Header
