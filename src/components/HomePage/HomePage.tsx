import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import World from 'components/World';
import ParticlesList from './ParticlesList';

import styles from './homePage.scss';
import { AnimatedParticle } from '../World/types';

let world: World;

const initialState: AnimatedParticle[] = [];

const HomePage = (): ReactElement => {
    const sceneContainer = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isAddParticleVisible, setIsAddParticleVisible] = useState(false);
    const [isParticlesListVisible, setIsParticlesListVisible] = useState(true);
    const [particles, setParticles] = useState(initialState);

    useEffect(() => {
        const container = (sceneContainer.current as unknown) as HTMLScriptElement;
        world = new World(container);
        world.start();
        setIsRunning(true);
    }, []);

    const goToParticle = (particleName: string): void => {
        const {
            position: { x, y, z },
        } = particles.find(
            ({ name }) => name === particleName,
        ) as AnimatedParticle;
        world.goToCoords(x, y, z);
        setIsRunning(false);
    };

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
                        setIsAddParticleVisible(true);
                        const particle = world.addParticle();
                        setParticles([...particles, particle]);
                    }}
                    primary
                >
                    Add particle
                </Button>
            </div>
            <ParticlesList
                goToParticle={goToParticle}
                isParticlesListVisible={isParticlesListVisible}
                particles={particles}
                setIsParticlesListVisible={setIsParticlesListVisible}
            />
            <div ref={sceneContainer} className={styles.sceneContainer} />
        </main>
    );
};

export default HomePage;
