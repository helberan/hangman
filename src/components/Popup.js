import React, { useEffect } from "react";
import { checkWin } from "../helpers/helpers";
import "nes.css/css/nes.min.css";

function Popup({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) {
  let finalMessage = "";
  let finalRevealWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congratulations! You won! :)";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Unfortunately, you lost! :(";
    finalRevealWord = `The word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  }, [playable]);

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="nes-container with-title is-centered popup">
        <h2>{finalMessage}</h2>
        <h3>{finalRevealWord}</h3>
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={playAgain}
        >
          Play again
        </button>
      </div>
    </div>
  );
}

export default Popup;
