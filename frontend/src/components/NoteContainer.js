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
      searchFilter: "all",  // check search against body / title / all content
      sortBy: "default" // sorting by name / created / updated
    };
  }

  // #region FETCH requests <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
      user: {...this.state.user}
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

  // #region state-handlers <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  handleSearchQuery = myQuery => {
    // how can I get this to rerender after the filter changes in the search bar in realtime?
    this.setState({
      notes: this.state.allNotes.filter(note => {
        return this.state.searchFilter === "all"
          ? note.title.toLowerCase().includes(myQuery.toLowerCase()) ||
              note.body.toLowerCase().includes(myQuery.toLowerCase())
          : note[this.state.searchFilter].toLowerCase().includes(myQuery.toLowerCase());
      })
    });
  };

  // I feel that I could refactor these into a larger, more reusable method/s
  handleNoteSorting = sortingMethod => {
    this.setState({ sortBy: sortingMethod });
  };

  // filters the results from the search bar
  // this needs work for a more responsive change
  setFilter = filterVal => {
    console.log('changing filter to: ' + filterVal)
    this.setState({ searchFilter: filterVal } , );
  };

  // broke these out for the sake of management
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

  render() {
    return (
      <Fragment>
        <Search
          handleSearchQuery={this.handleSearchQuery}
          setFilter={this.setFilter}
        />
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            setSelectedNote={this.setSelectedNote}
            stopEditNote={this.stopEditNote}
            editingNote={this.state.editingNote}
            createNewNote={this.createNewNote}
            sortBy={this.state.sortBy}
            handleNoteSorting={this.handleNoteSorting}
            searchFilter={this.state.searchFilter}
            searchQuery={this.state.searchQuery}
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
