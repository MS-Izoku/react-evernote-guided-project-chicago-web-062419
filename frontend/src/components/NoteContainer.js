import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      allNotes: [],
      currentNote: {},
      editingNote: false,
      user: {
        // this can be used later when logging in is a thing
        id: 1,
        name: "flatironschool"
      },
      searchQuery: "",
      searchFilter: "all",
      sortBy: "default"
    };
  }

  // #region FETCH requests
  getNotes = () => {
    fetch("http://localhost:3000/api/v1/notes")
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        // filter stuff here
        this.setState({ notes: json, allNotes: json });
      });
  };

  // PATCH fetch request for updating a note, takes in the ID
  saveEditedNote = changedNoteObj => {
    fetch("http://localhost:3000/api/v1/notes/" + this.state.currentNote.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: changedNoteObj.title,
        body: changedNoteObj.body
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(() => {
        this.setState({
          currentNote: {
            ...this.state.currentNote,
            title: changedNoteObj.title,
            body: changedNoteObj.body
          },
          editingNote: false
        });
        this.getNotes();
      });
  };

  // POST fetch request for creating a new note
  createNewNote = () => {
    const freshNote = {
      title: "Titulo Maximus",
      body: "Click -Edit- to add some LIFE to this poor, sorry note",
      user: this.state.user
    };
    fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(freshNote)
    })
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        this.setState({ currentNote: json }); // doing this will view the newly created note
        this.getNotes();
      });
  };

  deleteNote = () => {
    fetch("http://localhost:3000/api/v1/notes/" + this.state.currentNote.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application.json",
        Accept: "application.json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(() => {
        this.setState({ currentNote: {} });
        this.getNotes();
      });
  };
  // #endregion

  // #region state-handlers
  handleSearchQuery = myQuery => {
    this.setState({
      notes: this.state.allNotes.filter(note => {
        return this.state.searchFilter === "all"
          ? note.title.toLowerCase().includes(myQuery) ||
              note.body.toLowerCase().includes(myQuery)
          : note[this.state.searchFilter].toLowerCase().includes(myQuery);
      })
    });
  };

  // I feel that I could refactor these into a larger, more reusable method/s
  handleNoteSorting = sortingMethod => {
    this.setState({ sortBy: sortingMethod });

  };

  setFilter = filterVal => {
    this.setState({ searchFilter: filterVal });
  };

  editNote = () => {
    this.setState({ editingNote: true });
  };

  stopEditNote = () => {
    this.setState({ editingNote: false });
  };

  setSelectedNote = note => {
    this.setState({ currentNote: note }); // changes the displayed note in the Content
  };
  //#endregion

  // #region Lifecycle Methods
  componentDidMount() {
    this.getNotes(); // get notes when the component mounts
  }

  parseTime = timeToParse => {
    //console.log(new Date(this.state.notes[0].created_at).getTime())
    return new Date(timeToParse).getTime();
  };
  //#endregion
  filterNotes = () => {
    switch (this.state.sortBy) {
      case "title":
        return [...this.state.notes].sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      case "created-at":
        return [...this.state.notes].sort((a, b) => {
          if (this.parseTime(a.created_at) < this.parseTime(b.created_at)) {
            return 1;
          } else {
            return -1;
          }
        });
      case "updated-at":
          return [...this.state.notes].sort((a, b) => {
            if (this.parseTime(a.updated_at) < this.parseTime(b.updated_at)) {
              return 1;
            } else {
              return -1;
            }
          });
      default:
        return this.state.notes;
    }
  };

  render() {
    return (
      <Fragment>
        <Search
          handleSearchQuery={this.handleSearchQuery}
          setFilter={this.setFilter}
          // handleNoteSorting={this.handleNoteSorting}
        />
        <div className="container">
          <Sidebar
            notes={this.filterNotes()}
            setSelectedNote={this.setSelectedNote}
            stopEditNote={this.stopEditNote}
            editingNote={this.state.editingNote}
            createNewNote={this.createNewNote}
            sortBy={this.state.sortBy}
            handleNoteSorting={this.handleNoteSorting}
          />
          <Content
            currentNote={this.state.currentNote}
            saveEditedNote={this.saveEditedNote}
            editingNote={this.state.editingNote}
            editNote={this.editNote}
            stopEditNote={this.stopEditNote}
            deleteNote={this.deleteNote}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
