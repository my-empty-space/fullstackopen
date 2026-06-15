const Filter = ({ filterByName, handleFilter }) => {


  return (
    <div>
      <label>
        filter shown with
        <input value={filterByName} onChange={handleFilter}>
        </input>
      </label>
    </div>
  )
}

export default Filter