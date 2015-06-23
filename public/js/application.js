var angle = 0;
var r = 0;

function collision() {
  $hole = $('#black-hole')
  $ship = $('#ship')

  var holeRadius = $hole.outerHeight(false) / 2;
  var shipRadius = $ship.outerHeight(false) / 2;

  var holeX = $hole.offset().left + holeRadius;
  var holeY = $hole.offset().top  + holeRadius;
  var shipX = $ship.offset().left + shipRadius;
  var shipY = $ship.offset().top  + shipRadius;

  var distance = Math.sqrt(
    Math.pow((holeX - shipX), 2) +
    Math.pow((holeY - shipY), 2)
  ) - holeRadius -  shipRadius;

  if (distance >= 0) return false;
  return true;
}

function moveit(v) {
  var G = 9.81;
  var D = 0.1;

  if (collision()) {
    var orbits = Math.floor(angle / (Math.PI * 2));
    alert("Game Over! You completed " + orbits + " orbits!");
    return;
  }

  angle += 0.05;

  shipSize = $('#ship').width();

  var xCenter = $(window).width() / 2 - shipSize;
  var yCenter = $(window).height() / 2 - shipSize;

  $(document).on('keyup', function(event) {
    if (event.keyCode == 32) {
      v = -50;
    }
  });

  v += G*D;
  r += v*D;

  var radius = yCenter * 0.75;
  if (yCenter > xCenter) {
    radius = xCenter * 0.75;
  }

  radius = radius - r;

  var newLeft = Math.floor(xCenter + (radius * Math.cos(angle)));
  var newTop = Math.floor(yCenter  + (radius * Math.sin(angle)));

  $('#ship').animate({
      top: newTop,
      left: newLeft,
  }, 1, function() {
      moveit(v);
  });
}

$(document).ready(function() {
  $('#start').on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    moveit(0);
  });
});
