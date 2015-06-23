var t = 0;
var g = 0;

function collision() {
  $hole = $('#black-hole')
  $ship = $('#ship')

  var x1 = $ship.offset().left;
  var y1 = $ship.offset().top;
  var h1 = $ship.outerHeight(true);
  var w1 = $ship.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $hole.offset().left;
  var y2 = $hole.offset().top;
  var h2 = $hole.outerHeight(true);
  var w2 = $hole.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function moveit(g) {
  if (collision()) {
    alert("Game Over!");
    return;
  }
  t += 0.025;
  g += 0.05;

  shipSize = $('#ship').width();

  var xCenter = $(window).width() / 2 - shipSize;
  var yCenter = $(window).height() / 2 - shipSize;

  var radius = yCenter * 0.75;

  radius = radius - Math.pow(g,2)

  if (yCenter > xCenter) {
    radius = xCenter * 0.75;
  }

  var newLeft = Math.floor(xCenter + (radius * Math.cos(t)));
  var newTop = Math.floor(yCenter  + (radius * Math.sin(t)));

  $('#ship').animate({
      top: newTop,
      left: newLeft,
  }, 1, function() {
      moveit(g);
  });
}

function collision() {
  $hole = $('#black-hole')
  $ship = $('#ship')

  var x1 = $ship.offset().left;
  var y1 = $ship.offset().top;
  var h1 = $ship.outerHeight(true);
  var w1 = $ship.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $hole.offset().left;
  var y2 = $hole.offset().top;
  var h2 = $hole.outerHeight(true);
  var w2 = $hole.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

$(document).ready(function() {
  $('#start').on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    moveit(0);
  });
});
