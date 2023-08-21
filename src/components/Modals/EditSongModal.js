import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  KEY,
  ALL_KEYS,
  ALL_PROGRESSIONS,
  PROGRESSION,
} from "../../../utils/queries";
import { UPDATE_SONG } from "../../../utils/mutations";
const EditSongModal = ({ songDetails, setModalOpen }) => {
  // Keep track of open
  const [editOpen, setEditOpen] = useState({
    editName: false,
    editTempo: false,
    editKey: false,
    editProgression: false,
  });
  // All Keys and All Progression State
  const [allKeys, setAllKeys] = useState([]);
  const [allProgressions, setAllProgressions] = useState();
  // State keeping track of all data needed to update the song
  const [editedSongData, setEditedSongData] = useState({
    newName: songDetails.name,
    newTempo: songDetails.tempo,
    oldKeyName: "",
    oldKeyId: "",
    oldProgressionNumerals: "",
    oldProgressionId: "",
    newKeyId: "",
    newKey: "",
    newProgressionId: "",
    newProgressionNumerals: "",
  });
  const [oldKey, setOldKey] = useState("");
  const [oldProgression, setOldProgression] = useState("");
  const [newName, setNewName] = useState(songDetails.name);
  const [newTempo, setNewTempo] = useState(songDetails.tempo);
  const [newKey, setNewKey] = useState("");
  const [newProgression, setNewProgression] = useState("");

  // Queries
  const { data: keyData } = useQuery(KEY, {
    variables: { keyId: songDetails.keyId },
  });
  const { data: allKeysData } = useQuery(ALL_KEYS);
  const { data: progressionData } = useQuery(PROGRESSION, {
    variables: {
      progressionId: songDetails.progressionId,
    },
  });
  const { data: allProgressionsData } = useQuery(ALL_PROGRESSIONS);

  // Mutations
  const [updateSong] = useMutation(UPDATE_SONG);

  // UseEffects
  useEffect(() => {
    if (!keyData || keyData.key === null) {
      return;
    } else {
      const key = keyData.key;
      setEditedSongData({
        ...editedSongData,
        oldKeyId: key._id,
        newKeyId: key._id,
        oldKeyName: `${key.key} ${key.is_major ? "major" : "minor"}`,
      });
    }
  }, [keyData]);
  useEffect(() => {
    if (!allKeysData || allKeysData.keys === null) {
      return;
    } else {
      const keys = allKeysData.keys;
      setAllKeys(keys);
    }
  }, [allKeysData]);
  useEffect(() => {
    if (!allProgressionsData || allProgressionsData.progressions === null) {
      return;
    } else {
      setAllProgressions(allProgressionsData.progressions);
    }
  }, [allProgressionsData]);
  useEffect(() => {
    if (!progressionData || progressionData.progression === null) {
      return;
    } else {
      setEditedSongData({
        ...editedSongData,
        oldProgressionNumerals: progressionData.progression.numerals,
        oldProgressionId: progressionData.progression._id,
        newProgressionId: progressionData.progression._id,
      });
    }
  }, [progressionData]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSong({
        variables: {
          songId: songDetails.id,
          songName: editedSongData.newName,
          tempo: editedSongData.newTempo,
          oldProgressionId: editedSongData.oldProgressionId,
          newProgressionId: editedSongData.newProgressionId,
          oldKeyId: editedSongData.oldKeyId,
          newKeyId: editedSongData.newKeyId,
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
            onFocus={() =>
              setEditOpen({ ...editOpen, editName: !editOpen.editName })
            }
            onChange={(e) =>
              setEditedSongData({ ...editedSongData, newName: e.target.value })
            }
            type="text"
            className="form__input"
            value={
              !editOpen.editName
                ? editedSongData.newName
                : editedSongData.newName
            }
          />
        </div>
        <div className="form__input-label-wrapper">
          <label className="form__label">New tempo</label>
          <input
            onFocus={() =>
              setEditOpen({ ...editOpen, editTempo: !editOpen.editTempo })
            }
            onChange={(e) =>
              setEditedSongData({
                ...editedSongData,
                newTempo: Number(e.target.value),
              })
            }
            type="number"
            className="form__input"
            value={
              !editOpen.editTempo
                ? editedSongData.newTempo
                : editedSongData.newTempo
            }
          />
        </div>

        {/* Edit Key */}
        <div className="form__input-label-wrapper">
          <label className="form__label">New Key</label>
          <div
            className="form__input"
            onClick={() =>
              setEditOpen({ ...editOpen, editKey: !editOpen.editKey })
            }
          >
            {editedSongData.newKey
              ? editedSongData.newKey
              : editedSongData.oldKeyName}
          </div>
          <div className="card card--overflow">
            {editOpen.editKey
              ? allKeys.map((key) => (
                  <div
                    key={key._id}
                    className="card__row"
                    onClick={() => {
                      setEditOpen({ ...editOpen, editKey: !editOpen.editKey });
                      setEditedSongData({
                        ...editedSongData,
                        newKeyId: key._id,
                        newKey: `${key.key} ${
                          key.is_major ? "major" : "minor"
                        }`,
                      });
                    }}
                  >
                    {key.key} {key.is_major ? "major" : "minor"}
                  </div>
                ))
              : ""}
          </div>
        </div>

        {/* Edit Progression */}
        <div className="form__input-label-wrapper">
          <label className="form__label">New Progression</label>
          <div
            className="form__input"
            onClick={() =>
              setEditOpen({
                ...editOpen,
                editProgression: !editOpen.editProgression,
              })
            }
          >
            {editedSongData.newProgressionNumerals
              ? editedSongData.newProgressionNumerals
              : editedSongData.oldProgressionNumerals}
          </div>
          <div className="card card--overflow">
            {editOpen.editProgression
              ? allProgressions.map((progression) => (
                  <div
                    key={progression._id}
                    className="card__row"
                    onClick={() => {
                      setEditOpen({
                        ...editOpen,
                        editProgression: !editOpen.editProgression,
                      });
                      setEditedSongData({
                        ...editedSongData,
                        newProgressionNumerals: progression.numerals,
                        newProgressionId: progression._id,
                      });
                    }}
                  >
                    {progression.numerals}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <button type="submit" className="btn btn-primary rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditSongModal;
