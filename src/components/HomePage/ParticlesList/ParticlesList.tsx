import React, { ReactElement, KeyboardEvent, memo } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import mobile from 'is-mobile';
import { useTranslation } from 'react-i18next';

import ParticlePosition from './ParticlePosition';
import { AnimatedParticle } from '../../World/types';

import styles from './particlesList.scss';

const isMobile = mobile();

const ParticlesList = ({
    isParticlesListVisible,
    setIsParticlesListVisible,
    particles,
    goToParticle,
    deleteParticle,
    isAllTagsVisible,
    isRunning,
}: {
    isParticlesListVisible: boolean;
    setIsParticlesListVisible: (isVisible: boolean) => void;
    particles: AnimatedParticle[];
    goToParticle: (particleName: string) => void;
    deleteParticle: (particleName: string) => void;
    isAllTagsVisible: boolean;
    isRunning: boolean;
}): ReactElement => {
    const { t } = useTranslation();
    return (
        <section
            className={`${styles.particlesList} ${
                isParticlesListVisible ? styles.isVisible : ''
            } ${isMobile ? styles.isMobile : ''}`}
        >
            <div className={`${styles.list}`}>
                <h2>{t('particleList.allParticles')}</h2>
                {particles?.map((particle) => {
                    const { name, expressions } = particle;
                    return (
                        <div key={name} className={styles.particle}>
                            <div className={styles.particleHeading}>
                                <h3 style={{ color: particle.color }}>
                                    {name}
                                </h3>
                                <Popup
                                    content={`${t(
                                        'particleList.goTo',
                                    )} ${name}`}
                                    position="right center"
                                    trigger={
                                        <Icon
                                            name="magnify"
                                            onClick={() => {
                                                goToParticle(name);
                                            }}
                                            onKeyDown={(
                                                event: KeyboardEvent,
                                            ) => {
                                                if (
                                                    event.key === 'Enter' ||
                                                    event.key === 'Space'
                                                ) {
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
                                    content={`${t(
                                        'particleList.delete',
                                    )} ${name}`}
                                    position="right center"
                                    trigger={
                                        <Icon
                                            color="red"
                                            name="delete"
                                            onClick={() => {
                                                deleteParticle(name);
                                            }}
                                            onKeyDown={(
                                                event: KeyboardEvent,
                                            ) => {
                                                if (
                                                    event.key === 'Enter' ||
                                                    event.key === 'Space'
                                                ) {
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
                            <div>
                                <div>
                                    <span className={styles.expressionLabel}>
                                        f(t)=x:{' '}
                                    </span>
                                    <span className={styles.expression}>
                                        {expressions.x}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.expressionLabel}>
                                        f(t)=y:{' '}
                                    </span>
                                    <span className={styles.expression}>
                                        {expressions.y}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.expressionLabel}>
                                        f(t)=z:{' '}
                                    </span>
                                    <span className={styles.expression}>
                                        {expressions.z}
                                    </span>
                                </div>
                            </div>
                            <ParticlePosition
                                isAllTagsVisible={isAllTagsVisible}
                                isRunning={isRunning}
                                particle={particle}
                            />
                        </div>
                    );
                })}
            </div>
            <div
                className={styles.listToggle}
                onClick={() => {
                    setIsParticlesListVisible(!isParticlesListVisible);
                }}
                onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === 'Enter' || event.key === 'Space') {
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

export default memo(ParticlesList);
