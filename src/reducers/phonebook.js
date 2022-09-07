import { deleteDBContact, getDBContacts, postDBContact } from "services/mockapi";

const { createAction, createReducer, configureStore, createAsyncThunk } = require("@reduxjs/toolkit");

const ADD_CONTACT = "add_contact"
const REMOVE_CONTACT = "remove_contact"
const SET_CONTACTS = "set_contacts"
const GET_CONTACTS = "get_contact"
const SET_FILTER = "set_filter"

const inititalState = {
  contacts: {
    items: [],
    filter: ''
  }
}


const getSavedContacts = createAsyncThunk(
    GET_CONTACTS,
    async () => {
      const response = await getDBContacts()
      return response
    }
  )

const addContact = createAsyncThunk(ADD_CONTACT, async (user) => {
  const response = await postDBContact(user)

  return response.data
})
const removeContact = createAction(REMOVE_CONTACT)
const setContacts = createAction(SET_CONTACTS)
const setFilter = createAction(SET_FILTER)


const contactsReducer = createReducer(inititalState, {
    [addContact.fulfilled]: (state, {payload}) => {state.items.push(payload)},
    [removeContact]: (state, {payload}) => {state.items = state.items.filter(item => item.id !== payload); deleteDBContact(payload)},
    [setContacts]: (state, {payload}) => {state.items = payload},
    [setFilter]: (state, {payload}) => {state.filter = payload},
    [getSavedContacts.fulfilled]: (state, {payload}) => {state.items = payload}
})

const store = configureStore({
    reducer:{
        contacts: contactsReducer
    },
    preloadedState: inititalState
})

store.dispatch(getSavedContacts())

export {addContact, removeContact, setContacts, setFilter, store}