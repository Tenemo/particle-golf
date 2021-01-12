export default {
    translation: {
        homePage: {
            pause: 'Pause',
            resume: 'Resume',
            returnToOrigin: 'Return to (0,0,0)',
            addRandomParticle: 'Add a random particle',
            addCustomParticle: 'Add a custom particle',
            random: 'Random',
            custom: 'Custom',
            trajectories: 'Trajectories',
            allTags: 'Particle tags',
            velocityVectors: 'Velocity vectors',
        },
        particleList: {
            allParticles: 'All particles',
            goTo: 'Go to',
            delete: 'Delete',
        },
        addParticle: {
            addCustomParticle: 'Add a custom particle',
            rateOfChange: 'Particle position expressions:',
            examples: 'Examples:',
            description: `<span>t</span> is the only variable allowed. Expressions parsable by <a href="https://mathjs.org/docs/expressions/parsing.html" rel="noreferrer" target="_blank">math.js</a> are supported. It must be possible to take the derivative of of the given expression (that's why e.g. the modulus operator, %, is not supported). The particle's position in each direction is calculated by substituting current time in seconds for <span>t</span> every frame.`,
        },
    },
};
