import React, { useEffect, useState } from "react";
import GameTile from "./GameTile";
import styles from './GameBoard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameBoard = () => {
    const [boardState, setBoardState] = useState([[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]);
    const [boardHistory, setboardHistory] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [showHistory, setShowHistory] = useState(false);


    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            let ranX = Math.floor(Math.random() * boardState.length);
            let ranY = Math.floor(Math.random() * boardState.length);
            handleTileClick(ranX, ranY);
        }
    }, [])

    //renders board row after row and then returns it as a whole array
    const renderBoard = () => {
        let boardArray = [];
        for (let i = 0; i < 5; i++) {
            Object.values(boardState).at(i).forEach(
                (item, index) => {
                    boardArray.push(<GameTile value={item} row={i} col={index} toggleTileState={handleTileClick} key={`tile[${i}-${index}]`} />);
                })
        }
        return boardArray;
    }

    const generateActiveTiles = () => {
        setHasWon(false);
        clearState();

        for (let i = 0; i < 4; i++) {
            let ranX = Math.floor(Math.random() * boardState.length);
            let ranY = Math.floor(Math.random() * boardState.length);
            handleTileClick(ranX, ranY);
        }
    }

    const clearState = () => {

        let newBoard = [...boardState];
        for (let i = 0; i < 5; i++) {
            for (let x = 0; x < 5; x++) {
                newBoard[i][x] = 1
            }
        }
        setBoardState(newBoard)
        setboardHistory([]);
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
            if (showHistory) toggleHistory();
            setHasWon(true);
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
        let currBoard = boardState.map(row => [...row]);

        setboardHistory((prevState) => [...prevState, currBoard]);
    }



    const toggleHistory = () => {
        setShowHistory(!showHistory)
    }

    const renderHistory = () => {
        let historyBoard = [];
        boardHistory.forEach((board, boardIndex) => {
            let boardId = `board-${boardIndex}`;
            let boardRows = [];
            board.forEach((row, rowIndex) => {
                let rowKey = `board-${boardIndex}-row-${rowIndex}`
                let rowTiles = [];

                row.forEach((tile, tileIndex) => {
                    let tileKey = `${rowKey}-tile-${tileIndex}`
                    rowTiles.push(<div className={tile === 1 ? "history-tile active" : "history-tile"} key={tileKey} ></div>)
                })
                boardRows.push(<div className='history-board-row' key={rowKey}>{rowTiles}</div>)
            })

            historyBoard.push(
                <div className="history-board" id={boardId}>{boardRows}</div>
            )
        })
        return historyBoard;
    }

    return <div >
        <h1> LIGHTS OUT</h1>
        <div id={styles.options}>
            <button className={styles.optbtn} onClick={generateActiveTiles}><FontAwesomeIcon icon="plus" /> new game</button>
            <button className={styles.optbtn} onClick={toggleHistory}><FontAwesomeIcon icon="magnifying-glass" /> {showHistory ? 'hide history' : 'show history'} </button>
            <button className={styles.optbtn} onClick={clearState}><FontAwesomeIcon icon="xmark" /> clear</button>
        </div>
        <div className={styles.gameContainer}>

            {hasWon ?
                <div className={styles.gameover}>
                    <h1 id={styles.win}>YOU WON</h1>
                    <button className={styles.optbtn} onClick={generateActiveTiles}><FontAwesomeIcon icon="rotate-left" /> new game</button>
                </div>
                : <div className={styles.board}>
                    {renderBoard()}
                </div>}

            <div className={showHistory ? 'history' : `history hidden`}>
                {renderHistory()}
            </div>
        </div>
    </div>
}

export default GameBoard;