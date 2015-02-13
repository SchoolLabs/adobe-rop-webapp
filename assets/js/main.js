var total = $(window).height();
var header = $("#header").height();
var img_text_row = $("#img-text-row").height();
var img_row = $("#img-row").height();
var footer = $("#footer").height();



$(function () {
    $('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

    if (!screenfull.enabled) {
        return false;
    }

    $('#main-img').click(function () {
        screenfull.request($('#main-container')[0]);
        // does not require jQuery, can be used like this too:
        // screenfull.request(document.getElementById('container'));
    });

    // $("#continue").click(function(){
    //     screenfull.request();
    // });

    // $('#exit').click(function () {
    //     screenfull.exit();
    // });

    // $('#toggle').click(function () {
    //     screenfull.toggle($('#container')[0]);
    // });

    // $('#request2').click(function () {
    //     screenfull.request();
    // });

    // $('#demo-img').click(function () {
    //     screenfull.toggle(this);
    // });

    // a little hack to be able to switch pages while in fullscreen.
    // we basically just creates a seamless iframe and navigate in that instead.
    $('#continue').click(function () {
        $('#main-container').children().css("display","none");
        // We create an iframe and fill the window with it
        var iframe = document.createElement('iframe')
        iframe.setAttribute('id', 'external-iframe');
        iframe.setAttribute('src', 'main.html');
        iframe.setAttribute('frameborder', 'no');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        $('#main-container').prepend(iframe);
        document.body.style.overflow = 'hidden';
    })

    document.addEventListener(screenfull.raw.fullscreenchange, function () {
        var elem = screenfull.element;

        $('#status').text('Is fullscreen: ' + screenfull.isFullscreen);

        if (elem) {
            $('#element').text('Element: ' + elem.localName + (elem.id ? '#' + elem.id : ''));
        }

        if (!screenfull.isFullscreen) {
            $('#external-iframe').remove();
            document.body.style.overflow = 'auto';
        }
    });

    $(document).on(screenfull.raw.fullscreenchange, function screenfullChange() {
        console.log('Fullscreen change');
    });

    // set the initial values
    screenfullChange();
});

$( window ).resize(function(){
  $("#footer").height(total - header - img_text_row - img_row);
});

/* indicates whether image is real or fake */
var IMAGES = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var BEG_DELTA = 120;
var SWIPE_SPEED = 250;
var HIGHLIGHT_SPEED = 250;

var delta = 0;
var correct_number = 0;
var image_number = 1;
var scores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

/* Event handlers. Call score_swipe to calculate delta and kickoff slide_transition */
$("#main-img").on("swiperight", function(e) {
  delta = score_swipe(e);
  slide_transition($(this));
})
$("#main-img").on("swipeleft", function(e) {
  delta = score_swipe(e);
  slide_transition($(this));
})

$( document ).ready(function() {
  sessionStorage.setItem("scores", scores);
  $("#footer").height(total - header - img_text_row - img_row);
});

/* Calculate and return delta, which is the distance the image will move.
   This method also sets the session item "scores" each time the user swipes */
function score_swipe(event){
  if (event.type === "swiperight") {
    delta = BEG_DELTA;
    if (IMAGES[image_number - 1] == 1) {
      correct_number++;
      scores[image_number - 1] = 1;
    }
  } else {
    delta = -1 * BEG_DELTA;
    if (IMAGES[image_number - 1] == 0) {
      correct_number++;
      scores[image_number - 1] = 1;
    }
  }
  return delta;
}

/* Slide transition will either show next image or redirect to final page via anmate */
function slide_transition(img){
  if (image_number < IMAGES.length){
    animate(img, delta, false);
  } else {
    animate(img, delta, true);
  }
}

/* Highlight real or fake */
function highlight(id, color){
  var old_color = $("#" + id).css("backgroundColor");
  $("#" + id).animate({backgroundColor:color}, HIGHLIGHT_SPEED, "linear", function () {
    $("#" + id).animate({backgroundColor:old_color}, HIGHLIGHT_SPEED, "linear");
  });
}

/* Call highlight, move the swiped image, either show next image or final page */
function animate(img, delta, last){
  var old_margin = img.css("marginLeft");
  if (IMAGES[image_number - 1] == 1) {
    highlight("real", "green");
  } else {
    highlight("fake", "red");
  }
  image_number++;
  //move left or right based on delta calculated above and reduce opacity
  img.animate({marginLeft: delta + "px",opacity: 0}, SWIPE_SPEED, "linear", function(){
    if (last == false) {
      //switch out old image and bring in new image
      //STUBBED FOR TESTING
      img.attr("src","assets/img/Swipe" + image_number +".jpg").load(function(){
      // img.attr("src","assets/img/finalcorn" + image_number +".png").load(function(){
        //restore prior margin and opacity
        img.css({
          "margin-left": old_margin,
          opacity: 1,
        });
      });
    } else {
      sessionStorage.setItem("scores", scores);
      window.location.href = "last.html";
    }
  });
}