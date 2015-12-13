var Stream;
(function (Stream) {
    Stream[Stream["STDOUT"] = 0] = "STDOUT";
    Stream[Stream["STDERR"] = 1] = "STDERR";
    Stream[Stream["STDIN"] = 2] = "STDIN";
})(Stream || (Stream = {}));
var OutMessage = (function () {
    function OutMessage(message) {
        this.stream = Stream.STDOUT;
        this.message = message;
    }
    return OutMessage;
})();
var ErrMessage = (function () {
    function ErrMessage(message) {
        this.stream = Stream.STDERR;
        this.message = message;
    }
    return ErrMessage;
})();
