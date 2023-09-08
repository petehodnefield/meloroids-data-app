import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROGRESSION } from "../../../utils/mutations";
const Progressions = () => {
  const [createProgression] = useMutation(CREATE_PROGRESSION);

  const [newProgression, setNewProgression] = useState({
    numerals: "",
    isMajor: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const hellowWorld = await createProgression({
        variables: {
          numerals: newProgression.numerals,
          isMajor: newProgression.isMajor,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form className="form--column" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form__input-label-wrapper">
          <label className="form__label" htmlFor="numerals">
            Numerals
          </label>
          <input
            className="form__input"
            name="numerals"
            id="numerals"
            type="text"
            onChange={(e) =>
              setNewProgression({ ...newProgression, numerals: e.target.value })
            }
          />
        </div>
        <div className="form__input-label-wrppaer">
          <label className="form__label">Is Major?</label>
          <input
            onChange={() =>
              setNewProgression({
                ...newProgression,
                isMajor: !newProgression.isMajor,
              })
            }
            type="checkbox"
            name="isMajor"
            id="isMajor"
            checked={newProgression.isMajor}
            className=""
          />
        </div>
        <button className="btn btn-primary rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Progressions;
