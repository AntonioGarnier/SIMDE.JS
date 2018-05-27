export const FUNCTIONAL_UNIT_CYCLE = 'FUNCTIONAL_UNIT_CYCLE';
export function nextFunctionalUnitCycle(data) {
    return {
        type: FUNCTIONAL_UNIT_CYCLE,
        value: data.map(element => mapFunctionalUnitData(element))
    };
}
function mapFunctionalUnitData(data) {
    let toReturnObject = {
        content: [],
        header: []
    };
    let content = [];
    if (data != null && data[0] != null) {
        for (let i = 0; i < data[0].flow.length; i++) {
            let aux = [];
            for (let j = 0; j < data.length; j++) {
                if (data[j].flow[i] != null) {
                    aux.push({
                        id: data[j].flow[i].id,
                        value: data[j].flow[i].toString(),
                        color: data[j].flow[i].color
                    });
                }
                else {
                    aux.push({
                        id: ' ',
                        value: '',
                        color: ''
                    });
                }
            }
            content.push(aux);
        }
    }
    toReturnObject.content = content;
    toReturnObject.header = generateFunctionalUnitHeader(data);
    return toReturnObject;
}
function generateFunctionalUnitHeader(data) {
    let toReturn = [];
    if (data != null) {
        for (let i = 0; i < data.length; i++) {
            toReturn.push(`#${i}`);
        }
    }
    return toReturn;
}
