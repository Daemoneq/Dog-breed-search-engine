import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../../../StoreProvider/StoreProvider';

import { default as TileStyles } from './Tile.module.scss';
const style = bemCssModules(TileStyles)

const Tile = ({ breed }) => {
    const { setIsModalOpen, dogsDataArray, setDataInModal } = useContext(StoreContext)

    const handleTileOnClick = (event) => {
        const ModalData = dogsDataArray.filter(e => e.name === event.target.dataset.name)

        setDataInModal(ModalData)

        setIsModalOpen(true)
    }


    return (
        <>
            <div onClick={handleTileOnClick} data-name={breed.name} className={style()}>
                <img className={style('img')} data-name={breed.name} src={breed.image.url} alt="xd" />
                <p className={style('breedName')} data-name={breed.name}>{breed.name}</p>
            </div>
        </>
    );
}

export default Tile;