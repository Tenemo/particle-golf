export const roundToPrecision = (number: number): number =>
    parseFloat(parseFloat(String(number)).toPrecision(6));
