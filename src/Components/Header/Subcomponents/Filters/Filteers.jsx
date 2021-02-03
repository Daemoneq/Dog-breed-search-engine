import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import '../../../../Assets/fontello/css/fontello.css'

import { StoreContext } from '../../../../StoreProvider/StoreProvider';

import { default as FiltersStyles } from './Filters.module.scss';

const style = bemCssModules(FiltersStyles)

const Filters = () => {
    const { setIsMenuOpen } = useContext(StoreContext);

    const handleShowOrHideSideMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (

        <div onClick={handleShowOrHideSideMenu} className={style()}>
            <i className='icon-menu' style={{ fontSize: '.6rem' }} />
        </div>

    );
}

export default Filters;