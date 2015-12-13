var QueuedProcessRunner = (function () {
    function QueuedProcessRunner() {
        this.queue = [];
    }
    QueuedProcessRunner.prototype.queueProcess = function (command, exitCallback) {
        var args = command.split(' ');
        args.map(function (entry) {
            return entry.trim();
        });
        command = args.shift();
        var proc = new Process(command, args, exitCallback);
        proc.start();
        this.queue.push(proc);
    };
    return QueuedProcessRunner;
})();
