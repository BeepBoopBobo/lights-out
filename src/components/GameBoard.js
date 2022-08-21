import React, { useEffect, useState } from "react";
import GameTile from "./GameTile";
import styles from './GameBoard.module.css'

const GameBoard = () => {
    const [boardState, setBoardState] = useState([[], [], [], [], []]);
    const [hasWon, setHasWon] = useState(false);


    //generate a board of random '1' and '0' on mounting the component
    useEffect(() => {
        const generateBoard = () => {
            let generatedArray = [[], [], [], [], []];
            console.log(generatedArray)
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    generatedArray[i][j] = Math.floor(Math.random() * 2);
                }
            }
            setBoardState(generatedArray);
        }
        generateBoard();
    }, [])

    //renders board row after row and then returns it as a whole array
    const renderBoard = () => {
        let boardArray = []
        for (let i = 0; i < 5; i++) {
            Object.values(boardState).at(i).forEach(
                (item, index) => {
                    boardArray.push(<GameTile value={item} row={i} col={index} toggleTileState={handleTileClick} key={`tile[${i}-${index}]`} />);
                })
        }
        return boardArray;
    }

    //adds all values to the sumOfValues and if it is equal to 25, then set the state of the game to won
    const checkGameStatus = () => {
        let sumOfValues = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (boardState[i][j] === 1) {
                    sumOfValues++
                }
            }
        }
        if (sumOfValues === 25) {
            setHasWon(true)
        }
    }

    //checks if the row/col is withing the boundries of the board and then swaps the value of the given tile
    //returns updated array
    const toggleTile = (row, col) => {
        let tempArray = [...boardState];

        if ((row >= 0 && row < 5) && (col >= 0 && col < 5)) {
            //if the value of the element is '1' swap it to '0', otherwise make it a '1'
            if (tempArray[row][col] === 1) {
                tempArray[row][col] = 0;
            } else {
                tempArray[row][col] = 1;
            }
        }
        setBoardState(tempArray);
    }

    //calls for the clicked and adjecent tiles to have their values swapped
    //at last it calls checkGameStatus> checks if the sum of all values in the 2d array add up to 25
    const handleTileClick = (row, col) => {
        toggleTile(row, col);
        toggleTile(row + 1, col);
        toggleTile(row - 1, col);
        toggleTile(row, col + 1);
        toggleTile(row, col - 1);
        checkGameStatus();
    }

    return <div className={styles.gameContainer}>
        <h1> Lights Out</h1>
        <div className={styles.board}>
            {hasWon ? <h1>YOU WON</h1> : renderBoard()}
        </div>
    </div>
}

export default GameBoard;