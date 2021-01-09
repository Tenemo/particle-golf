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
}: {
    isParticlesListVisible: boolean;
    setIsParticlesListVisible: (isVisible: boolean) => void;
    particles: Points[];
    goToParticle: (particleName: string) => void;
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
                    <Popup
                        content="Go to particle"
                        position="right center"
                        trigger={
                            <div
                                key={name}
                                className={styles.particle}
                                onClick={() => {
                                    goToParticle(name);
                                }}
                                onKeyDown={(event: KeyboardEvent) => {
                                    if (event.key === 'Enter') {
                                        goToParticle(name);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                <h3>{name}</h3>
                                <ParticlePosition position={position} />
                            </div>
                        }
                    />
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
