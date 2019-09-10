import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes
    };
  }

  handleCreateNew = () => {
    const createNewNote = this.props.createNewNote;
    createNewNote();
  };

  parseDate = timeToParse => {
    return new Date(timeToParse).getTime();
  };

  // filterNotes = () => {
  //   switch (this.props.sortBy) {
  //     case "title":
  //        console.log(this.props.notes.sort())
  //       break;
  //     case "created-at":
  //       break;
  //     case "updated-at":
  //       break;
  //     default:
  //       break;
  //   }
  // };

  
  // the new button needs an onClick to create a new note
  render() {
    //console.log(this.props)
    return (
      <div className="master-detail-element sidebar">
        <NoteList
          notes={this.props.notes}
          setSelectedNote={this.props.setSelectedNote}
          stopEditNote={this.props.stopEditNote}
        />
        <button onClick={this.handleCreateNew}>New</button>

      </div>
    );
  }
}

export default Sidebar;
