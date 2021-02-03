import React, { useRef, useState, useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import '../../../../Assets/fontello/css/fontello.css'

import BreedHints from './Subcomponents/DogOptionElements/BreedHints'

import useOutsideClick from '../../../../Hooks/useOutsideClick';

import { StoreContext, BREED_NOT_FOUND } from '../../../../StoreProvider/StoreProvider'

import { default as SearchInputStyles } from './SearchInput.module.scss';
const style = bemCssModules(SearchInputStyles);

const OPEN_SEARCH_INPUT = 'scaleX(1)';
const CLOSE_SEARCH_INPUT = 'scaleX(.1)';
const BACKSPACE_KEY = 8;
const DISPLAY_BLOCK = 'block';
const DISPLAY_NONE = 'none';


const SearchInput = () => {
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { dogsDataArray, breedHints, setBreedHints } = useContext(StoreContext)

    const inputRef = useRef(null);
    const inputWithButtonRef = useRef(null);
    const listOfHints = useRef(null);


    // INPUT VALUE ON CHANGE EVENET
    const handleInputOnChange = (event) => {
        setInputValue(event.target.value);
    };

    // FUNCTIONS TO OPEN OR CLOSE SEARCH INPUT
    const handleToggleSearchInput = (toggle) => {
        setIsInputOpen(prevState => !prevState);
        inputRef.current.style.transform = toggle;
        setBreedHints('')
    };

    const handleOpenOrCloseSearchInput = () => {
        if (isInputOpen) {
            handleToggleSearchInput(CLOSE_SEARCH_INPUT);
            setInputValue('');
        } else {
            handleToggleSearchInput(OPEN_SEARCH_INPUT);
            inputRef.current.focus()
        }
    };

    useOutsideClick(inputWithButtonRef, () => {
        if (isInputOpen) {
            handleToggleSearchInput(CLOSE_SEARCH_INPUT);
            listOfHints.current.style.display = DISPLAY_NONE;
        }
    });

    // FUNTION TO SHOW HINTS UNDER SEARCH INPUT
    const inputShowHints = (event) => {
        const newDogsDataArray = [...dogsDataArray]

        if (inputValue) {
            const filteredDogs = newDogsDataArray.filter(dog => dog.name.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase()));
            listOfHints.current.style.display = DISPLAY_BLOCK;

            if (filteredDogs.length) {
                setBreedHints(filteredDogs);
            } else {
                setBreedHints([{
                    name: BREED_NOT_FOUND,
                    id: 0
                }]);
            }
        }
        else if (event.keyCode === BACKSPACE_KEY && !inputValue) {
            setBreedHints('');
            listOfHints.current.style.display = DISPLAY_NONE;
        };
    };
    const filteredHintsElements = [...breedHints].map(dog => <BreedHints name={dog.name} key={dog.id} />);

    return (
        <div ref={inputWithButtonRef} className={style()}>
            <input
                onKeyUp={inputShowHints}
                ref={inputRef}
                value={inputValue}
                onChange={handleInputOnChange}
                className={style('input')}></input>
            <div
                onClick={handleOpenOrCloseSearchInput}
                className={style('button')}>
                <i className='icon-search' style={{ fontSize: '.6rem' }} />
            </div>
            <ul
                className={style('hintsList')}
                ref={listOfHints}>
                {filteredHintsElements}
            </ul>
        </div>
    );
}

export default SearchInput;