import React, { ReactElement, useEffect, useRef } from 'react';

import World from 'components/World';

import styles from './homePage.scss';

const HomePage = (): ReactElement => {
    const sceneContainer = useRef(null);

    useEffect(() => {
        const container = (sceneContainer.current as unknown) as HTMLScriptElement;
        const world = new World(container);
        world.render();
    }, []);

    return (
        <main className={styles.homePage}>
            <div ref={sceneContainer} className={styles.sceneContainer} />
        </main>
    );
};

export default HomePage;
