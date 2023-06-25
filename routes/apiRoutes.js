const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8")); // readFilesync reads the file and returns the content of the file. It's a synchronous method which means it will block the code execution until the file is read completely.
    res.json(notes);
});

// POST "/api/notes" receives a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.
router.post("/notes", (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    console.log(notes);

    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    console.log(newNote);

    // push newNote to notes array
    notes.push(newNote);

    // write the updated notes array to the db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    /// return the new notes array to the client
    res.json(notes);
});

// DELETE "/api/notes/:id" deletes the note with an id equal to `req.params.id`
router.delete("/notes/:id", (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    console.log(notes);

    // filter out the note with the id that was passed in the url
    notes = notes.filter((note) => note.id !== req.params.id);

    // write the filtered notes array to the db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    // return the new notes array to the client
    res.json(notes);
});

module.exports = router;