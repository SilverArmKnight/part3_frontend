import Person from './Person'

const Persons = ({persons, searchBar, deletePerson}) => {
  const peopleToShow = searchBar !== ''
    ? persons.filter(person => new RegExp("^" + searchBar, "i").test(person.name))
    : persons

  return (
    <div>
      <ul>{peopleToShow.map(person => 
        <Person 
          key={persons.indexOf(person)} 
          person={person}
          deletePerson={deletePerson}
        />)}
      </ul>
    </div>
  )
}

export default Persons