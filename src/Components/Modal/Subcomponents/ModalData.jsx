import React, { useContext } from 'react';
import bemcssModules from 'bem-css-modules';

import { default as ModalDataStyles } from './ModalData.module.scss';

import { StoreContext } from '../../../StoreProvider/StoreProvider';

const style = bemcssModules(ModalDataStyles)

const ModalData = () => {
    const { dataInModal } = useContext(StoreContext)

    return (
        <div className={style()}>
            <p className={style('name')}>{dataInModal[0].name}</p>
            <img className={style('img')} alt={dataInModal[0].name} src={dataInModal[0].image.url}></img>
            <div className={style('infoContainer')}>
                <div className={style('infoLeftSide')}>
                    <p className={style('infoText')}><b className={style('infoTextTitle')}>Breed Group:</b> {dataInModal[0].breed_group}</p>
                    <p className={style('infoText')}><b className={style('infoTextTitle')}>Breed For:</b> {dataInModal[0].bred_for ? dataInModal[0].bred_for : '???'}</p>
                    <p className={style('infoText')}><b className={style('infoTextTitle')}>Temperament:</b> {dataInModal[0].temperament}</p>
                </div>
                <div className={style('infoRightSide')}>
                    <p className={style('infoText')}><b className={style('infoTextTitle')}>Weight:</b> {dataInModal[0].weight.metric} kg</p>
                    <p className={style('infoText')}><b className={style('infoTextTitle')}>Height:</b> {dataInModal[0].height.metric} cm</p>
                    <p className={style('infoText')}><b className={style('infoTextTitle')}>Life Span:</b> {dataInModal[0].life_span}</p>
                </div>
            </div>
        </div>
    );
}

export default ModalData;