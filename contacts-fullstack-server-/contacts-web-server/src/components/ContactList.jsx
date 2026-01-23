const ContactList = ({contacts, newSearch, setNewSearch, filterContacts, setFilterContacts, deleteContact}) => {

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
        const filter = event.target.value;
        const newFilterContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter))
        if (newFilterContacts.length == 0) {
          setFilterContacts([
            {
                id: Date.now().toString() + "d",
                name: "No contacts found", //Dummy entry
                email: ""
            },
          ])
          return;
        }
        setFilterContacts(newFilterContacts);
    }

    return <div className="contacts-app">
        <h2>Contact List</h2>
        <input type="text" placeholder="Search" value={newSearch} onChange={handleSearchChange}/>
        <table className="contact-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {filterContacts.map((elem) => {
                //Offsets the row color
                return <tr key={elem.id}>
                <td>
                    {elem.name}
                </td>
                <td>
                    {elem.email}
                </td>
                <td>
                    {elem.email != "" ? <button className="button-type" onClick={() => deleteContact(elem)}> Remove </button> : ""}
                </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}

export default ContactList;