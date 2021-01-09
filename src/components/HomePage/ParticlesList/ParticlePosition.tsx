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
    },
    isAllTagsVisible,
}: {
    particle: AnimatedParticle;
    isAllTagsVisible: boolean;
}): ReactElement => {
    const [statePosition, updatePosition] = useState({
        ...position,
        isHovered,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            updatePosition({ ...position, isHovered });
        }, 50);
        return () => clearInterval(interval);
    }, [isHovered, position]);
    const { x, y, z } = statePosition;
    return (
        <>
            <div>
                x: {x.toFixed(2)} y: {y.toFixed(2)} z: {z.toFixed(2)}
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
                        <br /> x: {x.toFixed(2)} y: {y.toFixed(2)} z:{' '}
                        {z.toFixed(2)}
                    </div>
                )}
        </>
    );
};

export default ParticlePosition;
