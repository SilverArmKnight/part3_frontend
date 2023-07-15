const Filter = (props) => {
  return (
    <div>
      filter shown with <input
      value={props.searchBar}
      onChange={props.handleSearchBar}/>
    </div>
  )
}

export default Filter