import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SONG } from "../../../utils/mutations";
const EditSongModal = ({ songDetails, setModalOpen }) => {
  const [editName, setEditName] = useState(false);
  const [editTempo, setEditTempo] = useState(false);
  const [newName, setNewName] = useState(songDetails.name);
  const [newTempo, setNewTempo] = useState(songDetails.tempo);

  const [updateSong] = useMutation(UPDATE_SONG);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSong({
        variables: {
          id: songDetails.id,
          songName: newName,
          tempo: newTempo,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="modal">
      <button className="modal__close" onClick={() => setModalOpen(false)}>
        Close
      </button>
      <h2 className="title--md">Editing "{songDetails.name}"</h2>
      <form
        action=""
        className="form--column"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="form__input-label-wrapper">
          <label className="form__label">New name</label>
          <input
            onFocus={() => setEditName(true)}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            className="form__input"
            value={!editName ? songDetails.name : newName}
          />
        </div>
        <div className="form__input-label-wrapper">
          <label className="form__label">New tempo</label>
          <input
            onFocus={() => setEditTempo(true)}
            onChange={(e) => setNewTempo(Number(e.target.value))}
            type="number"
            className="form__input"
            value={!editTempo ? songDetails.tempo : newTempo}
          />
        </div>
        <button type="submit" className="btn btn-primary rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditSongModal;
