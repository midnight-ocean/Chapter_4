import { useState, useEffect } from "react";
import "./index.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts"

const App = () => {
  //States
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);

  useEffect(() => {
    contactService.getContacts().then((data) => {
      setContacts(data);
      setFilterContacts(data);
    })
  }, [])

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (newName.trim() == "") {
      return;
    }
    if (newEmail.trim() == "") {
      alert("You need to add an email address!")
      return;
    }
    //Checking whether provided name is a duplicate
    if (contacts.filter(entry => entry.name === newName).length > 0) {
      let accepted = window.confirm("You have entered the name of a person who is already listed. Do you wish to update their email address?");
      if (accepted) {
        const oldContact = contacts.filter(entry => entry.name === newName)[0]
        const replacement = {
          id: oldContact.id,
          name: oldContact.name,
          email: newEmail.trim(),
        }
        contactService.updateContacts(replacement).then((data) => {
          setContacts(contacts.map((elem) => elem.id == oldContact.id ? replacement : elem));
          setFilterContacts(filterContacts.map((elem) => elem.id == oldContact.id ? replacement : elem));
        });
      }
      return;
    }

    const newContactObj = {
      name: newName.trim(),
      email: newEmail.trim(),
    }

    contactService.addContacts(newContactObj).then((data) => {
      setContacts([...contacts, data]);
      if (newName.toLowerCase().includes(newSearch)) {
        setFilterContacts([...contacts, data])
      }
    })

    //Resetting input fields
    setNewName("");
    setNewEmail("");
  }

  const handleDelete = (elem) => {
    console.log(elem);
    let accepted = window.confirm("Do you wish to remove this contact?");
    if (accepted) {
      contactService.removeContacts(elem).then((data) => {
        setContacts(contacts.filter((e) => e.id != elem.id))
        setFilterContacts(filterContacts.filter((e) => e.id != elem.id))
      })
    }
  }

  return (
    <div className="contacts-app">
      <AddContact 
        handleFormSubmission={handleFormSubmission}
        newName={newName} setNewName={setNewName}
        newEmail={newEmail} setNewEmail={setNewEmail}
      />
      <ContactList 
        contacts={contacts}
        newSearch={newSearch} setNewSearch={setNewSearch}
        filterContacts={filterContacts} setFilterContacts={setFilterContacts}
        deleteContact={handleDelete}
      />
    </div>
  );
};

export default App;