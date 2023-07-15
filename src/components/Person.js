const Person = ({person, deletePerson}) => {
  return (
    <li>
      <form onSubmit={deletePerson} id={person.id}>
        {person.name} {person.number} <button type="submit"> delete</button>
      </form>
    </li>
  )
}

export default Person