export default {
    translation: {
        homePage: {
            pause: 'Pauza',
            resume: 'Wznów',
            returnToOrigin: 'Powróć do (0,0,0)',
            addRandomParticle: 'Stwórz losową cząstkę',
            addCustomParticle: 'Stwórz własną cząstkę',
            random: 'Losowa',
            custom: 'Własna',
            trajectories: 'Trajektorie',
            allTags: 'Podpisy cząstek',
            velocityVectors: 'Wektory prędkości',
        },
        particleList: {
            allParticles: 'Wszystkie cząstki',
            goTo: 'Idź do',
            delete: 'Usuń',
        },
        addParticle: {
            addCustomParticle: 'Stwórz własną cząstkę',
            rateOfChange: 'Wzory na pozycje cząstki:',
            examples: 'Przykłady:',
            description:
                'Jedyna dozowolona zmienna we wzorach to <span>t</span>. Obsługiwana jest większość wzorów parsowalnych przez <a href="https://mathjs.org/docs/expressions/parsing.html" rel="noreferrer" target="_blank">math.js</a> z których da się wyprowadzić pochodną (dlatego np. operator modulo, %, nie jest wspierany). Pozycja cząstki w każdym kierunku jest obliczana co klatkę po podstawieniu czasu istnienia cząstki w sekundach pod zmienną <span>t</span>.',
        },
    },
};
