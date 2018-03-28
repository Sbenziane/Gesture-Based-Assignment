var tutorial_open = false;

var tutorial = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'escape'],
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

function toggle_tutorial(){
    if(tutorial_open){
        tutorial_open = false;
        tutorial.close();
    }else{
        tutorial_open = true;
        tutorial.open();
    }
}