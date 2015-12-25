/// <reference path="../node.d.ts" />
/// <reference path="./message/message.ts"/>

var child_process = require('child_process');
var tty = require('tty');

enum ProcessState {
  INIT, RUNNING, EXIT_SUCCESS, EXIT_FAIL
}

interface IProcess {
  process: any;
  command: string;
  args: string[];
  outputs: Message[];
  exitCode: number;
  processState: ProcessState;
  directory: string;
}

class Process implements IProcess {
  process: any;
  command: string;
  args: string[];
  outputs: Message[] = [];
  exitCode: number;
  processState: ProcessState = ProcessState.INIT;
  exitCallback: Function;
  directory: string = process.cwd();

  constructor(command: string, args: string[], exitCallback?: Function) {
    this.command = command;
    this.args = args;
    if (exitCallback)
      this.exitCallback = exitCallback;
  }

  start() : void {
    try {
      this.process = child_process.spawn(this.command, this.args);
      this.processState = ProcessState.RUNNING;

      this.process.stdout.setEncoding('ascii');
      this.process.stderr.setEncoding('ascii');

      this.process.stdout.on('data', (info: string) => {
        info.split('\n').forEach((line: string) => {
          this.outputs.push(new OutMessage(line));
        });
      });

      this.process.stderr.on('data', (error) => {
        error.split('\n').forEach((line) => {
          this.outputs.push(new ErrMessage(line));
        });
      });

      this.process.on('exit', (exitCode: number) => {
        if(exitCode == 0) {
          this.processState = ProcessState.EXIT_SUCCESS;
        } else {
          this.processState = ProcessState.EXIT_FAIL;
        }
        this.exitCode = exitCode;
        if(this.exitCallback) {
          this.exitCallback(this.outputs);
        }
      });
    }
    catch(e) {
      console.log(e);
    }
  }

  write(message: string) : void {
    if(message[message.length - 1] != '\n')
      message += '\n';

    this.process.stdin.write(message);
  }

  kill() : void {
    try {
      this.process.kill();
    } catch (e) {

    }
  }
}
