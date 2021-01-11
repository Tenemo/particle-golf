import { random } from 'lodash';

const getRandom = <T>(array: Array<T>): T =>
    array[Math.floor(Math.random() * array.length)];

const operators = ['+', '/', '*', '%'];

const getCoefficient = (): string => {
    let coefficient: string | number = random(-3, 3);
    if (coefficient === -1) {
        coefficient = '-';
    } else if (coefficient === 0 || coefficient === 1) {
        coefficient = '';
    }
    return String(coefficient);
};

const getRandomInteger = (): string => {
    let randomInteger = random(-10, 10);
    while (randomInteger === 0) {
        randomInteger = random(-10, 10);
    }
    return String(randomInteger);
};

const getOperator = (): string => getRandom(operators);

const withCoefficient = (variable: string): string => {
    const coefficient = getCoefficient();
    if (coefficient.includes('-')) {
        return `${coefficient}${variable}`;
    }
    return `+${coefficient}${variable}`;
};
const randomIntegerToAppend = (): string => {
    const randomInteger = getRandomInteger();
    if (parseInt(randomInteger, 10) < 0) {
        return `${randomInteger}`;
    }
    return `+${randomInteger}`;
};
const randomOperationWithInteger = (): string => {
    const operator = getOperator();
    const randomInteger = getRandomInteger();
    if (operator === '+') {
        if (parseInt(randomInteger, 10) < 0) {
            return `${randomInteger}`;
        }
        return `${operator}${randomInteger}`;
    }
    if (operator === '%' && parseInt(randomInteger, 10) < 0) {
        return `${operator}${randomInteger.replace('-', '')}`;
    }
    if (parseInt(randomInteger, 10) < 0) {
        return `${operator}(${randomInteger})`;
    }
    return `${operator}${randomInteger}`;
};

const expressionTypes = {
    static: {
        generate: (): string => getRandomInteger(),
    },
    onlyVariable: {
        generate: (variable: string): string => variable,
    },
    simple: {
        generate: (variable: string): string => {
            let expression = `${getCoefficient()}${variable}`;
            expression += randomOperationWithInteger();
            return expression;
        },
    },
    quadratic: {
        generate: (variable: string): string => {
            let expression = `${getCoefficient()}${variable}^2`;
            expression += withCoefficient(variable);
            expression += randomIntegerToAppend();
            return expression;
        },
    },
    cubic: {
        generate: (variable: string): string => {
            let expression = `${getCoefficient()}${variable}^3`;
            expression += `${withCoefficient(variable)}^2`;
            expression += withCoefficient(variable);
            expression += randomIntegerToAppend();
            return expression;
        },
    },
    root: {
        generate: (variable: string): string => {
            let expression = `${getCoefficient()}sqrt(${variable})`;
            expression += randomOperationWithInteger();
            return expression;
        },
    },
};

export const generateExpressions = (): { x: string; y: string; z: string } => {
    const variable = 't';
    let expressionType = getRandom(Object.values(expressionTypes));
    const x = expressionType.generate(variable);
    expressionType = getRandom(Object.values(expressionTypes));
    const y = expressionType.generate(variable);
    expressionType = getRandom(Object.values(expressionTypes));
    const z = expressionType.generate(variable);
    return { x, y, z };
};
