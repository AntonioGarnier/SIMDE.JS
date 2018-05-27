export class MachineIntegration {
    calculateSpeed() {
        let speed = parseInt(document.getElementById('velocidad').value, 10);
        const defaultStep = 2000;
        return speed ? defaultStep / speed : 0;
    }
    calculateStandardDeviation(average, values) {
        const diffs = values.map((value) => value - average);
        const squareDiffs = diffs.map(diff => diff * diff);
        const averageSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        return Math.sqrt(averageSquareDiff);
    }
}
