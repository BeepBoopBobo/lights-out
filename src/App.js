import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faPlus, faMagnifyingGlass);

function App() {
  return <>
    <GameBoard></GameBoard>
  </>
}

export default App;
