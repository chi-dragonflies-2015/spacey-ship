var t = 0;

function moveit() {
    t += 0.05;

    shipRadius = $('#ship').width()/2;

    var xCenter = $(window).width() / 2;   // center X position
    var yCenter = $(window).height() / 2;   // center Y position

    var radius = yCenter * 0.75;

    if (yCenter > xCenter) {
      radius = xCenter * 0.75;
    }

    var newLeft = Math.floor(xCenter - shipRadius + (radius * Math.cos(t)));
    var newTop = Math.floor(yCenter - shipRadius + (radius * Math.sin(t)));

    $('#ship').animate({
        top: newTop,
        left: newLeft,
    }, 1, function() {
        moveit();
    });
}

$(document).ready(function() {
  moveit();
});
