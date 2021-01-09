import React, { ReactElement, useEffect, useState } from 'react';

const ParticlePosition = ({
    position,
}: {
    position: { x: number; y: number; z: number };
}): ReactElement => {
    const [statePosition, updatePosition] = useState(position);
    useEffect(() => {
        const interval = setInterval(() => {
            updatePosition({ ...position });
        }, 50);
        return () => clearInterval(interval);
    }, [position]);
    const { x, y, z } = statePosition;
    return (
        <div>
            x: {x.toFixed(2)} y: {y.toFixed(2)} z: {z.toFixed(2)}
        </div>
    );
};

export default ParticlePosition;
