var tutorial_open = false;

var tutorial = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['tutorial'],
    onOpen: function() {
        tutorial_open = true;
    },
    onClose: function() {
        tutorial_open = false;
    },
    beforeClose: function() {
        return true; 
    }
});

// set content
tutorial.setContent('<h1>Tutorial</h1>'+
                        '<p>With the Myo Armband, this Buzz Wire game is controlled by a few simple gestures '+
                        'and the movement of your hand.</p>'+
                        '<ul>'+
                            '<li>'+
                                '<p>Position the Myo Armband charging light is towards your <font color="#15d81f">wrist</font>, and <font color="#ff1818">not your elbow</font>.</p>'+
                                '<p class="desc">If the charging light is facing your elbow, the directional and rotational controls will be parallelised, i.e. right = left, up = down, 90 degrees = -90 degrees.</p>'+
                            '</li>'+
                            '<li>'+
                                '<p>It is best to start with the back of your <font color="#15d81f">hand faced upward</font> and positioned in <font color="#15d81f">front of your torso</font>.</p>'+
                                '<p class="desc">When you start the game, the zero orientation is set to the position and rotation of your hand. '+
                                'Wherever your hand is on game start is considered the beginning of the wire, and the rotation of your hand is considered the hoop at 90 degrees: ' +
                                '<img class="hoop" src="img/tutorial/hoop.png">.</p>'+
                            '</li>'+
                            '<li>'+
                                '<p>Finally, with your hand positioned correctly, make a fist to start the game: '+
                                    '<div class="myo_gesture">' +
                                        '<img src="img/myo/fist.png">' +
                                    '</div>' +
                                '</p>'+
                            '</li>'+
                        '</ul>');

function toggle_tutorial(){
    if(tutorial_open){
        tutorial_open = false;
        tutorial.close();
    }else{
        tutorial_open = true;
        tutorial.open();
    }
}