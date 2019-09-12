import React, { Component } from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

class Content extends Component {
  renderContent = () => {
    if (this.props.editingNote && this.isNotePopulated()) {
      // if the note is blank AND the state is set to edit-mode
      return (
        <NoteEditor
          currentNote={this.props.currentNote}
          saveEditedNote={this.props.saveEditedNote}
          stopEditNote={this.props.stopEditNote}
        />
      );
    } else if (this.isNotePopulated()) {
      // if the note is populated and note being edited
      return (
        <NoteViewer
          currentNote={this.props.currentNote}
          editNote={this.props.editNote}
          deleteNote={this.props.deleteNote}
        />
      );
    } else {
      // default render
      return <Instructions />;
    }
  };

  isNotePopulated = () => {
    return Object.keys(this.props.currentNote).length !== 0;
  };

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    );
  }
}

export default Content;
