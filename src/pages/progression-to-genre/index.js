import React from "react";
import { Icon } from "@iconify/react";

const ProgressionToGenre = () => {
  return (
    <div className="center-container">
      <h2 className="h2">Add Progression to Genre</h2>
      {/* Genre wrapper */}
      <div className="form-input-label-wrapper">
        <label className="form-label">Genre</label>
        {/* Container that is the selector */}
        <div className="select-wrapper">
          <p className="select-icon">🎶</p>
          <p className="select-text">Pop Punk</p>
          <p className="select-chevron">&#9660;</p>
        </div>
      </div>

      {/* Progression Wrapper */}
      <div>
        <p className="form-label">Progressions</p>
        {/* Buttons grid */}
        <div className="grid-btns">
          {/* Map with all progresions query */}
          <button className="btn btn-round btn-dark">i iv v</button>
          <button className="btn btn-round btn-dark">i iv v</button>
          <button className="btn btn-round btn-dark">i iv v</button>
          <button className="btn btn-round btn-dark">i iv v</button>
        </div>
      </div>
    </div>
  );
};

export default ProgressionToGenre;
