var child_process = require('child_process');
var tty = require('tty');
var ProcessState;
(function (ProcessState) {
    ProcessState[ProcessState["INIT"] = 0] = "INIT";
    ProcessState[ProcessState["RUNNING"] = 1] = "RUNNING";
    ProcessState[ProcessState["EXIT_SUCCESS"] = 2] = "EXIT_SUCCESS";
    ProcessState[ProcessState["EXIT_FAIL"] = 3] = "EXIT_FAIL";
})(ProcessState || (ProcessState = {}));
var Process = (function () {
    function Process(command, args, exitCallback) {
        this.outputs = [];
        this.processState = ProcessState.INIT;
        this.directory = process.cwd();
        this.command = command;
        this.args = args;
        if (exitCallback)
            this.exitCallback = exitCallback;
    }
    Process.prototype.start = function () {
        var _this = this;
        try {
            this.process = child_process.spawn(this.command, this.args);
            this.processState = ProcessState.RUNNING;
            this.process.stdout.setEncoding('ascii');
            this.process.stderr.setEncoding('ascii');
            this.process.stdout.on('data', function (info) {
                info.split('\n').forEach(function (line) {
                    _this.outputs.push(new OutMessage(line));
                });
            });
            this.process.stderr.on('data', function (error) {
                error.split('\n').forEach(function (line) {
                    _this.outputs.push(new ErrMessage(line));
                });
            });
            this.process.on('exit', function (exitCode) {
                if (exitCode == 0) {
                    _this.processState = ProcessState.EXIT_SUCCESS;
                }
                else {
                    _this.processState = ProcessState.EXIT_FAIL;
                }
                _this.exitCode = exitCode;
                if (_this.exitCallback) {
                    _this.exitCallback(_this.outputs);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    Process.prototype.write = function (message) {
        if (message[message.length - 1] != '\n')
            message += '\n';
        this.process.stdin.write(message);
    };
    Process.prototype.kill = function () {
        try {
            this.process.kill();
        }
        catch (e) {
        }
    };
    return Process;
})();
