import React from 'react'
import '../style/SearchResult.css'
import { useSearch } from '../../onClickingOutside/hooks/useDashboard'
const SearchResult = ({ product }) => {
  const item = product
  const { handleAddToCart } = useSearch()
  return (
    <div className="search-result-card">
      <div className="product-img">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="context">
        <div className="result-meta">
          {item.category && <span className="badge">{item.category}</span>}
        </div>

        <h3 className="title">{item.name}</h3>
        <h4 className="price">{item.price} $</h4>
        <p className="description">{item.description}</p>
        <button className="buy-btn" onClick={() => handleAddToCart(item.id)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default SearchResult