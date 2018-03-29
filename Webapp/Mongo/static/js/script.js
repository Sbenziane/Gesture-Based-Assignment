var canvas = document.getElementById("game");

    Game.load(document.getElementById("game_wire").getContext("2d"),
                document.getElementById("game_start_box").getContext("2d"), 
                document.getElementById("game_end_box").getContext("2d"), 
                canvas.getContext("2d"), canvas.width, canvas.height);
    Myo.connect();

    $( document ).ready(function() {
        checkUpdate(); // Check the DB for scores
        fadein_popup();
        window.setTimeout(fadeout_popup,6000);
    });
    Myo.on('connected', function(){
           console.log("connected");
	});
    $(".float_help .help").hover(
        function() {
            fadein_popup();
        }, function() {
            fadeout_popup();
    });
    $(".float_help .help").click(function() {
        if(!Game.on)
            toggle_tutorial();
    });

    Myo.on('fist', function(){
        console.log("fist");
        if(!tutorial_open){
            Game.on = true;
            Timer.startTimer();
            this.zeroOrientation();
        }
    });
    Myo.on('double_tap', function(){
        console.log("double_tap");
        if(!Game.on)
            toggle_tutorial();
            
    });
    Myo.on('vector', _.throttle(function(vector){
        if(Game.on && !tutorial_open){
            Game.update_game(vector);
        }
    }, 50));

    function fadein_popup(){
        $(".float_help .help_popup").addClass( "fadein" );
    }
    function fadeout_popup(){
        $(".float_help .help_popup").removeClass( "fadein" );
    }