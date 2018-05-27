export function generateIntervalFromImput(input, max) {
    let newInterval = new Set();
    if (!input) {
        throw new Error('noEmptyInput');
    }
    input.split(',').map((value) => {
        if (value.includes('-')) {
            let range = value.split('-');
            let num1 = parseInt(range[0], 10);
            let num2 = parseInt(range[1], 10);
            if (isNaN(num1) || isNaN(num2)) {
                throw new Error('noInputNumber');
            }
            if (num1 >= max || num2 >= max) {
                throw new Error(`inputOutOfRange`);
            }
            if (num1 >= max) {
                num1 = max - 1;
            }
            if (num2 >= max) {
                num2 = max - 1;
            }
            if (num1 < num2) {
                for (; num1 <= num2; num1++) {
                    newInterval.add(num1);
                }
            }
            else {
                for (; num2 <= num1; num2++) {
                    newInterval.add(num2);
                }
            }
        }
        else {
            let num = parseInt(value, 10);
            if (isNaN(num)) {
                throw new Error('noInputNumber');
            }
            if (num >= max) {
                throw new Error(`inputOutOfRange`);
            }
            newInterval.add(num);
        }
        return null;
    });
    return Array.from(newInterval);
}
export function generateRangeArray(size) {
    if (size < 0) {
        throw new Error('Invalid array range');
    }
    let range = [];
    for (let i = 0; i < size; i++) {
        range.push(i);
    }
    return range;
}
