import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import styles from './header.scss';

const Header = (): ReactElement => {
    return (
        <header className={styles.header}>
            <h1>
                <Link to="/">Particle Golf</Link>
            </h1>
        </header>
    );
};

export default Header;
