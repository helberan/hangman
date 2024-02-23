import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/helpers";

import React, { useState, useEffect } from "react";

function App() {
  const [playable, setPlayable] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  async function fetchWord() {
    let response = await fetch("https://random-word-api.herokuapp.com/word");
    let randomWord = await response.json();
    setSelectedWord(randomWord[0]);
    setPlayable(true);
    setGameStarted(true);

    console.log("randomWord: ", randomWord);
    console.log("selectedWord from fetch: ", selectedWord);
  }

  useEffect(() => {
    console.log("selectedWord: ", selectedWord);
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      console.log(key, keyCode);
      //pokud je playable true a zároveň je stisknutá klávesnice písmeno, tak převeď stisknuté písmeno do lowercase
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        //pokud je písmeno v hledaném slově a ještě není v correct letters, přidej ho tam - pokud už je, nedělej nic
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((prevLetters) => [...prevLetters, letter]);
          } else {
            show(setShowNotification);
          }
          //pokud písmeno není v hledaném slově a ještě není ve wrong letters, přidej ho tam - pokud už je, nedělej nic
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((prevLetters) => [...prevLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    //event listener na stisknutí klávesnice, jakmile se stiskne klávesnice, spustí se funkce handleKeydown
    window.addEventListener("keydown", handleKeydown);

    //event listener cleanup
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [correctLetters, wrongLetters, playable]);

  async function playAgain() {
    //debugger;
    setPlayable(false);

    //vyprázdění psímen
    setCorrectLetters([]);
    setWrongLetters([]);

    //new word
    await fetchWord();
  }

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      {gameStarted ? (
        <Popup
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          selectedWord={selectedWord}
          setPlayable={setPlayable}
          playAgain={playAgain}
        />
      ) : (
        <button onClick={playAgain}>Start game</button>
      )}
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
