import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentNote.title,
      body: this.props.currentNote.body
    };
  }

  //#region non-rich text editor (form-based default)
  handleSubmit = event => {
    event.preventDefault();
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

  render() {
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
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
    );
  }
}

export default NoteEditor;
