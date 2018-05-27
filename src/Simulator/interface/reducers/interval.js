export function addInterval(state, field, interval) {
    const newVisibleRangeValues = Array.from(new Set([...state[field].visibleRangeValues, ...interval])).sort((a, b) => +a - +b);
    let newState = Object.assign({}, state, { history: state.history.map(historyEntry => {
            const newHistoryEntry = Object.assign({}, historyEntry);
            newHistoryEntry[field] = Object.assign({}, historyEntry[field], { visibleRangeValues: newVisibleRangeValues });
            return newHistoryEntry;
        }) });
    newState[field] = Object.assign({}, state[field], { visibleRangeValues: Array.from(new Set([...state[field].visibleRangeValues, ...interval])).sort((a, b) => +a - +b) });
    return newState;
}
export function removeInterval(state, field, interval) {
    const newVisibleRangeValues = state[field].visibleRangeValues.filter(x => !interval.has(x));
    let newState = Object.assign({}, state, { history: state.history.map(historyEntry => {
            const newHistoryEntry = Object.assign({}, historyEntry);
            newHistoryEntry[field] = Object.assign({}, historyEntry[field], { visibleRangeValues: newVisibleRangeValues });
            return newHistoryEntry;
        }) });
    newState[field] = Object.assign({}, state[field], { visibleRangeValues: state[field].visibleRangeValues.filter(x => !interval.has(x)) });
    return (state = newState);
}
