import React, {
    ReactElement,
    useEffect,
    useRef,
    useState,
    useCallback,
    SyntheticEvent,
} from 'react';
import {
    Button,
    Icon,
    Checkbox,
    Dropdown,
    DropdownProps,
} from 'semantic-ui-react';

import mobile from 'is-mobile';

import World from 'components/World';
import ParticlesList from './ParticlesList';
import AddParticle from './AddParticle';

import styles from './homePage.scss';
import { AnimatedParticle } from '../World/types';

let world: World;

const initialState: AnimatedParticle[] = [];
const isMobile = mobile();

const options = [
    { key: 'createRandom', text: 'Random', value: 'createRandom' },
    { key: 'createCustom', text: 'Custom', value: 'createCustom' },
];

let wasRunning: boolean;

const HomePage = (): ReactElement => {
    const sceneContainer = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isAddParticleVisible, setIsAddParticleVisible] = useState(false);
    const [isParticlesListVisible, setIsParticlesListVisible] = useState(
        !isMobile,
    );
    const [isTrailsVisible, setIsTrailsVisible] = useState(true);
    const [isAllTagsVisible, setIsAllTagsVisible] = useState(false);
    const [isSpeedVectorsVisible, setIsSpeedVectorsVisible] = useState(false);
    const [particles, setParticles] = useState(initialState);
    const [selectedCreateOption, setSelectedCreateOption] = useState(
        'createRandom',
    );

    const onPageVisibilityChange = (): void => {
        if (document.hidden) {
            world.stop();
            setIsRunning(true);
        } else {
            world.start();
            setIsRunning(true);
        }
    };

    useEffect(() => {
        const container = (sceneContainer.current as unknown) as HTMLScriptElement;
        document.addEventListener(
            'visibilitychange',
            onPageVisibilityChange,
            false,
        );
        world = new World(container);
        world.start();
        setIsRunning(true);
    }, []);

    const goToParticle = useCallback(
        (particleName: string): void => {
            const {
                position: { x, y, z },
            } = particles.find(
                ({ name }) => name === particleName,
            ) as AnimatedParticle;
            world.goToCoords(x, y, z);
            setIsRunning(false);
        },
        [particles],
    );

    const addParticle = useCallback(
        (expressions?: { x: string; y: string; z: string }) => {
            const particle = world.addParticle(expressions);
            setParticles([...particles, particle]);
        },
        [particles],
    );

    const deleteParticle = useCallback(
        (particleName: string): void => {
            world.deleteParticle(particleName);
            setParticles(particles.filter(({ name }) => name !== particleName));
        },
        [particles],
    );

    const openAddParticle = useCallback(() => {
        if (isRunning) {
            world.stop();
            setIsRunning(false);
            wasRunning = true;
        }
        setIsAddParticleVisible(true);
    }, [isRunning]);

    const closeAddParticle = useCallback(() => {
        setIsAddParticleVisible(false);
        if (wasRunning) {
            world.start();
            setIsRunning(true);
            wasRunning = false;
        }
    }, []);

    const chooseCreateParticle = useCallback(
        (_event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
            setSelectedCreateOption(data.value as string);
            if (data.value === 'createRandom') {
                addParticle();
            } else {
                openAddParticle();
            }
        },
        [addParticle, openAddParticle],
    );

    return (
        <main
            className={`${styles.homePage} ${isMobile ? styles.isMobile : ''}`}
        >
            {isAddParticleVisible && isParticlesListVisible && true}
            <div className={styles.controls}>
                <div className={styles.buttons}>
                    {isRunning ? (
                        <Button
                            className={styles.pausePlayButton}
                            color="grey"
                            onClick={() => {
                                world.stop();
                                setIsRunning(false);
                            }}
                        >
                            <Icon name="pause" />
                            &nbsp;Pause
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
                            <Icon name="play" />
                            &nbsp;Resume
                        </Button>
                    )}
                    <Button
                        color="grey"
                        onClick={() => {
                            world.returnToOrigin();
                        }}
                    >
                        Return to (0,0,0)
                    </Button>
                    <Button.Group color="blue">
                        <Button
                            onClick={() => {
                                if (selectedCreateOption === 'createRandom') {
                                    addParticle();
                                } else {
                                    openAddParticle();
                                }
                            }}
                            primary
                        >
                            Add{' '}
                            {selectedCreateOption === 'createRandom'
                                ? 'random'
                                : 'custom'}{' '}
                            particle
                        </Button>
                        <Dropdown
                            className="button icon"
                            floating
                            onChange={chooseCreateParticle}
                            options={options}
                            trigger={<></>}
                            value={3}
                        />
                    </Button.Group>
                </div>
                <div className={styles.toggles}>
                    <Checkbox
                        checked={isTrailsVisible}
                        label="Show trajectories"
                        onChange={() => {
                            setIsTrailsVisible(!isTrailsVisible);
                            world.setIsTrailsVisible(!isTrailsVisible);
                        }}
                        toggle
                    />
                    {/* Tags don't show at all on mobile for some reason */}
                    {isMobile || (
                        <Checkbox
                            checked={isAllTagsVisible}
                            label="Show all tags"
                            onChange={() => {
                                setIsAllTagsVisible(!isAllTagsVisible);
                            }}
                            toggle
                        />
                    )}
                    <Checkbox
                        checked={isSpeedVectorsVisible}
                        label="Show velocity vectors"
                        onChange={() => {
                            setIsSpeedVectorsVisible(!isSpeedVectorsVisible);
                            world.setIsVelocityVectorsVisible(
                                !isSpeedVectorsVisible,
                            );
                        }}
                        toggle
                    />
                </div>
            </div>
            {isAddParticleVisible && (
                <AddParticle
                    addParticle={addParticle}
                    closeAddParticle={closeAddParticle}
                />
            )}
            <ParticlesList
                deleteParticle={deleteParticle}
                goToParticle={goToParticle}
                isAllTagsVisible={isAllTagsVisible}
                isParticlesListVisible={isParticlesListVisible}
                isRunning={isRunning}
                particles={particles}
                setIsParticlesListVisible={setIsParticlesListVisible}
            />
            <div ref={sceneContainer} className={styles.sceneContainer} />
        </main>
    );
};

export default HomePage;
