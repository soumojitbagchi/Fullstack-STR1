import React from 'react'
import '../style/SearchReasult.css'

const SearchResult = ({ product }) => {
  const item = product

  return (
    <div className="search-result-card">
      <div className="product-img">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="context">
        <div className="result-meta">
          {item.badge && <span className="badge">{item.badge}</span>}
        </div>

        <h3 className="title">{item.title}</h3>
        <h4 className="price">{item.price}</h4>
        <p className="description">{item.description}</p>
        <button className="buy-btn">Add to cart</button>
      </div>
    </div>
  )
}

export default SearchResult