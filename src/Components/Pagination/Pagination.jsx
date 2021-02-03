import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import '../../Assets/fontello/css/fontello.css'

import { StoreContext } from '../../StoreProvider/StoreProvider'

import { default as PaginationStyles } from './Pagination.module.scss';
const style = bemCssModules(PaginationStyles)

const FIRST_PAGE = 'firstPage';
const LAST_PAGE = 'lastPage';
const PREVIOUS = 'previous';
const NEXT = 'next';
const NUMBER_OF_VISIBLE_PAGINTAION = 4

const Pagination = () => {
    const { setCurrentPage, tilesPerPage, currentPage, visibleBreeds } = useContext(StoreContext);

    let pageNumbers = [];

    let numberOfAllPages = ''

    numberOfAllPages = Math.ceil(visibleBreeds.length / tilesPerPage);


    // LAST PAGES OF PAGINATION
    const calcLastPagesOfPagination = numberOfAllPages - NUMBER_OF_VISIBLE_PAGINTAION;
    const lastNumbersOfPagination = [];

    if (numberOfAllPages !== 0) {
        for (let i = calcLastPagesOfPagination; i <= numberOfAllPages; i++) {
            lastNumbersOfPagination.push(i)
        }
    }


    const createNumbersOfPages = () => {
        let filtredPages = []
        for (let i = 1; i <= numberOfAllPages; i++) {
            filtredPages.push(i)
        }

        for (let i = currentPage; i <= currentPage + NUMBER_OF_VISIBLE_PAGINTAION; i++) {
            if (i <= numberOfAllPages) {
                pageNumbers.push(i);
            } else if (numberOfAllPages === 1) {
                pageNumbers = [1]
            } else if (numberOfAllPages < NUMBER_OF_VISIBLE_PAGINTAION && numberOfAllPages !== 0) {
                pageNumbers = filtredPages;
            } else if (i > numberOfAllPages) {
                // pageNumbers = [14, 15, 16, 17, 18]
                pageNumbers = lastNumbersOfPagination;
            }
        }
    }
    createNumbersOfPages();

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    const handleButtonChangePage = (event) => {
        if (event.target.dataset.info === PREVIOUS) {
            if (currentPage === 1) {
                return
            } else {
                setCurrentPage(prevState => prevState - 1)
            }
        } else if (event.target.dataset.info === NEXT) {
            if (currentPage === numberOfAllPages) {
                return
            } else {
                setCurrentPage(prevState => prevState + 1)
            }
        } else if (event.target.dataset.info === FIRST_PAGE) {
            setCurrentPage(1)
        } else if (event.target.dataset.info === LAST_PAGE) {
            setCurrentPage(numberOfAllPages)
        } else {
            console.error('Dataset not found')
        }
    }


    // CREATING PAGINATION 
    const pagination = pageNumbers.map(number => {
        return <li className={style('listElement')} key={number}>
            <a
                onClick={() => handleChangePage(number)}
                className={style('paginationButton')} href='!#'>
                {number}
            </a>
        </li>
    })



    return (
        <nav className={style()}>
            <button onClick={handleButtonChangePage} className={style('navButton')}>
                <i data-info={FIRST_PAGE} className='icon-angle-double-left' style={{ fontSize: '.6rem', color: '#ffcdab' }} />
            </button>
            <button onClick={handleButtonChangePage} className={style('navButton')}>
                <i data-info={PREVIOUS} className='icon-angle-left' style={{ fontSize: '.6rem', color: '#ffcdab' }} />
            </button>
            <ul className={style('paginationNumbers')}>
                {pagination}
            </ul>
            <button onClick={handleButtonChangePage} className={style('navButton')}>
                <i data-info={NEXT} className='icon-angle-right' style={{ fontSize: '.6rem', color: '#ffcdab' }} />
            </button>
            <button onClick={handleButtonChangePage} className={style('navButton')}>
                <i data-info={LAST_PAGE} className='icon-angle-double-right' style={{ fontSize: '.6rem', color: '#ffcdab' }} />
            </button>
        </nav>
    );
}

export default Pagination;

// .icon-angle-double-left
