const yargs = require('yargs')
const notes = require('./notes')
// console.log(process.argv)

// customize version
yargs.version('1.1.0')

// create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log("Adding a note!")
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note by title",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log("Removing a note!")
        notes.removeNote(argv.title)
    }
})

// create list command
yargs.command({
    command: "list",
    describe: "List notes",
    handler: () => {
        console.log("Listing a note!")
        notes.listNotes()
    }
})

// create read command
yargs.command({
    command: "read",
    describe: "Read note with specified title",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log("Listing a note!")
        notes.readNote(argv.title)
    }
})


// console.log(yargs.argv)
yargs.parse()