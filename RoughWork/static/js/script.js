var canvas = document.getElementById("game");
        
Game.load(document.getElementById("game_wire").getContext("2d"),
            document.getElementById("game_start_box").getContext("2d"), 
            document.getElementById("game_end_box").getContext("2d"), 
            canvas.getContext("2d"), canvas.width, canvas.height);
Myo.connect();

/*Myo.on('connected', function(){
    myMyo = this;
});*/
Myo.on('fist', function(){
    Game.on = true;
    this.zeroOrientation();
});
Myo.on('vector', _.throttle(function(vector){
    if(Game.on){
        Game.update_game(vector);
    }
}, 50));