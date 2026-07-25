import React from 'react'
import SearchResult from './SearchReasult'
import '../style/SearchReasult.css'
import { useSearch } from '../Hooks/useSearch'

const Feed = () => {
  const {product}= useSearch()
  const result = product

  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2>Search results</h2>
        <span>{result.length} items</span>
      </div>

      <div className="search-results__list">
        {result.map((item, index) => (
          <SearchResult key={index} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Feed