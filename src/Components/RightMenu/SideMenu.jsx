import React, { useContext, useRef, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import useOutsideClick from '../../Hooks/useOutsideClick';

import menuItems from '../../Assets/menuItems';

import { StoreContext } from '../../StoreProvider/StoreProvider';

import { default as SideMenuStyles } from './SideMenu.module.scss';
const style = bemCssModules(SideMenuStyles);

const BREEDS_GROUP = 'breedsGroup';
const HEIGHT = 'height';
const AVERAGE_LIFE_SPAN = 'averageLifeSpan';
const OPEN_SIDE_MENU = 'translateX(0px)';
const CLOSE_SIDE_MENU = 'translateX(-200px)';

//BEGINING OF THE COMPONENT
const SideMenu = () => {
    const [groupOfFilters, setGroupOfFilters] = useState(null);

    const { isMenuOpen, setIsMenuOpen, setVisibleBreeds, dogsDataArray, setCurrentPage, dogsDataArrayWithSumValues } = useContext(StoreContext);

    const sideMenuRef = useRef(null);

    //HANDLE OPEN OR CLOSE SIDE MENU
    if (isMenuOpen) {
        sideMenuRef.current.style.transform = CLOSE_SIDE_MENU
    } else if (isMenuOpen === false) {
        sideMenuRef.current.style.transform = OPEN_SIDE_MENU;
    }
    useOutsideClick(sideMenuRef, () => {
        if (isMenuOpen) {
            sideMenuRef.current.style.transform = OPEN_SIDE_MENU;
            setIsMenuOpen(false)
        }
    })


    //FUNCTION TO HANDLE ON CLICK ITEM 
    const handleOnClickFilter = (event) => {
        if (groupOfFilters === BREEDS_GROUP) {
            handleGroupOfBreed(event.target.innerHTML)
        } else if (groupOfFilters === HEIGHT) {
            handleHeightOfBreeds(event.target.innerHTML)
        } else if (groupOfFilters === AVERAGE_LIFE_SPAN) {
            handleLifeSpanOfBreeds(event.target.innerHTML)
        }
    };


    // FUNCTIONS TO SORT FILTERS
    const handleGroupOfBreed = (breedGroup) => {
        const filtredByBreeds = dogsDataArray.filter(element => element.breed_group === breedGroup)
        setVisibleBreeds(filtredByBreeds)
        setCurrentPage(1)
    }

    const handleHeightOfBreeds = (size) => {
        switch (size) {
            case menuItems.height[0]:
                const smallWithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].heightSum < 70)
                const small = smallWithSumValues.map(e => e[0])
                setVisibleBreeds(small)
                setCurrentPage(1)
                break;

            case menuItems.height[1]:
                const mediumWithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].heightSum > 70 && e[1].heightSum < 120)
                const medium = mediumWithSumValues.map(e => e[0])
                setVisibleBreeds(medium)
                setCurrentPage(1)
                break;

            case menuItems.height[2]:
                const bigWithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].heightSum > 120)
                const big = bigWithSumValues.map(e => e[0])
                setVisibleBreeds(big)
                setCurrentPage(1)
                break;

            default:
                break;
        }
    }

    const handleLifeSpanOfBreeds = (averageLifeSpan) => {
        switch (averageLifeSpan) {
            case menuItems.averageLifeSpan[0]:
                const testWithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].averageLifeSpan <= 11)
                const test = testWithSumValues.map(e => e[0])
                setVisibleBreeds(test)
                setCurrentPage(1)
                break;
            case menuItems.averageLifeSpan[1]:
                const test2WithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].averageLifeSpan > 11 && e[1].averageLifeSpan <= 13)
                const test2 = test2WithSumValues.map(e => e[0])
                setVisibleBreeds(test2)
                setCurrentPage(1)
                break;
            case menuItems.averageLifeSpan[2]:
                const test3WithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].averageLifeSpan > 13 && e[1].averageLifeSpan <= 15)
                const test3 = test3WithSumValues.map(e => e[0])
                setVisibleBreeds(test3)
                setCurrentPage(1)
                break;
            case menuItems.averageLifeSpan[3]:
                const test4WithSumValues = dogsDataArrayWithSumValues.filter(e => e[1].averageLifeSpan > 15)
                const test4 = test4WithSumValues.map(e => e[0])
                setVisibleBreeds(test4)
                setCurrentPage(1)
                break;

            default:
                break;
        }
    }


    //VARRIABLES WITH ELEMENTS OF ITEMS LIST
    const breedsGroupElements = menuItems.breedsGroup.map(element =>
        <li
            className={style('filtersElement')}
            onClick={handleOnClickFilter}
            key={element}>
            {element}
        </li>);

    const heightElements = menuItems.height.map(element =>
        <li
            className={style('filtersElement')}
            onClick={handleOnClickFilter}
            key={element}>
            {element}
        </li>);
    const lifeSpanElements = menuItems.averageLifeSpan.map(element =>
        <li
            className={style('filtersElement')}
            onClick={handleOnClickFilter}
            key={element}>
            {element}
        </li>);

    //HANDLE SHOW OR HIDE ON EVRY CATEGORIES
    const handleShowOrHideFilters = (event) => {
        if (event.target.dataset.name === BREEDS_GROUP) {
            setGroupOfFilters(BREEDS_GROUP)
            if (groupOfFilters === BREEDS_GROUP) {
                setGroupOfFilters(null)
            }
        } else if (event.target.dataset.name === HEIGHT) {
            setGroupOfFilters(HEIGHT)
            if (groupOfFilters === HEIGHT) {
                setGroupOfFilters(null)
            }
        } else if (event.target.dataset.name === AVERAGE_LIFE_SPAN) {
            setGroupOfFilters(AVERAGE_LIFE_SPAN)
            if (groupOfFilters === AVERAGE_LIFE_SPAN) {
                setGroupOfFilters(null)
            }
        } else {
            console.error('data-set not found')
        }
    }

    //RETURN :)
    return (
        <nav ref={sideMenuRef} className={style()}>
            <h2 className={style('title')}>Filters</h2>
            <ul className={style('categories')}>
                <li className={style('categoryElement')}>
                    <p
                        onClick={handleShowOrHideFilters}
                        data-name={BREEDS_GROUP}
                        className={style('categoryTitle')}>
                        Breeds group
                            </p>
                    <ul className={style('filters')}>
                        {groupOfFilters === BREEDS_GROUP ? breedsGroupElements : null}
                    </ul>
                </li>
                <li className={style('categoryElement')}>
                    <p
                        onClick={handleShowOrHideFilters}
                        data-name={HEIGHT}
                        className={style('categoryTitle')}>
                        Weight
                        </p>
                    <ul className={style('filters')}>
                        {groupOfFilters === HEIGHT ? heightElements : null}
                    </ul>
                </li>
                <li className={style('categoryElement')}>
                    <p
                        onClick={handleShowOrHideFilters}
                        data-name={AVERAGE_LIFE_SPAN}
                        className={style('categoryTitle')}>
                        Average life span
                         </p>
                    <ul className={style('filters')}>
                        {groupOfFilters === AVERAGE_LIFE_SPAN ? lifeSpanElements : null}
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default SideMenu;