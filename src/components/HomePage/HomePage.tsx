import React, { ReactElement, useEffect, useRef } from 'react';

import World from 'components/World';

import styles from './homePage.scss';

let world: World;

const HomePage = (): ReactElement => {
    const sceneContainer = useRef(null);

    useEffect(() => {
        const container = (sceneContainer.current as unknown) as HTMLScriptElement;
        world = new World(container);
        world.start();
    }, []);

    return (
        <main className={styles.homePage}>
            <div className={styles.controls}>
                <button
                    onClick={() => {
                        world.start();
                    }}
                    type="button"
                >
                    Start
                </button>
                <button
                    onClick={() => {
                        world.stop();
                    }}
                    type="button"
                >
                    Stop
                </button>
                <button
                    onClick={() => {
                        world.returnToOrigin();
                    }}
                    type="button"
                >
                    Return to origin
                </button>
            </div>
            <div ref={sceneContainer} className={styles.sceneContainer} />
        </main>
    );
};

export default HomePage;
