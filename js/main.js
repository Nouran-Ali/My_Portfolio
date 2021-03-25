
$('#main').toggleClass(localStorage.toggled);

function darkLight() {
  /*DARK CLASS*/
  if (localStorage.toggled != 'dark') {
    $('#main, p').toggleClass('dark', true);
    localStorage.toggled = "dark";
     
  } else {
    $('#main, p').toggleClass('dark', false);
    localStorage.toggled = "";
  }
}

/*Add 'checked' property to input if background == dark*/
if ($('main').hasClass('dark')) {
   $( '#checkBox' ).prop( "checked", true )
} else {
  $( '#checkBox' ).prop( "checked", false )
}




(function($) {
    $.fn.appear = function(fn, options) {

        var settings = $.extend({

            //arbitrary data to pass to fn
            data: undefined,

            //call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            //whether the element is currently visible
            t.appeared = false;

            if (!fn) {

                //trigger the custom event
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            //fires the appear event when appropriate
            var check = function() {

                //is the element hidden?
                if (!t.is(':visible')) {

                    //it became hidden
                    t.appeared = false;
                    return;
                }

                //is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

                    //trigger the custom event
                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {

                    //it scrolled out of view
                    t.appeared = false;
                }
            };

            //create a modified fn with some additional logic
            var modifiedFn = function() {

                //mark the element as visible
                t.appeared = true;

                //is this supposed to happen only once?
                if (settings.one) {

                    //remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                //trigger the original fn
                fn.apply(this, arguments);
            };

            //bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            //check whenever the window scrolls
            w.scroll(check);

            //check whenever the dom changes
            $.fn.appear.checks.push(check);

            //check now
            (check)();
        });
    };

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        //process the queue
        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        //check the queue asynchronously
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
    });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function() {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            }
        }
    });

})(jQuery);

$('.progress-bar > span').each(function () {
            var $this = $(this);
            var width = $(this).data('percent');
            $this.css({
                'transition': 'width 3s'
            });
            setTimeout(function () {
                $this.appear(function () {
                    $this.css('width', width + '%');
                });
            }, 500);
        });


        var slider = document.querySelector(".slide-wr");

        document.getElementById("back").onclick = () => {
          const c = 33.33;
          let left = slider.style.transform.split("%")[0].split("(")[1];
          if (left) {
            var num = Number(left) + Number(c);
          } else {
            var num = Number(c);
          }
          slider.style.transform = `translateX(${num}%)`;
        
          if (left == -166.65) {
            slider.addEventListener("transitionend", myfunc);
            function myfunc() {
              this.style.transition = "none";
              this.style.transform = `translateX(-299.97%)`;
              slider.removeEventListener("transitionend", myfunc);
            }
          } else {
            slider.style.transition = "all 0.5s";
          }
        };
        
        document.getElementById("forward").onclick = () => {
          const c = -33.33;
          let left = slider.style.transform.split("%")[0].split("(")[1];
          if (left) {
            var num = Number(left) + Number(c);
          } else {
            var num = Number(c);
          }
        
          slider.style.transform = `translateX(${num}%)`;
        
          if (left == -299.97) {
            console.log("reached the border");
            slider.addEventListener("transitionend", myfunc);
            function myfunc() {
              this.style.transition = "none";
              this.style.transform = `translateX(-166.65%)`;
              slider.removeEventListener("transitionend", myfunc);
            }
          } else {
            slider.style.transition = "all 0.5s";
          }
        };
        
        const sliderChildren = document.getElementsByClassName("slide-wr")[0].children;
        slider.style.transform = `translateX(${sliderChildren.length * -33.33}%)`;
        Array.from(sliderChildren)
          .slice()
          .reverse()
          .forEach((child) => {
            let cln = child.cloneNode(true);
            cln.classList += " cloned before";
            slider.insertBefore(cln, sliderChildren[0]);
          });
        
        Array.from(sliderChildren).forEach((child) => {
          let cln = child.cloneNode(true);
          if (child.classList.contains("cloned") === false) {
            cln.classList += " cloned after";
            slider.appendChild(cln);
          }
        });
        
        