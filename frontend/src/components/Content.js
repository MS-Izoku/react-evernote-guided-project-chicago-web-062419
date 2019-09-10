import React, { Component } from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentNote: {},
    // };
  }
  renderContent = () => {
    //console.log(this.props)
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

  // componentDidMount() {
  //   this.setState({ currentNote: this.props.currentNote });
  // }

  // componentDidUpdate(prevState) {
  //   if (this.state.currentNote !== prevState.currentNote)
  //     this.setState({ currentNote: this.props.currentNote });
  // }

  render() {
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    );
  }
}

export default Content;
