import React from "react";
import styles from './GameTile.module.css';

const GameTile = (props) => {
    const tileId = 'tile-' + props.row + '-' + props.col
    //renders a single tile, checks the value to change classname for css styling
    return <div
        id={tileId}
        onMouseEnter={() => props.handleTileIn(props.row, props.col)}
        onMouseLeave={() => props.handleTileOut(props.row, props.col)}
        onClick={() => props.toggleTileState(props.row, props.col)}
        className={props.value === 1 ? styles.tileActive : styles.tile} >
    </div>
}

export default GameTile;