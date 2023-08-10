import React from "react";

const SongDetailsModal = ({ songDetails, setSongDetailsModalOpen }) => {
  console.log(songDetails);
  return (
    <div
      className="modal modal--song-details"
      style={{ backgroundImage: `url(${songDetails.album_artwork})` }}
    >
      {" "}
      <button
        className="modal__close"
        onClick={() => setSongDetailsModalOpen(false)}
      >
        Close
      </button>
      <div className="modal__content">
        <h2 className="modal__title">"{songDetails.name}"</h2>
        <p className="modal__text">
          <span className="bold">Tempo:</span> {songDetails.tempo} bpm
        </p>
        <p className="modal__text">
          <span className="bold">Key:</span> {songDetails.key}
        </p>
        <p className="modal__text">
          <span className="bold">Progression:</span> {songDetails.progression}
        </p>
      </div>
    </div>
  );
};

export default SongDetailsModal;
