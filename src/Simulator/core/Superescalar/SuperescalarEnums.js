export var CommitStatus;
(function (CommitStatus) {
    CommitStatus[CommitStatus["SUPER_COMMITOK"] = 0] = "SUPER_COMMITOK";
    CommitStatus[CommitStatus["SUPER_COMMITEND"] = 1] = "SUPER_COMMITEND";
    CommitStatus[CommitStatus["SUPER_COMMITMISS"] = 2] = "SUPER_COMMITMISS";
    CommitStatus[CommitStatus["SUPER_COMMITNO"] = 3] = "SUPER_COMMITNO";
})(CommitStatus || (CommitStatus = {}));
export var SuperStage;
(function (SuperStage) {
    SuperStage[SuperStage["SUPER_ISSUE"] = 0] = "SUPER_ISSUE";
    SuperStage[SuperStage["SUPER_EXECUTE"] = 1] = "SUPER_EXECUTE";
    SuperStage[SuperStage["SUPER_WRITERESULT"] = 2] = "SUPER_WRITERESULT";
    SuperStage[SuperStage["SUPER_COMMIT"] = 3] = "SUPER_COMMIT";
})(SuperStage || (SuperStage = {}));
export var SuperescalarStatus;
(function (SuperescalarStatus) {
    SuperescalarStatus[SuperescalarStatus["SUPER_ENDEXE"] = -2] = "SUPER_ENDEXE";
    SuperescalarStatus[SuperescalarStatus["SUPER_BREAKPOINT"] = -1] = "SUPER_BREAKPOINT";
    SuperescalarStatus[SuperescalarStatus["SUPER_OK"] = 0] = "SUPER_OK";
})(SuperescalarStatus || (SuperescalarStatus = {}));
export function stageToString(index) {
    const stages = {
        0: 'ISSUE',
        1: 'EXECUTE',
        2: 'WRITE',
        3: 'COMMIT'
    };
    return stages[index];
}
