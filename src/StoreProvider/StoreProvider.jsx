import React, { createContext, useEffect, useState } from 'react';

import request from '../Helpers/request';


export const StoreContext = createContext('');

export const BREED_NOT_FOUND = 'Breed not found';

const StoreProvider = ({ children }) => {
    const [dogsDataArray, setDogsDataArray] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(null);
    const [breedHints, setBreedHints] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tilesPerPage, setTilesPerPage] = useState(12);
    const [currentBreedFromHint, setCurrentBreedFromHint] = useState('');
    const [isBreedHintClicked, setIsBreedHintClicked] = useState(false);
    const [visibleBreeds, setVisibleBreeds] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataInModal, setDataInModal] = useState('')

    let dogsDataArrayWithSumValues = ''
    // here

    const makeFriendlyValuesToSortBreeds = () => {
        let minHeight = []
        let minHeightNumber = []
        let maxHeight = []
        let maxHeightNumber = []
        let heightSum = []
        let minLifeSpanNumber = []
        let minLifeSpan = []
        let maxLifeSpanNumber = []
        let maxLifeSpan = []
        let averageLifeSpan = []



        if (dogsDataArray) {
            dogsDataArray.map(element => {

                const everyElementHeight = [...element.height.metric]
                const everyElementLifeSpan = [...element.life_span]

                if (everyElementHeight[1] === " ") {
                    everyElementHeight.unshift('0')
                }
                if (!everyElementHeight[6]) {
                    everyElementHeight.splice(5, 0, '0')
                }
                if (everyElementLifeSpan[1] === " ") {
                    everyElementLifeSpan.unshift('0')
                }
                if (!everyElementLifeSpan[6]) {
                    everyElementLifeSpan.splice(5, 0, '0')
                }


                minHeight.push(everyElementHeight[0] + everyElementHeight[1]);
                maxHeight.push(everyElementHeight[5] + everyElementHeight[6]);
                minLifeSpan.push(everyElementLifeSpan[0] + everyElementLifeSpan[1]);
                maxLifeSpan.push(everyElementLifeSpan[5] + everyElementLifeSpan[6]);


            }
            )


            minHeightNumber = minHeight.map(e => parseInt(e))
            maxHeightNumber = maxHeight.map(e => parseInt(e))
            for (let i = 0; i <= minHeightNumber.length; i++) {
                heightSum.push(minHeightNumber[i] + maxHeightNumber[i])
            }

            minLifeSpanNumber = minLifeSpan.map(e => parseInt(e))
            maxLifeSpanNumber = maxLifeSpan.map(e => parseInt(e))
            for (let i = 0; i <= minLifeSpanNumber.length; i++) {
                averageLifeSpan.push((minLifeSpanNumber[i] + maxLifeSpanNumber[i]) / 2)
            }


            dogsDataArrayWithSumValues = [...dogsDataArray].map(e => [e])

            for (let i = 0; i < dogsDataArray.length; i++) {
                dogsDataArrayWithSumValues[i].push({
                    heightSum: heightSum[i],
                    averageLifeSpan: averageLifeSpan[i],
                })

            }
        }
    };
    makeFriendlyValuesToSortBreeds();


    const getDogsData = async () => {
        const { data } = await request.get('/');
        setDogsDataArray(data)
    }

    useEffect(() => {
        getDogsData()
    }, [])


    // FUNCTION TO SET TILES VISIBLE ON MAIN SCREEN
    if (dogsDataArray && !visibleBreeds) {
        setVisibleBreeds(dogsDataArray)
    } else if (isBreedHintClicked) {
        setIsBreedHintClicked(false)
        const element = dogsDataArray.find(element => element.name === currentBreedFromHint)
        setVisibleBreeds([element])
    }

    return (
        <StoreContext.Provider value={{
            dogsDataArray,
            isMenuOpen,
            setIsMenuOpen,
            currentPage,
            setCurrentPage,
            tilesPerPage,
            setTilesPerPage,
            currentBreedFromHint,
            setCurrentBreedFromHint,
            breedHints,
            setBreedHints,
            setIsBreedHintClicked,
            visibleBreeds,
            setVisibleBreeds,
            dogsDataArrayWithSumValues,
            isModalOpen,
            setIsModalOpen,
            dataInModal,
            setDataInModal
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;