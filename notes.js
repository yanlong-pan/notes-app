const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    if (findNoteByTitle(notes, title)) {
        console.log(`title already exists: ${title}`)
    } else {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green(`New note added with title: ${title}`))
        console.log(notes)
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = filterNotesByTitle(notes, title)
    saveNotes(filteredNotes)
    console.log(
        filteredNotes.length === notes.length 
        ? chalk.inverse.red("No note found") 
        : chalk.inverse.green(`Note removed with title: ${title}`)
    )
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(chalk.yellowBright(note.title))
        // console.log(chalk.inverse.blueBright(note.body))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    if(note = findNoteByTitle(notes, title)){
        console.log(chalk.yellowBright(note.title))
        console.log(chalk.inverse.blueBright(note.body))
    } else {
        console.log(chalk.red.inverse(`error: Note with title: "${title}" not found`))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []        
    }
}

const findNoteByTitle = (notes, title) => {
    return notes.find(note => note.title === title)
}

const filterNotesByTitle = (notes, title) => {
    return notes.filter(note => note.title !== title)
}



module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}