$( document ).ready(function() { // On page load
    checkUpdate(); // Check the DB for scores
});

$(function() { // Refresh function, 
    setTimeout(checkUpdate, 1000); // setTimeout() allows execution of code at specified time intervals - 1000 milliseconds = 1 second, run checkUpdate() every second to check for new scores
});

function checkUpdate(){
    $.get("/getScoreList", function(data){
        d = JSON.parse(data); // Go to the getScoresList route, let d equal the data returned by the function
        for (var i = 0; i < d.length; i++) { // for loop, 0 to length of d (will either be 10 or less)
            var utag = "u" + i; // Generate a username tag string (row 3 = u3, s3)
            var stag = "s" + i; // Same as above except score tag
            var username = d[i].username; // Let username equal the i-th entry's username 
            var numScore = d[i].score; // Same except score
            var len = numScore.length; // length of the score string 
            var timeScore = numScore.substring(0, len-2) + ":" + numScore.substring(len-2); // Need to add the : back in to separate seconds from minutes - Create a new string of first element to third last element + : + the last two elements.

            if(document.getElementById(utag).innerHTML != username && document.getElementById(stag).innerHTML != timeScore){ // If the username AND score in the table row are NOT the same as the parsed in username and score, means top 10 has updated
                document.getElementById(utag).innerHTML = username; // Update the relevant username cell
                document.getElementById(stag).innerHTML = timeScore; // Same for score
            }
        }
    });
    setTimeout(checkUpdate, 1000); // Go back and check for updates continuously
}
/*
var Timer = {
    time: undefined,
    timerOn : 0,
    timer: function() {
        if (this.timerOn == 1){
            // Set the time to count from - new Date() gets the current time
            var countDownDate = new Date().getTime();
            // Update the count down every 1 second
            x = setInterval(function() {
                // Get todays date and time
                var now = new Date().getTime();
                
                // Find the distance between now an the count down date
                var distance = now - countDownDate;
                
                // Time calculations for days, hours, minutes and seconds
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Output the result in an element with id="demo"
                document.getElementById("demo").innerHTML = minutes + ":" + this.pad(seconds, 2);
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
        var time = document.getElementById("demo").innerHTML;
        document.getElementById("savedTime").innerHTML = time;
        this.clearTimeout(x);
        stopTimer.timerOn = 0;
        console.log(time);
    },
    pad: function (n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}
*/
var timerOn = 0;
function timer() {
    if (timerOn == 1){
        // Set the time to count from - new Date() gets the current time
        var countDownDate = new Date().getTime();
        // Update the count down every 1 second
        x = setInterval(function() {
            // Get todays date and time
            var now = new Date().getTime();
            
            // Find the distance between now an the count down date
            var distance = now - countDownDate;
            
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML = minutes + ":" + pad(seconds, 2);
        }, 1000);
    }
}

function startTimer() {
    if (!timerOn) {
        timerOn = 1;
        timer();
    }
}

function stopTimer() {
    var time = document.getElementById("demo").innerHTML;
    document.getElementById("savedTime").innerHTML = time;
    clearTimeout(x);
    timerOn = 0;
    console.log(time);
}

// Pad seconds with 0s - adapted from https://stackoverflow.com/a/10073788/7232648
function pad(n, width, z) {
z = z || '0';
n = n + '';
return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Button click event
$('#saveScore').click(function ( event ){
    event.preventDefault(); // Cancels default action of click - https://api.jquery.com/event.preventdefault/

    if(document.getElementById("savedUsername").value == ""){
        givenusername = "anon"; // If there's no username entered in the box just enter anon
    } else {
        givenusername = document.getElementById("savedUsername").value; // Otherwise use the specified name
    }
    var scoreSec = document.getElementById("savedTime").innerHTML; // Get the time from the timer
    var scoreNum = scoreSec.replace(":", ""); // Get rid of the :

    // User's data in json
    var scoreData = {
        username: givenusername,
        score: scoreNum,
    }
    scoreData = JSON.stringify(scoreData) // Turns whole json object into string
    console.log("html json: " + scoreData) // Making sure it's right
    
    // Adapted from https://stackoverflow.com/a/26930355/7232648
    $.ajax({
        url: '/save', // Go to /save route in python
        headers: {
            'Content-Type':'application/json' // pass as json
        },
        data: scoreData,
        dataType: 'json',
        method: 'POST',
        success: function (data) { // If successful, print success
            console.log("Success")
        },
        error: function (error) { // If not, print an error to the console
            console.log("Error with post");
        }
    });
}) // end button click event