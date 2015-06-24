function endGame(angle) {
  var orbits = Math.floor(angle / (Math.PI * 2));
  alert("Game Over! You completed " + orbits + " orbits!");
  $('#start').show();
  $('#ship').css({"top": "49%", "left" : "75%"});
};

function collision(obsticle) {
  $obsticle = obsticle
  $ship = $('#ship')

  var obsticleRadius = $obsticle.outerHeight(false) / 2;
  var shipRadius = $ship.outerHeight(false) / 2;

  var obsticleX = $obsticle.offset().left + obsticleRadius;
  var obsticleY = $obsticle.offset().top  + obsticleRadius;
  var shipX = $ship.offset().left + shipRadius;
  var shipY = $ship.offset().top  + shipRadius;

  var distance = Math.sqrt(
    Math.pow((obsticleX - shipX), 2) +
    Math.pow((obsticleY - shipY), 2)
  ) - obsticleRadius -  shipRadius;

  if (distance > 0) return false;
  return true;
};

function moveit(angle, r, v) {
  var G = 9.81;
  var D = 0.1;

  if (collision($('#black-hole'))) {
    endGame(angle)
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
      moveit(angle, r, v);
  });
};

$(document).ready(function() {
  $('#start').on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    moveit(0, 0, 0);
  });
});
