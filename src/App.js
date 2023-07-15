import {useEffect, useState} from 'react'
import './index.css'

import personService from './services/people.js'

import Notification from './components/Notification'
import Removed from './components/Removed'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  // List of people added.
  const [persons, setPersons] = useState([])

  // The thing that will appear in the search bar.
  const [newName, setNewName] = useState('')

  // Another event handler for phone number?
  const [newNumber, setNewNumber] = useState('')

  // Search bar filter.
  const [searchBar, setSearchBar] = useState('')

  // Message pop-up.
  const [message, setMessage] = useState(null)

  // Update removed person pop-up.
  const [removed, setRemoved] = useState(null)

  // 2.11 here we go. It seems for this exercise, 
  // new data will not be added to db.json.
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}
    //const newName = newName
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`
    //var nameLst = persons.map(({name}) => name)
    var count = 0

    persons.forEach(person => {
      if (!(JSON.stringify(person.name) === JSON.stringify(newName))) {
        count++
      } else {
        // Maybe we need another conditional statement.
        //console.log("newNumber:", newNumber)
        if (window.confirm(message) === true) {
          // Do not mutate states directly.
          //console.log("person.id:", person.id)
          personService
            .update(person.id, newPerson)
            // We can filter person from persons, then add returnData to persons.
            .then(returnData => {
              //console.log("returnData:", returnData)
              //console.log("Check:", person.number !== newNumber)
              setPersons(persons.filter(person2 => person2.name !== newName).concat(returnData))})
            .catch(error => {
              console.log(error)
            })
          return;
        }
      }
    })

    if (count === persons.length) {
      //console.log("Hey, we reach here! WE ARE HERE!")
      personService
        .create(newPerson)
        .then(returnData => {
          // Okay, I assume 3.19 should be here.
          //console.log("returnData:", returnData)
          setPersons(persons.concat(returnData))
          setMessage(`Added ${returnData.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)})
        .catch(error => {
          // Try this shit again.
          //console.log(error)
          setRemoved(error.response.data.error)
          setTimeout(() => {
            setRemoved(null)
          }, 5000)})
    // Hopefully this will be 3.19
    }
  }

  // Finish this, and we are done.
  const deletePerson = (event) => {
    event.preventDefault() 
    //var toBeDeleted = {}

    //console.log('event:', event)
    //console.log('event.target:', event.target)
    //console.log('event.target.id:', event.target.id)

    // This thing took me 2 hours to debug.
    //console.log('event.target.childNodes:', event.target.childNodes)
    //console.log('event.target.childNodes[0].data:', event.target.childNodes[0].data)
    //console.log('event.target.childNodes[2].data:', event.target.childNodes[2].data)
    //console.log('event.target.firstElementChild.innerText[0]', 
                //event.target.firstElementChild.innerText[0])
    //console.log('event.target.firstElementChild.innerText[1]', 
                //event.target.firstElementChild.innerText[1])
    
    //persons.forEach(person => 
      //{if (JSON.stringify(person.id) === event.target.id) {
        //console.log(person)
        //console.log(person.id)
        //toBeDeleted = person
      //}})
    
    const toBeDeleted = {
      name: event.target.childNodes[0].data,
      number: event.target.childNodes[2].data,
      id: event.target.id
    }  

    //console.log('toBeDeleted:', toBeDeleted)

    // Okay, we can continue from here.
    const deleteName = toBeDeleted.name
    //console.log('deleteName:', deleteName)
    const message = `Delete ${deleteName}?`

    if (window.confirm(message) === true) {
      //console.log("Conditional true. All lights green.")
      personService
        .deleteContact(toBeDeleted.id)
        .then(response => {
          //console.log("response:", response)
          setPersons(persons.filter(person => person.id !== toBeDeleted.id))
          
        })
        .catch(error => {
          console.log(error)
          //response.status(500).end()
        })
      //window.location.reload()
    } else {
      console.log("What the hell man?")
    }
  }

  // I don't know how event.target.value works, but it works.
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // Similar problem to the above.
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchBar = (event) => {
    console.log(event.target.value)
    setSearchBar(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Removed message={removed}/>
      <Filter 
        searchBar={searchBar} 
        handleSearchBar={handleSearchBar}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        searchBar={searchBar} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App;
