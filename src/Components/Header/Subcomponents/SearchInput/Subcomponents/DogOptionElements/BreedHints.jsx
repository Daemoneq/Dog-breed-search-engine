import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../../../../../StoreProvider/StoreProvider';

import { default as BreedHintsStyles } from './BreedHints.module.scss';

const style = bemCssModules(BreedHintsStyles)

const BreedHints = ({ name }) => {
    const { setCurrentBreedFromHint, setBreedHints, setIsBreedHintClicked } = useContext(StoreContext)


    // FUNCTION TO HANDLE ON CLICK HINT EVENT
    const handleOnClickHint = (event) => {
        setCurrentBreedFromHint(event.target.innerHTML)
        setBreedHints('')
        setIsBreedHintClicked(true)
    };

    return (
        <li onClick={handleOnClickHint} className={style()}>{name}</li>
    );
}

export default BreedHints;