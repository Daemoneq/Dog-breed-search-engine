import React from 'react';
import bemCssModules from 'bem-css-modules';

import { default as FooterStyles } from './Footer.module.scss';
const style = bemCssModules(FooterStyles)

const Footer = () => {
    return (
        <footer className={style()}>Daniel Stępniak "Breeds search"</footer>
    );
}

export default Footer;