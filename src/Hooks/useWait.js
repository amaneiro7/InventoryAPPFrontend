export function wait(time, condition, callback) {
    setTimeout(function() {
        if (condition) {
            callback();
        }
    }, time);
}