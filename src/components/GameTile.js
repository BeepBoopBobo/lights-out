import React from "react";
import styles from './GameTile.module.css';

const GameTile = (props) => {
    //renders a single tile, checks the value to change classname for css styling
    return <div onClick={() => props.toggleTileState(props.row, props.col)}
        className={props.value === 1 ? styles.tileActive : styles.tile} >
    </div>
}

export default GameTile;