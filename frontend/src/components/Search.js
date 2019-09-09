import React from 'react';

const Search = (props) => {
  function handleSeachQuery(event){
    const handler = props.handleSearchQuery;
    handler(event.target.value)
  }

  function handleFilter(event){
    console.log(event.target.value)
    const handler = props.setFilter;
    handler(event.target.value);
  }
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={handleSeachQuery}
      />
      <select id="filter-by" onChange={handleFilter}>
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="tag">Tag</option>
        <option value="created-at">Created-At</option>
        <option value="updated-at">Updated-At</option>
      </select>
    </div>
  );
}

export default Search;
