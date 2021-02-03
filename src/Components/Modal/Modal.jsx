import React, { useContext, useRef } from 'react';
import bemCssModules from 'bem-css-modules';

import ModalData from './Subcomponents/ModalData'

import { StoreContext } from '../../StoreProvider/StoreProvider';

import useOutsideClick from '../../Hooks/useOutsideClick'

import { default as ModalStyles } from './Modal.module.scss';

const style = bemCssModules(ModalStyles)

const Modal = () => {
    const { isModalOpen, setIsModalOpen } = useContext(StoreContext)

    const modalRef = useRef(null)

    const modal = (<div onClick={() => { }} className={style()}>
        <article ref={modalRef} className={style('modal')}>
            <ModalData />
        </article>
    </div>);



    const closeModal = () => {
        if (isModalOpen) {
            setIsModalOpen(false)
        }
    }
    useOutsideClick(modalRef, () => closeModal())



    return (
        <>
            {isModalOpen ? modal : null}
        </>
    );
}

export default Modal;