import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROGRESSION } from "../../../utils/mutations";
const NewProgressionModal = ({ setNewProgressionModalOpen }) => {
  const [newProgression, setNewProgression] = useState({
    numerals: "",
    isMajor: false,
  });
  const [createProgression] = useMutation(CREATE_PROGRESSION);

  const handleNewProgression = async (e) => {
    e.preventDefault();
    try {
      await createProgression({
        variables: {
          numerals: newProgression.numerals,
          isMajor: newProgression.isMajor,
        },
      });
      setNewProgressionModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="modal">
      {" "}
      <button
        className="modal__close"
        onClick={() => setNewProgressionModalOpen(false)}
      >
        Close
      </button>{" "}
      <form onSubmit={(e) => handleNewProgression(e)} id="newProgressionForm">
        <div className="form__input-label-wrapper">
          <label htmlFor="numerals" className="form__label">
            Numerals
          </label>
          <input
            onChange={(e) =>
              setNewProgression({
                ...newProgression,
                numerals: e.target.value,
              })
            }
            name="numerals"
            id="numerals"
            className="form__input"
          />
        </div>
        <div className="form__input-label-wrapper">
          <label htmlFor="isMajor" className="form__label">
            Is Major?
          </label>
          <input
            onChange={() =>
              setNewProgression({
                ...newProgression,
                isMajor: !newProgression.isMajor,
              })
            }
            name="isMajor"
            id="isMajor"
            type="checkbox"
            className="form__input"
          />
        </div>
        <button className="btn btn-primary rounded">Add Progression</button>
      </form>
    </div>
  );
};

export default NewProgressionModal;
