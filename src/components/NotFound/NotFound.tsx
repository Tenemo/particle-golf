import React, { ReactElement } from 'react';

import styles from './notFound.scss';

const NotFound = (): ReactElement => (
    <main className={styles.notFound}>
        <span>
            Path <strong>{window.location.pathname}</strong> not found.
        </span>
    </main>
);

export default NotFound;
