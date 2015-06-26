function endGame(angle) {
  var orbits = Math.floor(angle / (Math.PI * 2));
  alert("Game Over! You completed " + orbits + " orbits!");
  $('#start').show();
  $('#ship').css({"top": "49%", "left" : "75%"});

  $.ajax({
          url: '/games/new',
          method: 'POST',
          data: {score: orbits}
  });
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
    endGame(angle);
    return;
  }

  angle += 0.05;

  shipSize = $('#ship').width();

  var xCenter = ($(window).width() - shipSize) / 2;
  var yCenter = ($(window).height() - shipSize) / 2;

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

  $('#outer-bound').css({
    'width' : radius*2 / 0.9,
    'height' : radius*2 / 0.9,
    'margin-top' : -(radius / 0.9),
    'margin-left' : -(radius / 0.9)
  });

  newRadius = radius - r;

  if (newRadius > radius / 0.9) {
    endGame(angle);
    return;
  }

  var newLeft = Math.floor(xCenter + (newRadius * Math.cos(angle)));
  var newTop = Math.floor(yCenter  + (newRadius * Math.sin(angle)));

  $('#ship').animate({
      top: newTop,
      left: newLeft,
  }, 1, function() {
      moveit(angle, r, v);
  });
};

$(document).ready(function() {
  var urlData = {
                  w: 1300,
                  h: 800,
                  angle: 90,
                  ra: Math.random()*12 + 6,
                  de: Math.random()*90 - 45,
                  rotation: Math.random()*180 + 90,
                  mag: 8,
                  max_stars: Math.random()*2000 + 2000,
                  zoom: 3,
                  borders: 0,
                  show_grid: 0,
                  show_const_lines: 0,
                  show_const_names: 0,
                  show_const_boundaries: 0,
                  output: 'PNG'
  };

  var backgroundURL = 'http://server1.sky-map.org/map?' + $.param(urlData);

  $('html').css('background-image', 'url('+backgroundURL+')')

  $('#start').on('click', function(event) {
    event.preventDefault();
    $('html').css('background-image', 'url('+backgroundURL+')')
    $(this).hide();
    moveit(0, 0, 0);
  });
});
