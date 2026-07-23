import React from 'react'
import SearchResult from './SearchReasult'
import './SearchReasult.css'

const Feed = () => {
  const searchResults =null

  return (
    <div className="search-results">
      <div className="search-results__header">
        <h2>Search results</h2>
        <span>{searchResults.length} items</span>
      </div>

      <div className="search-results__list">
        {searchResults.map((item, index) => (
          <SearchResult key={index} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Feed