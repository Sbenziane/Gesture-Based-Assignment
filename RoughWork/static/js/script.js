var canvas = document.getElementById("game");

Game.load(document.getElementById("game_wire").getContext("2d"),
            document.getElementById("game_start_box").getContext("2d"), 
            document.getElementById("game_end_box").getContext("2d"), 
            canvas.getContext("2d"), canvas.width, canvas.height);
Myo.connect();

$( document ).ready(function() {
    fadein_popup();
    window.setTimeout(fadeout_popup,10000);
});
$(".float_help .help").hover(
    function() {
        fadein_popup();
    }, function() {
        fadeout_popup();
});
$(".float_help .help").click(function() {
  console.log("open modal");
});

Myo.on('fist', function(){
    Game.on = true;
    this.zeroOrientation();
});
Myo.on('double_tap', function(){
    if(!Game.on)
        console.log("show modal");
});
Myo.on('vector', _.throttle(function(vector){
    if(Game.on){
        Game.update_game(vector);
    }
}, 50));

function fadein_popup(){
    $(".float_help .help_popup").addClass( "fadein" );
}
function fadeout_popup(){
    $(".float_help .help_popup").removeClass( "fadein" );
}