import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes,
      filter: this.props.searchFilter
    };
  }

  handleCreateNew = () => {
    const createNewNote = this.props.createNewNote;
    createNewNote();
  };

  parseDate = timeToParse => {
    return new Date(timeToParse).getTime();
  };

  handleSorting = event => {
    console.log(this.props);
    const handler = this.props.handleNoteSorting;
    handler(event.target.value);
  };

  parseTime = timeToParse => {
    //console.log(new Date(this.state.notes[0].created_at).getTime())
    return new Date(timeToParse).getTime();
  };

  sortNotes = () => { // actually a sort
    let noteArray = [...this.props.notes]
    noteArray.filter(note => {
      if (this.props.searchFilter === "body") {
        return note.body.includes(this.props.searchQuery)
      } else if (this.props.searchFilter === "title") {
        return note.title.includes(this.props.searchQuery)
      } else {
        return note
      }
    })

    //console.log(noteArray)

    switch (this.props.sortBy) {
      case "title":
        return noteArray.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      case "created-at":
        return noteArray.sort((a, b) => {
          if (this.parseTime(a.created_at) < this.parseTime(b.created_at)) {
            return 1;
          } else {
            return -1;
          }
        });
      case "updated-at":
          return noteArray.sort((a, b) => {
            if (this.parseTime(a.updated_at) < this.parseTime(b.updated_at)) {
              return 1;
            } else {
              return -1;
            }
          });
      default:
        return this.props.notes;
    }
  };

  // the new button needs an onClick to create a new note
  render() {
    //console.log(this.props)
    return (
      <div className="master-detail-element sidebar">
        <select id="sort-by" onChange={this.state.notes !== [] ? this.handleSorting : null} className={'sidebarSelect'}>
          <option value="default">--Sort--</option>
          <option value="created-at">Newest</option>
          <option value="updated-at">Updated</option>
          <option value="title">Title</option>
        </select>
        <NoteList
          notes={this.sortNotes()}
          setSelectedNote={this.props.setSelectedNote}
          stopEditNote={this.props.stopEditNote}
          searchFilter={this.props.searchFilter}
        />
        <button onClick={this.handleCreateNew}>New</button>
      </div>
    );
  }
}

export default Sidebar;
