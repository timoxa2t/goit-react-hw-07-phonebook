
import React from "react";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import Section from "./Section";
import FilterConstacts from "./FilterConstacts";
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from "react-redux";
import { addContact, removeContact, setFilter } from 'reducers/phonebook'


export const App = () =>  {

  const {items: contacts, filter} = useSelector(state => state.contacts)

  const dispatch = useDispatch()

  const handleAddContact = ({name, number}) => {

    if(contacts.find(item => item.name === name)){
      alert(name + " is already in contacts")
      return false
    }
    
    dispatch(addContact({name, number, id: nanoid()}))

    return true
  }



  const handleFilterChange = ({target}) => {
      dispatch(setFilter(target.value))
  }

  const handleRemoveContact = (id) => {
    dispatch(removeContact(id))
  }

  const filteredContacts = filterContacts(contacts, filter)

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm 
          addContact={handleAddContact} 
        />
      </Section>
      
      <Section title="Contacts">
        <FilterConstacts onFilterChange={handleFilterChange}/>
        <ContactsList contacts={filteredContacts} removeContact={handleRemoveContact}/>
      </Section>      
    </div>
  )
};

const filterContacts = (contacts, filter) => {
    if(!filter) return contacts
    filter = filter.toLowerCase()
    return contacts.filter(({name}) => name.toLowerCase().includes(filter))
}
