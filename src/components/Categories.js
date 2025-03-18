const Categories = ({categories, activeCategory, setActiveCategory}) => (
  <div className="categories-container">
    {categories.map(category => (
      <button
        type="button"
        key={category.menu_id}
        className={`category-btn ${
          activeCategory === category.menu_category ? 'active' : ''
        }`}
        onClick={() => setActiveCategory(category.menu_category)}
        role="button"
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default Categories
