// Pad seconds with 0s - adapted from https://stackoverflow.com/a/10073788/7232648
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    width = 2;
return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var Timer = {
    x: undefined,
    timerOn : 0,
    timer: function() {
        if (this.timerOn == 1){
            // Set the time to count from - new Date() gets the current time
            var countDownDate = new Date().getTime();
            // Update the count down every 1 second
            this.x = setInterval(function() {
                // Get todays date and time
                var now = new Date().getTime();
                
                // Find the distance between now an the count down date
                var distance = now - countDownDate;
                // Time calculations for days, hours, minutes and seconds
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Output the result in an element with id="time"
                $("#time").text(minutes + ":" + pad(seconds, 2));
            }, 1000);
        }
    },
    startTimer: function() {
        if (!this.timerOn) {
            this.timerOn = 1;
            this.timer();
        }
    },
    stopTimer: function() {
        var time = $("#time").text();
        clearTimeout(this.x);
        $("#time").text("0:00");
        this.timerOn = 0;
        return time;
    }
};