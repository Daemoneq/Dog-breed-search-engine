import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext, BREED_NOT_FOUND } from '../../StoreProvider/StoreProvider';

import Tile from './Subcomponents/Tile/Tile';

import { default as MainStyles } from './Main.module.scss';
const style = bemCssModules(MainStyles)

const Main = () => {
    const { currentPage, tilesPerPage, currentBreedFromHint, visibleBreeds } = useContext(StoreContext);

    //Get current post
    const indexOfLastTile = currentPage * tilesPerPage;
    const indexOfFirstTile = indexOfLastTile - tilesPerPage;
    //dogsDataArray here 
    const currentTiles = visibleBreeds.slice(indexOfFirstTile, indexOfLastTile);

    // Create tiles
    let tiles = ''

    // const handleTest = (event) => {
    //     console.log(event.target)
    // }

    if (visibleBreeds && currentBreedFromHint && currentBreedFromHint !== BREED_NOT_FOUND) {
        // tiles = <Tile breed={visibleBreeds} key={visibleBreeds.id} />
        tiles = [...visibleBreeds].map(element => <Tile breed={element} key={element.id} />)
    } else {
        tiles = [...currentTiles].map(element => <Tile breed={element} key={element.id} />);
    }


    return (
        <main className={style()}>
            <div className={style('wrapper')}>
                {tiles}
            </div>
        </main>
    );
}

export default Main;