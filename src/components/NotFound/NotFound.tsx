import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import styles from './notFound.scss';

const NotFound = (): ReactElement => (
    <main className={styles.notFound}>
        <span>
            Path <strong>{window.location.pathname}</strong> not found.{' '}
            <Link to="/">Go back to the main page.</Link>
        </span>
    </main>
);

export default NotFound;
