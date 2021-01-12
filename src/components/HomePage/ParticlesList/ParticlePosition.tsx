import React, { ReactElement, useEffect, useState } from 'react';

import { AnimatedParticle } from '../../World/types';

const ParticlePosition = ({
    particle: {
        name,
        position,
        isHovered,
        screenPositionX,
        screenPositionY,
        screenPositionZ,
        totalTime,
        lastResumeTime,
    },
    isAllTagsVisible,
    isRunning,
}: {
    particle: AnimatedParticle;
    isAllTagsVisible: boolean;
    isRunning: boolean;
}): ReactElement => {
    const [statePosition, updatePosition] = useState({
        ...position,
        isHovered,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            updatePosition({ ...position, isHovered });
        }, 25);
        return () => clearInterval(interval);
    }, [isHovered, position]);
    const { x, y, z } = statePosition;
    const t =
        (isRunning ? totalTime + Date.now() - lastResumeTime : totalTime) /
        1000;
    return (
        <>
            <div>
                x:&nbsp;{x.toFixed(2)} y:&nbsp;{y.toFixed(2)} z:&nbsp;
                {z.toFixed(2)} t: {t.toFixed(2)}&nbsp;s
            </div>
            {(isHovered || isAllTagsVisible) &&
                (screenPositionZ as number) === 0 && (
                    <div
                        style={{
                            position: 'fixed',
                            top: (screenPositionY as number) - 42,
                            left: (screenPositionX as number) + 7,
                        }}
                    >
                        {name}
                        <br /> x:&nbsp;{x.toFixed(2)} y:&nbsp;{y.toFixed(2)}{' '}
                        z:&nbsp;{z.toFixed(2)} <br /> t:&nbsp;{t.toFixed(2)}
                        &nbsp;s
                    </div>
                )}
        </>
    );
};

export default ParticlePosition;
