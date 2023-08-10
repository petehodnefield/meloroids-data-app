import React from "react";

const SongDetailsModal = ({ songDetails, setSongDetailsModalOpen }) => {
  console.log(songDetails);
  return (
    <div
      className="modal"
      style={{ backgroundImage: `url(${songDetails.album_artwork})` }}
    >
      {" "}
      <button
        className="modal__close"
        onClick={() => setSongDetailsModalOpen(false)}
      >
        Close
      </button>
      <div className="card  card--sm card--align-center">
        <h2 className="title--md">"{songDetails.name}"</h2>
        <p>Tempo: {songDetails.tempo}</p>
        <p>Key: {songDetails.key}</p>
        <p>Progression: {songDetails.progression}</p>
      </div>
    </div>
  );
};

export default SongDetailsModal;
