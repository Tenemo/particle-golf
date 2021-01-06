import React, { ReactElement } from 'react';

import styles from './header.scss';

const Header = (): ReactElement => {
    return (
        <header className={styles.header}>
            <h1>Particle Golf</h1>
        </header>
    );
};

export default Header;
