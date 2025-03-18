import {Component} from 'react'

import Header from '../Header'
import DishItem from '../DishItem'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    response: [],
    activeCategoryId: '',
    cartItems: [],
    restaurantName: '',
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat.map(eachAddOn => ({
          addonCategory: eachAddOn.addon_category,
          addonCategoryId: eachAddOn.addon_category_id,
          addonSelection: eachAddOn.addon_selection,
          nextUrl: eachAddOn.nexturl,
          addons: eachAddOn.addons.map(eachDishes => ({
            dishId: eachDishes.dish_id,
            dishName: eachDishes.dish_name,
            dishPrice: eachDishes.dish_price,
            dishImage: eachDishes.dish_image,
            dishCurrency: eachDishes.dish_currency,
            dishCalories: eachDishes.dish_calories,
            dishDescription: eachDishes.dish_description,
            dishAvailability: eachDishes.dish_Availability,
            dishType: eachDishes.dish_Type,
          })),
        })),
      })),
    }))

  getBlogsData = async () => {
    const api = `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`
    const options = {
      method: 'GET',
    }
    const responsed = await fetch(api, options)
    if (responsed.ok) {
      const data = await responsed.json()
      const updatedData = this.getUpdatedData(data[0].table_menu_list)
      this.setState({
        response: updatedData,
        activeCategoryId: updatedData[0].menuCategoryId,
        restaurantName: data[0].restaurant_name,
        isLoading: false,
      })
    }
  }

  removeItemFromCart = dish => {
    const {cartItems} = this.state

    const isAlreadyExists = cartItems.find(
      item => item.dish.dishId === dish.dishId,
    )
    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems
          .map(item =>
            item.dish.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  addItemToCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(
      item => item.dish.dishId === dish.dishId,
    )

    if (!isAlreadyExists) {
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, {dish, quantity: 1}],
      }))
    } else {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.dish.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  onUpdateActiveCategoryId = menuCategoryId => {
    this.setState({activeCategoryId: menuCategoryId})
  }

  renderTabMenuList = () => {
    const {response, activeCategoryId} = this.state

    return response.map(eachCategory => {
      const onClickHandler = () => {
        this.onUpdateActiveCategoryId(eachCategory.menuCategoryId)
      }
      return (
        <li
          key={eachCategory.menuCategoryId}
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
        >
          <button
            type="button"
            onClick={onClickHandler}
            className="tab-category-button"
          >
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })
  }

  renderDishes = () => {
    const {response, activeCategoryId, cartItems} = this.state
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addItemToCart={this.addItemToCart}
            removeItemFromCart={this.removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  renderSpinner = () => (
    <div className="spinner-container" data-testid="loader">
      <div className="spinner-border" role="status" height={30} width={30} />
    </div>
  )

  render() {
    const {isLoading, cartItems, restaurantName} = this.state

    return isLoading ? (
      this.renderSpinner()
    ) : (
      <div className="home-background">
        <Header cartItems={cartItems} restaurantName={restaurantName} />
        <ul className="tab-container">{this.renderTabMenuList()}</ul>
        {this.renderDishes()}
      </div>
    )
  }
}

export default Home
