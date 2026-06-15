import Person from "./Person"

const PersonsList = ({ personsToShow, handleDelete }) => {

  return (<div>
    {
      personsToShow.map(person => (
        <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
      ))
    }
  </div >)
}

export default PersonsList