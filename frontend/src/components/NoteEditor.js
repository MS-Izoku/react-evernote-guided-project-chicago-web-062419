import React, { Component } from "react";

// this is a richtext editor, needs some work to get up and running
//import { Editor, EditorState } from "draft-js";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body,
      // editorState: EditorState.createEmpty() // used in Draft.js
    };

    // used in Draft.js
    this.onEditorChange = editorState => {
      console.log(this.state.editorState);
      this.setState({ editorState });
    };
  }

  //#region non-rich text editor (form-based default)
  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    const saveChanges = this.props.saveEditedNote; // set this with deconstruction later?
    saveChanges(this.state);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCancel = () => {
    const stopEditing = this.props.stopEditNote;
    stopEditing();
  };
  //#endregion

  // this is for rich text editing
  //#region rich-text editor with Draft.js
  handleKeyCommand = () => {};

  onEditorChange = () => {};
  //#endregion

  render() {
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
        {/* Draft.js Component */}
        {/* <Editor
          onChange={this.onEditorChange}
          editorState={this.state.editorState}
          name="title"
          value={this.state.title}
        /> */}

        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.state.title}
        />
        <textarea
          name="body"
          onChange={this.handleChange}
          value={this.state.body}
        />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      // <Editor editorState={this.state.editorState} onChange={this.handleChange} />
    );
  }
}

export default NoteEditor;
