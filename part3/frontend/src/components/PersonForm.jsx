const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
      <label>
        name:
        <input type='text' value={newName} onChange={(event) => setNewName(event.target.value)} />
      </label>
      <br />
      <label>
        number:
        <input type="tel" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </label>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm