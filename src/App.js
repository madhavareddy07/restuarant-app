import {useState, useEffect} from 'react'
import Header from './components/Header'
import Categories from './components/Categories'
import Dishes from './components/Dishes'
import './App.css'

const getMockData = () => ({
  restaurant_name: 'UNI Resto Cafe',
  table_menu_list: [
    {
      menu_category: 'Salads and Soup',
      menu_id: '1',
      category_dishes: [
        // dishes here...
      ],
    },
    {
      menu_category: 'From The Barnyard',
      menu_id: '2',
      category_dishes: [
        // dishes here...
      ],
    },
    {
      // This was outside the array before
      menu_category: 'From the Hen House',
      menu_id: '3',
      category_dishes: [
        // dishes here...
      ],
    },
    {
      // This was outside the array before
      menu_category: 'Fresh From The Sea',
      menu_id: '4',
      category_dishes: [
        // dishes here...
      ],
    },
    {
      // This was outside the array before
      menu_category: 'Biryani',
      menu_id: '5',
      category_dishes: [
        // dishes here...
      ],
    },
    {
      // This was outside the array before
      menu_category: 'Fast Food',
      menu_id: '6',
      category_dishes: [
        // dishes here...
      ],
    },
  ], // This is where the array was closed prematurely
})

const App = () => {
  const [categories, setCategories] = useState([])
  const [dishes, setDishes] = useState([])
  const [cart, setCart] = useState({})
  const [activeCategory, setActiveCategory] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setFetchError(null)

        const response = await fetch(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()
        if (data?.table_menu_list?.length) {
          setCategories(data.table_menu_list)
          setRestaurantName(data.restaurant_name || 'UNI Resto Cafe')
          setActiveCategory(data.table_menu_list[0].menu_category)
          setDishes(data.table_menu_list[0].category_dishes || [])
        } else {
          throw new Error('Invalid API response')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setFetchError(error.message)
        const mockData = getMockData()
        setCategories(mockData.table_menu_list)
        setRestaurantName(mockData.restaurant_name)
        setActiveCategory(mockData.table_menu_list[0].menu_category)
        setDishes(mockData.table_menu_list[0].category_dishes)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const selectedCategory = categories.find(
      category => category.menu_category === activeCategory,
    )
    if (selectedCategory) setDishes(selectedCategory.category_dishes)
  }, [activeCategory, categories])

  const addItemToCart = dishId =>
    setCart(prevCart => ({...prevCart, [dishId]: (prevCart[dishId] || 0) + 1}))

  const removeItemFromCart = dishId =>
    setCart(prevCart => {
      const newCart = {...prevCart}
      if (newCart[dishId] > 1) newCart[dishId] -= 1
      else delete newCart[dishId]
      return newCart
    })

  const getTotalItems = () =>
    Object.values(cart).reduce((total, num) => total + num, 0)

  if (isLoading) return <div className="loading">Loading...</div>
  if (fetchError && !categories.length)
    return <div className="error">Error: {fetchError}</div>

  return (
    <div className="app">
      <Header restaurantName={restaurantName} totalItems={getTotalItems()} />
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Dishes
        dishes={dishes}
        cart={cart}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
      />
    </div>
  )
}

export default App
