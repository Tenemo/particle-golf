import {
    Points,
    SphereBufferGeometry,
    BufferGeometry,
    ShaderMaterial,
    Color,
    ShaderLib,
    LineBasicMaterial,
    Line,
    Vector3,
    Group,
    ArrowHelper,
} from 'three';
import mobile from 'is-mobile';
import { parse } from 'mathjs';

import { generateExpressions } from 'utils/expressions';
import { AnimatedParticle } from '../types';

let particleIndex = 1;
const isMobile = mobile();

const colors = [
    '#3352FF', // blue
    '#F33724', // orange-ish
    '#067220', // dark green
    '#860684', // purple
    '#0FD3D3', // teal
    '#EE8714', // orange
    '#830000', // dark red
    '#464646', // gray
];

const getParticlePosition = (
    particle: AnimatedParticle,
    t: number,
): Vector3 => {
    return new Vector3(
        parse(particle.expressions.x).compile().evaluate({ t }),
        parse(particle.expressions.y).compile().evaluate({ t }),
        parse(particle.expressions.z).compile().evaluate({ t }),
    );
};

export const createParticle = (
    trajectoryGroup: Group,
    isVelocityVectorsVisible: boolean,
    expressions?: { x: string; y: string; z: string },
): AnimatedParticle => {
    const color = colors[particleIndex % colors.length];
    const geometry = new SphereBufferGeometry(0, 0, 0);
    const material = new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
            size: { value: isMobile ? 20 : 10 },
            scale: { value: 1 },
            color: { value: new Color(color) },
        },
        vertexShader: ShaderLib.points.vertexShader,
        fragmentShader: `
            uniform vec3 color;
            void main() {
                vec2 xy = gl_PointCoord.xy - vec2(0.5);
                float ll = length(xy);
                gl_FragColor = vec4(color, step(ll, 0.5));
            }
        `,
    });

    const particle = (new Points(
        geometry,
        material,
    ) as unknown) as AnimatedParticle;

    particle.name = `Particle ${particleIndex}`;
    particle.color = color;

    if (expressions) {
        particle.expressions = expressions;
    } else {
        particle.expressions = generateExpressions();
    }
    particle.lastResumeTime = Date.now();
    particle.totalTime = 0;
    particle.position.copy(getParticlePosition(particle, 0));

    const lineMaterial = new LineBasicMaterial({
        color: new Color(color),
    });

    let trajectoryLimiterCount = 0;
    let previousPosition = new Vector3();
    previousPosition.copy(particle.position);
    const particleTrajectoryGroup = new Group();
    particleTrajectoryGroup.name = `Particle ${particleIndex} trajectory`;
    trajectoryGroup.add(particleTrajectoryGroup);

    particleIndex += 1;

    particle.isHovered = false;

    const velocityArrow = new ArrowHelper(
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 0),
        0,
        new Color(color),
    );
    velocityArrow.name = `Particle ${particleIndex} velocity`;
    velocityArrow.visible = isVelocityVectorsVisible;
    particle.add(velocityArrow);

    particle.tick = ({
        isStopping,
        isStarting,
    }: {
        isStopping?: boolean;
        isStarting?: boolean;
    }) => {
        if (isStopping) {
            particle.totalTime += Date.now() - particle.lastResumeTime;
            const lineGeometry = new BufferGeometry().setFromPoints([
                previousPosition,
                particle.position,
            ]);
            const line = new Line(lineGeometry, lineMaterial);
            particleTrajectoryGroup.add(line);
            return;
        }
        if (isStarting) {
            particle.lastResumeTime = Date.now();
        }
        const t =
            (particle.totalTime + Date.now() - particle.lastResumeTime) / 1000;

        particle.position.copy(getParticlePosition(particle, t));

        const newPosition = new Vector3();
        newPosition.copy(particle.position);
        if (trajectoryLimiterCount % 20 === 0) {
            const lineGeometry = new BufferGeometry().setFromPoints([
                previousPosition,
                newPosition,
            ]);
            const line = new Line(lineGeometry, lineMaterial);
            particleTrajectoryGroup.add(line);
        }
        if (trajectoryLimiterCount % 20 === 0) {
            const direction = new Vector3();
            direction
                .subVectors(previousPosition, newPosition)
                .normalize()
                .negate();
            const speed = parseFloat(
                previousPosition.distanceTo(newPosition).toFixed(1),
            );
            velocityArrow.setLength(speed * (isMobile ? 10 : 20));
            velocityArrow.setDirection(direction);
            previousPosition = new Vector3(
                particle.position.x,
                particle.position.y,
                particle.position.z,
            );
        }
        trajectoryLimiterCount += 1;
    };

    return particle;
};
