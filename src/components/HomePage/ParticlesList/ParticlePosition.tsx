import React, { ReactElement, useEffect, useState } from 'react';

import { AnimatedParticle } from '../../World/types';

const ParticlePosition = ({
    particle: { name, position, isHovered, screenPositionX, screenPositionY },
}: {
    particle: AnimatedParticle;
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
                {JSON.stringify(isHovered)}
            </div>
            {isHovered && (
                <div
                    style={{
                        position: 'fixed',
                        top: (screenPositionY as number) - 28,
                        left: screenPositionX,
                    }}
                >
                    {name}, x: {x.toFixed(2)} y: {y.toFixed(2)} z:{' '}
                    {z.toFixed(2)}
                </div>
            )}
        </>
    );
};

export default ParticlePosition;
