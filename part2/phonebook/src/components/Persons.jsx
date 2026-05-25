const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </li>
  )
}

const Persons = ({ peopleToShow, deletePerson }) => {
  return (
    <ul>
      {peopleToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      )}
    </ul>
  )
}

export default Persons
