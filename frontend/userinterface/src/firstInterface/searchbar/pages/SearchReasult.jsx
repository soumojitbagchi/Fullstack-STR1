import React from 'react'
import './SearchReasult.css'

const SearchResult = ({ product }) => {
  const item = product || {
    title: 'Premium wireless headphones',
    price: '$89.99',
    description: 'Comfortable over-ear headphones with rich sound, noise cancellation, and long battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    badge: 'Top rated',
  }

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