var refesh_time = 3000;

function checkUpdate(){
    $.get("/getScoreList", function(data){
        d = JSON.parse(data); // Go to the getScoresList route, let d equal the data returned by the function
        for (var i = 0; i < d.length; i++) { // for loop, 0 to length of d (will either be 10 or less)
            var utag = "#u" + i; // Generate a username tag string (row 3 = u3, s3)
            var stag = "#s" + i; // Same as above except score tag
            var username = d[i].username; // Let username equal the i-th entry's username 
            var numScore = d[i].score; // Same except score
            var len = numScore.length; // length of the score string 
            var timeScore = numScore.substring(0, len-2) + ":" + numScore.substring(len-2); // Need to add the : back in to separate seconds from minutes - Create a new string of first element to third last element + : + the last two elements.

            $(utag).text(username);
            $(stag).text(timeScore);
        }
    });
    setTimeout(checkUpdate, refesh_time); // Go back and check for updates continuously
}