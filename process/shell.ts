/// <reference path="../node.d.ts" />
/// <reference path="process.ts"/>

interface Runner {
  queue: Process[]
}

class QueuedProcessRunner implements Runner {
  public queue: Process[] = [];

  constructor() {}

  queueProcess(command: string, exitCallback?: Function) : void {
    var args: string[] = command.split(' ');
    args.map((entry) => {
        return entry.trim();
    });
    command = args.shift();

    var proc: Process = new Process(command, args, exitCallback);
    proc.start();
    this.queue.push(proc);
  }
}
