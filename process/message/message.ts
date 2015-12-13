enum Stream {
  STDOUT, STDERR, STDIN
}

interface Message {
  stream: Stream;
  message: string
}

class OutMessage implements Message {
  stream: Stream = Stream.STDOUT;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

class ErrMessage implements Message {
  stream: Stream = Stream.STDERR;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
