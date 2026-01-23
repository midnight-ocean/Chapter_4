import { useState } from 'react';
const AddContact = ({handleFormSubmission, newName, setNewName, newEmail, setNewEmail}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }
    
    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    }

    return <div className = "contacts-app">
        <h2>Add a New Contact</h2>
        <form onSubmit={handleFormSubmission}>
            <input type="text" placeholder="Enter contact name" value={newName} onChange={handleNameChange}/>
            <input type="text" placeholder="Enter email address" value={newEmail} onChange={handleEmailChange}/>
            <button type="submit">Add Contact</button>
        </form>
    </div>
}

export default AddContact;