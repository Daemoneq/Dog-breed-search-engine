import React from 'react';
import bemCssModules from 'bem-css-modules';

import { default as AppStyles } from './App.module.scss';


import Header from '../Header/Header';
import SideMenu from '../RightMenu/SideMenu';
import Main from '../Main/Main';
import Pagination from '../Pagination/Pagination'
import Footer from '../Footer/Footer'
import Modal from '../Modal/Modal'


import StoreProvider from '../../StoreProvider/StoreProvider';


const style = bemCssModules(AppStyles);

function App() {


  return (
    <StoreProvider>
      <div className={style()}>
        <Header />
        <SideMenu />
        <Main />
        <Modal />
        <Pagination />
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;
