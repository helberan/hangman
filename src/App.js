import "./App.css";
import Header from "./components/Header";
import Postava from "./components/Postava";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";

import React, { useState, useEffect } from "react";

//slova k uhodnutí
const words = ["giraffe", "hippopotamus", "chimpanzee", "gorilla"];
//random zvolené slovo z words
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      console.log(key, keyCode);
      //pokud je playable true a zároveň je stisknutá klávesnice písmeno, tak převeď stisknuté písmeno do lowercase
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((prevLetters) => [...prevLetters, letter]);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((prevLetters) => [...prevLetters, letter]);
          }
        }
      }
    };
    console.log(correctLetters);
    console.log(wrongLetters);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [correctLetters, wrongLetters, playable]);

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Postava />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
    </div>
  );
}

export default App;
