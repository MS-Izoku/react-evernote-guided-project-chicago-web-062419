import React from 'react';

const Search = (props) => {
  
  const {handleSearchQuery , setFilter} = props

  function handleSearchBar(event){
    handleSearchQuery(event.target.value)
  }

  // filters the results of the search query from the parent
  function handleFilter(event){
    setFilter(event.target.value)
    //console.log(currentQuery + ' is current')
    //handleSearchQuery(currentQuery)
    
  }

  // the search query needs to be resent after the filter goes off
  // otherwise the sidebar will not refresh

  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={handleSearchBar}
      />
      {/* <select id="filter-by" onChange={handleFilter}> */}
      <select id="filter-by" onChange={handleFilter} className={'filterSelect'}>
        <option value="all">--Filter--</option>
        <option value="title">Title</option>
        <option value="body">Body</option>
      </select>
      {/* <Editor editorState={'Allo'}/> */}

    </div>
  );
}

export default Search;
