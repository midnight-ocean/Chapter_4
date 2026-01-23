const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let contacts = [
    {id: 1, name: "John Doe", email: "john@example.com"},
    {id: 2, name: "Jane Smith", email: "jane@example.com"},
    {id: 3, name: "Bob Johnson", email: "bob@example.com"}
]

const info_string = `<h1>Contacts Web Server</h1> <p>Number of Contacts: ${contacts.length}</p>`;

app.post("/api/contacts", (req, res) => {
    if (!req.body.name) {
        res.status(400).json("Name not provided");
    }
     if (!req.body.email) {
        res.status(400).json("Email address not provided")
    }
    else if (contacts.find(m => m.email == req.body.email)) {
        res.status(409).json("Email address already in contacts")
    }
    else {
        const newContact = {
            id: `${Date.now().toString()}${Math.floor(Math.random() * 1000)}`,
            name: req.body.name,
            email: req.body.email
        }
        contacts.push(newContact);
        res.status(201).json(newContact);
    }
})

app.get("/api/contacts", (req, res) => {
    res.send(contacts)
});

app.get("/api/info", (req, res) => {
    res.send(info_string);
});

app.get("/api/contacts/:id", (req, res) => {
    const contact = contacts.find(m => m.id == req.params.id);
    if (!contact) {
        res.status(404).json("Contact not found. Quoth the server: 404!");
    }
    else {
        res.send(contact);
    }
})


app.delete("/api/contacts/:id", (req, res) => {
    const contact = contacts.find(m => m.id == req.params.id);
    if (!contact) {
        res.status(404).json("Contact not found. Quoth the server: 404!");
    }
    else {
        contacts = contacts.filter(elem => elem.id != req.params.id);
        res.status(204);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server is running on port", port);
})