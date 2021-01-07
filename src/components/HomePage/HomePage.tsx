import React, { ReactElement, useEffect, useRef } from 'react';

import World from 'components/World';

import styles from './homePage.scss';

let world: World;

const HomePage = (): ReactElement => {
    const sceneContainer = useRef(null);

    useEffect(() => {
        const container = (sceneContainer.current as unknown) as HTMLScriptElement;
        world = new World(container);
        world.render();
    }, []);

    return (
        <main className={styles.homePage}>
            <button
                onClick={() => {
                    world.removeCube();
                    world.render();
                }}
                type="button"
            >
                Do something
            </button>
            <div ref={sceneContainer} className={styles.sceneContainer} />
        </main>
    );
};

export default HomePage;
