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

  // function handleSorting(event){
  //   console.log(props)
  //   const handler = props.handleNoteSorting
  //   handler(event.target.value)
  // }

  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={handleSeachQuery}
      />
      <select id="filter-by" onChange={handleFilter}>
        <option value="all">--Filter--</option>
        <option value="title">Title</option>
        <option value="tag">Tag</option>
      </select>

      {/* <select id="sort-by" onChange={handleSorting}>
        <option value="default">--Sort--</option>
        <option value="created-at">Newest</option>
        <option value="updated-at">Updated</option>
        <option value="title">Title</option>
      </select> */}
    </div>
  );
}

export default Search;
