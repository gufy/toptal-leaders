(function ($, window) {

  $.fn.slidingPhotos = function () {

    var $this = $(this);

    var direction = 1;
    var over = false;

    $this.on('mousemove', function (ev) {

      if (ev.clientX < window.innerWidth / 4) {
        direction = -1;
      } else if (ev.clientX > window.innerWidth * 3 / 4) {
        direction = 1;
      } else {
        direction = 0;
      }

    });

    $this.on('mouseover', function (ev) {
      over = true;
    });

    $this.on('mouseout', function (ev) {
      over = false;
    });

    var speed = 2;
    var timer = setInterval(function () {
      $this.css({
        backgroundPositionX: '+=' + ((over && direction == 0) ? 0 : direction * speed)
      });
    }, 30);

  };

  $.fn.carousel = function () {

    var $this = $(this);
    var $container = $this.find('.carousel-content');

    var contentWidth = $('.carousel-content > div').toArray()
      .map(function (x) { return $(x).width() + parseInt($(x).css('marginRight')) + parseInt($(x).css('marginLeft')); })
      .reduce(function(a,x){return a+x},0);

    var ratio = Math.max(2, Math.ceil(3 * window.innerWidth / contentWidth));

    $container.width(contentWidth);

    var $clone = $container.clone();

    $container.width(contentWidth*ratio).css('left', -contentWidth);

    for (var i = 0; i < ratio - 1; i++) {
      $container.append($clone.clone().css('float', 'left'));
    }

    var direction = 1;
    var over = false;

    $this.on('mousemove', function (ev) {

      if (ev.clientX < window.innerWidth / 4) {
        direction = -1;
      } else if (ev.clientX > window.innerWidth * 3 / 4) {
        direction = 1;
      } else {
        direction = 0;
      }

    });

    $this.on('mouseover', function (ev) {
      over = true;
    });

    $this.on('mouseout', function (ev) {
      over = false;
    });

    var timer = setInterval(function () {
      var speed = 1;
      speed = (over && direction == 0) ? 0 : direction * speed;
      var left = ($container.offset().left + speed + contentWidth) % contentWidth - contentWidth;
      $container.css({
        left: left
      });
    }, 30);

  };

  $(function () {

    $('.content .images').slidingPhotos();
    $('.carousel').carousel();
    $('.btn-menu').each(function () {
      var $this = $(this);
      var $target = $("."+$this.attr('rel'));

      $this.on('click', function (ev) {
        ev.preventDefault();
        $target.toggleClass('open');

        if ($target.hasClass('open')) {
          $this.addClass('open');
        } else {
          $this.removeClass('open');
        }
      });
    })

  });

})(jQuery, window);