export var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus[ExecutionStatus["EXECUTABLE"] = 0] = "EXECUTABLE";
    ExecutionStatus[ExecutionStatus["PAUSE"] = 1] = "PAUSE";
    ExecutionStatus[ExecutionStatus["STOP"] = 2] = "STOP";
})(ExecutionStatus || (ExecutionStatus = {}));
