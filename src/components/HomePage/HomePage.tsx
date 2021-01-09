import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import World from 'components/World';

import styles from './homePage.scss';

let world: World;

const HomePage = (): ReactElement => {
    const sceneContainer = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isAddParticleVisible, setIsAddParticleVisible] = useState(false);
    const [isParticlesListVisible, setIsParticlesListVisible] = useState(false);

    useEffect(() => {
        const container = (sceneContainer.current as unknown) as HTMLScriptElement;
        world = new World(container);
        world.start();
        setIsRunning(true);
    }, []);

    return (
        <main className={styles.homePage}>
            {isAddParticleVisible && isParticlesListVisible && true}
            <div className={styles.controls}>
                {isRunning ? (
                    <Button
                        className={styles.pausePlayButton}
                        onClick={() => {
                            world.stop();
                            setIsRunning(false);
                        }}
                        secondary
                    >
                        <Icon name="pause" /> Pause
                    </Button>
                ) : (
                    <Button
                        className={styles.pausePlayButton}
                        onClick={() => {
                            world.start();
                            setIsRunning(true);
                        }}
                        primary
                    >
                        <Icon name="play" /> Resume
                    </Button>
                )}
                <Button
                    onClick={() => {
                        world.returnToOrigin();
                    }}
                    secondary
                >
                    Return to (0,0,0)
                </Button>
                <Button
                    onClick={() => {
                        setIsParticlesListVisible(true);
                    }}
                    secondary
                >
                    List of particles
                </Button>
                <Button
                    onClick={() => {
                        setIsAddParticleVisible(true);
                        world.addParticle();
                    }}
                    primary
                >
                    Add particle
                </Button>
                <Button
                    onClick={() => {
                        const whatever = 2;
                        /* eslint-disable */
                        // @ts-ignore
                        whatever = 3;
                        console.log(whatever);
                        /* eslint-enable */
                    }}
                    primary
                >
                    throw error
                </Button>
            </div>
            <div ref={sceneContainer} className={styles.sceneContainer} />
        </main>
    );
};

export default HomePage;
