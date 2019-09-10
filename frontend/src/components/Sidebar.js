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


  handleSorting = event => {
    console.log(this.props);
    const handler = this.props.handleNoteSorting;
    handler(event.target.value);
  };

  // the new button needs an onClick to create a new note
  render() {
    //console.log(this.props)
    return (
      <div className="master-detail-element sidebar">
        <select id="sort-by" onChange={this.handleSorting}>
          <option value="default">--Sort--</option>
          <option value="created-at">Newest</option>
          <option value="updated-at">Updated</option>
          <option value="title">Title</option>
        </select>
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
