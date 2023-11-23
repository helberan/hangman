import "./App.css";
import Header from "./components/Header";
import Postava from "./components/Postava";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/helpers";

import React, { useState, useEffect } from "react";

//slova k uhodnutí
const words = ["giraffe", "hippopotamus", "chimpanzee", "gorilla"];
//random zvolené slovo z words
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
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

    //event listener celanup
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [correctLetters, wrongLetters, playable]);

  const playAgain = () => {
    setPlayable(true);

    //vyprázdění psímen
    setCorrectLetters([]);
    setWrongLetters([]);

    //slova k uhodnutí
    const random = Math.floor(Math.random() * words.length);
    //random zvolené slovo z words
    selectedWord = words[random];
  };

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Postava wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
