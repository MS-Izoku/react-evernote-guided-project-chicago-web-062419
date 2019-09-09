import React from 'react';

const Search = (props) => {
  function handleSeachQuery(event){
    const handler = props.handleSearchQuery;
    handler(event.target.value)
  }
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={handleSeachQuery}
      />
      <select id="filter-by">
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="tag">Tag</option>
      </select>
    </div>
  );
}

export default Search;
