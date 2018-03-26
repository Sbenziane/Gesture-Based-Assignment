var Game = {
    on : false,
    c : {
        m : { ctx : undefined },
        w : { ctx : undefined, img : undefined },
        s : { ctx : undefined },
        e : { ctx : undefined },
        width : undefined,
        height : undefined
    },
    hoop : { w_r : 20, h_r : 5 },
    path : {
        start : { x : 50, y : 50 },
        end : { x : 500, y : 50 }
    },
    pie_2: 2 * Math.PI,
    pie_180: Math.PI / 180,

    load: function(w_ctx,s_ctx,e_ctx,ctx,c_w,c_h){
        this.c.m.ctx = ctx, this.c.w.ctx = w_ctx, this.c.s.ctx = s_ctx, this.c.e.ctx = e_ctx, this.c.width = c_w, this.c.height = c_h;
        this.c.m.ctx.lineWidth = 3 , this.c.m.ctx.strokeStyle = "#020202", this.c.w.ctx.lineWidth = 3, this.c.w.ctx.strokeStyle = "#020202";
        this.c.m.ctx.translate(0, this.c.height);
        this.c.m.ctx.scale(1, -1);
        this.c.w.ctx.translate(0, this.c.height);
        this.c.w.ctx.scale(1, -1);
        this.get_game_data();
        this.new_game();
    },
    new_game: function(){
        this.on = false;
        this.draw_game(this.path.start.x, this.path.start.y, 0, this.hoop.w_r, this.hoop.h_r);
    },
    update_game: function(vector){
        var xPos = (vector.x * this.c.height) + this.path.start.x, yPos = (vector.y * this.c.height) + this.path.start.y, zPos = vector.theta * 360;
        this.draw_game(xPos, yPos, zPos, this.hoop.w_r, this.hoop.h_r);
    },
    win_game: function(){
        // Do win game stuff, like add score.
        this.new_game();
        alert("Whooo");
    },
    lose_game: function(){
        // Buzz.
        this.new_game();
    },
    draw_game: function(x, y, a, w_r, h_r){
        // Clear Canvas and draw game.
        this.c.m.ctx.clearRect(0, 0, this.c.width, this.c.height);
        this.extra_graphics();
        this.draw_wire(this.c.m.ctx);
        if(this.on)
            this.draw_hoop(x, y, a, w_r, h_r);
    },
    get_img_data: function(c){
        // Get canvas data.
        return c.getImageData(0,0, this.c.width, this.c.height);
    },
    draw_hoop: function(x1, y1, d1, w, h){
        this.c.m.ctx.beginPath();
        // Ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
        // Easier rotate with ellipse function.
        this.c.m.ctx.ellipse(x1, y1, h, w, (d1 + 90) * this.pie_180, 0, this.pie_2);
        this.c.m.ctx.stroke();
        this.c.m.ctx.closePath();

        // Calculate points on far edges for collsions.
        var d2 = (d1) * this.pie_180,
            d3 = (d1-180) * this.pie_180,
            x2 = x1 + w * Math.cos(d2),
            y2 = y1 + w * Math.sin(d2),
            x3 = x1 + w * Math.cos(d3),
            y3 = y1 + w * Math.sin(d3);
        
        // Check if in the ImageData object taken on at beginning of script.
        var p_1 = this.c.w.img.data[(Math.round(this.c.height - y3) * (this.c.w.img.width * 4)) + (Math.round(x3) * 4)],
            p_2 = this.c.w.img.data[(Math.round(this.c.height - y2) * (this.c.w.img.width * 4)) + (Math.round(x2) * 4)];
        
        if((p_1 != 0 && p_1 != undefined) || (p_2 != 0 && p_2 != undefined)) this.lose_game();
        // Check if the hoop has reached the end point.
        else if(this.c.e.ctx.isPointInPath(x1, y1)) this.win_game();
        // Check if out of bounds.
        else if(this.hoop_off_wire(x1, y1, x2, y2, x3, y3)) this.lose_game();
    },
    hoop_off_wire: function(x1, y1, x2, y2, x3, y3){
        // Check points in the hidden canvas with only a wire on it.
        var res2 = this.c.w.ctx.isPointInPath(x2, this.c.height - y2), res3 = this.c.w.ctx.isPointInPath(x3, this.c.height - y3);
        
        if(this.c.s.ctx.isPointInPath(x1, y1)) {
            return false;
        } else if(res2 || res3){
            if(res2 && res3) return true;
            else return false;
        }else{
            if(this.c.w.ctx.isPointInPath(x1, this.c.height - y1)) return false;
            else return true;
        }
    },
    draw_collision_box: function(c, x, y){
        c.beginPath();
        c.rect(x-this.hoop.w_r, y-this.hoop.w_r, this.hoop.w_r*2, this.hoop.w_r*1.25);
        c.stroke();
        c.closePath();
    },
    draw_wire: function(c){
        // Drawn with Bezier Curves:
        // https://www.w3schools.com/tags/canvas_beziercurveto.asp
        c.beginPath();
        c.moveTo(this.path.start.x, this.path.start.y);
        c.bezierCurveTo(50, 50, 50, 200, 40, 300);
        c.bezierCurveTo(40, 300, 30, 400, 70, 350);
        c.bezierCurveTo(70, 350, 90, 325, 80, 300);
        c.bezierCurveTo(75, 290, 60, 240, 100, 240);
        c.bezierCurveTo(100, 240, 150, 240, 120, 300);
        c.bezierCurveTo(120, 300, 90, 350, 150, 300);
        c.bezierCurveTo(150, 300, 180, 275, 170, 250);
        c.bezierCurveTo(130, 180, 80, 125, 110, 130);
        c.bezierCurveTo(110, 130, 130, 135, 145, 120);
        c.bezierCurveTo(280, 0, 190, 190, 210, 300);
        c.bezierCurveTo(210, 300, 220, 350, 230, 300);
        c.bezierCurveTo(230, 300, 250, 150, 280, 200);
        c.bezierCurveTo(290, 220, 300, 260, 280, 300);
        c.bezierCurveTo(280, 300, 250, 360, 300, 380);
        c.bezierCurveTo(300, 380, 350, 400, 400, 380);
        c.bezierCurveTo(440, 360, 420, 320, 380, 280);
        c.bezierCurveTo(320, 220, 340, 240, 400, 220);
        c.bezierCurveTo(440, 200, 485, 415, 505, 365);
        c.bezierCurveTo(515, 325, 490, 200, this.path.end.x, this.path.end.y);
        c.stroke();
        c.closePath();
    },
    get_game_data: function(){
        this.draw_wire(this.c.w.ctx);
        this.c.w.img = this.get_img_data(this.c.w.ctx);
        this.draw_collision_box(this.c.s.ctx, this.path.start.x, this.path.start.y);
        this.draw_collision_box(this.c.e.ctx, this.path.end.x, this.path.end.y);
    },
    wire_holder: function(x, y, w, h, c){ 
        var w2 = w/2, h2 = h/2, 
            x1 = x - w2, y1 = y - h, 
            x2 = x + w2;
        // Body of cylinder.
        this.c.m.ctx.beginPath();
        this.c.m.ctx.moveTo(x1, y);
        this.c.m.ctx.lineTo(x1,y1-1);
        this.c.m.ctx.bezierCurveTo(x1,y1,x,y-c,x2,y1);
        this.c.m.ctx.fillStyle = "#a85114";
        this.c.m.ctx.fill();
        this.c.m.ctx.stroke();
        this.c.m.ctx.closePath();

        this.c.m.ctx.beginPath();
        this.c.m.ctx.moveTo(x2, y);
        this.c.m.ctx.lineTo(x2,y1-1);
        this.c.m.ctx.bezierCurveTo(x2,y1,x,y-c,x1,y1);
        this.c.m.ctx.fill();
        this.c.m.ctx.stroke();
        this.c.m.ctx.closePath();   
        // Oval on top.
        this.c.m.ctx.beginPath();
        this.c.m.ctx.ellipse(x, y, h2, w2, 90 * this.pie_180, 0, this.pie_2);
        this.c.m.ctx.fillStyle = "#f28b43";
        this.c.m.ctx.fill();
        this.c.m.ctx.stroke();
        this.c.m.ctx.closePath();
    },
    extra_graphics: function(){
        // Left.
        this.wire_holder(this.path.start.x, this.path.start.y, 80, 20, 35);
        // Right.
        this.wire_holder(this.path.end.x, this.path.end.y, 80, 20, 35);
    }
};