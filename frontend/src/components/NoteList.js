import React from "react";
import NoteItem from "./NoteItem";

const NoteList = props => {
  const renderAllNotes = () => {
    // console.log(props.notes)
    return props.notes.map(note => {
      //if (note.includes(this.props.searchFilter))
      return (
        <NoteItem
          note={note}
          key={note.id}
          setSelectedNote={props.setSelectedNote}
          stopEditNote={props.stopEditNote}
        />
      );
    });
  };

  return (
    <ul>
      {renderAllNotes()}
      {/* <NoteItem /> */}
    </ul>
  );
};

export default NoteList;
