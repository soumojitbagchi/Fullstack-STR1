import React from 'react'
import SearchResult from './SearchReasult'
import '../style/SearchResult.css'
import { useSearch } from '../Hooks/useSearch'

const Feed = () => {
  const {product}= useSearch()
  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2>Search results</h2>
        <span>{product.length} items</span>
      </div>

      <div className="search-results__list">
        {product.map((item, index) => (
          <SearchResult key={index} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Feed