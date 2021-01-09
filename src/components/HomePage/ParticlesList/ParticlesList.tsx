import React, { ReactElement, KeyboardEvent } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { Points } from 'three';

import ParticlePosition from './ParticlePosition';

import styles from './particlesList.scss';

const ParticlesList = ({
    isParticlesListVisible,
    setIsParticlesListVisible,
    particles,
    goToParticle,
    deleteParticle,
}: {
    isParticlesListVisible: boolean;
    setIsParticlesListVisible: (isVisible: boolean) => void;
    particles: Points[];
    goToParticle: (particleName: string) => void;
    deleteParticle: (particleName: string) => void;
}): ReactElement => {
    return (
        <section
            className={`${styles.particlesList} ${
                isParticlesListVisible ? styles.isVisible : ''
            }`}
        >
            <div className={`${styles.list}`}>
                <h2>Particles list</h2>
                {particles?.map(({ name, position }) => (
                    <div key={name} className={styles.particle}>
                        <div className={styles.particleHeading}>
                            <h3>{name}</h3>
                            <Popup
                                content={`Go to ${name}`}
                                position="right center"
                                trigger={
                                    <Icon
                                        name="magnify"
                                        onClick={() => {
                                            goToParticle(name);
                                        }}
                                        onKeyDown={(event: KeyboardEvent) => {
                                            if (event.key === 'Enter') {
                                                goToParticle(name);
                                            }
                                        }}
                                        role="button"
                                        size="large"
                                        tabIndex={0}
                                    />
                                }
                            />
                            <Popup
                                content={`Delete ${name}`}
                                position="right center"
                                trigger={
                                    <Icon
                                        color="red"
                                        name="delete"
                                        onClick={() => {
                                            deleteParticle(name);
                                        }}
                                        onKeyDown={(event: KeyboardEvent) => {
                                            if (event.key === 'Enter') {
                                                deleteParticle(name);
                                            }
                                        }}
                                        role="button"
                                        size="large"
                                        tabIndex={0}
                                    />
                                }
                            />
                        </div>
                        <ParticlePosition position={position} />
                    </div>
                ))}
            </div>
            <div
                className={styles.listToggle}
                onClick={() => {
                    setIsParticlesListVisible(!isParticlesListVisible);
                }}
                onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === 'Enter') {
                        setIsParticlesListVisible(!isParticlesListVisible);
                    }
                }}
                role="button"
                tabIndex={0}
            >
                {isParticlesListVisible ? (
                    <Icon name="arrow left" />
                ) : (
                    <Icon name="arrow right" />
                )}
            </div>
        </section>
    );
};

export default ParticlesList;
