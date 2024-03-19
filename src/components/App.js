import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import uuid from 'react-uuid';
import ContactDetail from './ContactDetail';
import './App.css';
import api from '../api/contacts';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import EditContact from './EditContact';
function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm,setSearch]=useState("");
  const [searchResults,setSearchResults]=useState([]);
  //search Handler
  const searchHandler= (searchTerm) =>
  {
    //  console.log(searchTerm);
    setSearch(searchTerm);
    if(searchTerm!=="")
    {
        const newContactList= contacts.filter((contact)=>{
            return(Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
        });
        setSearchResults(newContactList);
    }
    else
    {
       setSearchResults(contacts);
    }
  }
  //Retrieve contacts function
  const retriveContacts= async () =>
  {
    const response = await api.get("/contacts");
    return response.data;
  }
  const UpdateContactHandler= async (contact)=>{
    // console.log(contact);
    const response= await api.put(`/contacts/${contact.id}`,contact);
    
    const {id,name,email}= response.data;
    setContacts(
      contacts.map((contact)=>
      {
        return(contact.id===id ? {...response.data}:contact );
      })
    );
  };
  const addContactHandler = async (contact) => {
    console.log(contact);
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    const request= {
      id: uuid(),
       ...contact
    }
    const response = await api.post("/contacts",request);
    setContacts([...contacts, response.data]);

  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return (contact.id !== id);
    });

    setContacts(newContactList);
  }
  useEffect(() => {

    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) {
    //   setContacts(retriveContacts);
    // }
    const getAllContacts=async ()=>
    {
        const allContacts= await retriveContacts();
        if(allContacts)
        {
            setContacts(allContacts);
        }
        
    }
    getAllContacts();
  }, []);
  useEffect(() => {

    if (contacts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);
  return (


    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact Component={()=>(<ContactList contact={searchTerm.length<1 ? contacts :searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />)}></Route>
          <Route path="/add" Component={()=>(<AddContact addContactHandler={addContactHandler}/>)}></Route>
          {/*<AddContact addContactHandler={addContactHandler} />
  <ContactList contact={contacts} getContactId={removeContactHandler} />*/}
          <Route path="/contact/:id" element={<ContactDetail />}></Route>
          <Route path="/edit" Component={()=>(<EditContact UpdateContactHandler={UpdateContactHandler}/>)}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
