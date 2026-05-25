import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const addName = (event) => {
    event.preventDefault()
    const existing = persons.find(person => person.name === newName)

    if (existing) {
      const ok = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (!ok) return

      personService
        .update(existing.id, { number: newNumber })
        .then(updated => {
          setPersons(persons.map(person => person.id !== existing.id ? person : updated))
          notify(`Updated ${updated.name}'s number`)
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          notify(`Information of ${newName} has already been removed from the server`, 'error')
          setPersons(persons.filter(person => person.id !== existing.id))
        })
      return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(created => {
        setPersons(persons.concat(created))
        notify(`Added ${created.name}`)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        notify(`${name} was already removed from the server`, 'error')
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const peopleToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
