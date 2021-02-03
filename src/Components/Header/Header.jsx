import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as HeaderStyles } from './Header.module.scss';

import { StoreContext } from '../../StoreProvider/StoreProvider';

import SearchInput from './Subcomponents/SearchInput/SearchInput';
import Filters from './Subcomponents/Filters/Filteers';

const style = bemCssModules(HeaderStyles);

const Header = () => {
    const { setVisibleBreeds, setCurrentPage, dogsDataArray, setCurrentBreedFromHint } = useContext(StoreContext)

    const handleOnClickLogo = () => {
        setVisibleBreeds(dogsDataArray)
        setCurrentPage(1)
        setCurrentBreedFromHint('')
    }

    return (
        <header className={style()}>
            <span className={style('logo')} onClick={handleOnClickLogo}>Logo</span>
            <nav className={style('navButtonsPlace')}>
                <SearchInput />
                <Filters />
            </nav>
        </header>
    );
}

export default Header;