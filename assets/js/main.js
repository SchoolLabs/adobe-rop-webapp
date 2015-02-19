/* indicates whether image is real or fake */
var IMAGES = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var BEG_DELTA = 120;
var SWIPE_SPEED = 250;
var HIGHLIGHT_SPEED = 250;
var delta = 0;
var correct_number = 0;
var image_number = 1;
var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/* Event handlers */
var once = false;

if (Modernizr.touch) {
    $("#img-row").on("swipeleft swiperight", function(e) {
        if (once == false) {
            twenty_five_transition();
        } else {
            delta = score_swipe(e);
            slide_transition($("#main-img"));
        }
        once = true;
    });
} else {
    $("#img-row").on("click", function(e) {
        if (once == false) {
            twenty_five_transition();
        } else {
            delta = score_swipe(e);
            slide_transition($("#main-img"));
        }
        once = true;
    });
}

setMobileOperatingSystemLinks();

/* Calculate and return delta, which is the direction and distance the image will move.
This method also sets "scores" each time the user swipes */
function score_swipe(event) {
    if (event.type === "swiperight click") {
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
function slide_transition(img) {
    incremental_preload();
    // image_number = 25;
    if (image_number < IMAGES.length) {
        animate(img, delta);
    } else {
        build_grid();
    }
}

/* Call highlight, move the swiped image, either show next image or final page */
function animate(img, delta, last) {
    var old_margin = img.css("marginLeft");
    var real = IMAGES[image_number - 1];
    image_number++;

    //move left or right based on delta calculated above and reduce opacity
    img.animate({
        marginLeft: delta + "px",
        opacity: 0
    }, SWIPE_SPEED, "linear", function() {
        if (real) {
            $("#img-text-row").css("background-image", "url(assets/img/REALor_fake.png)");
        } else {
            $("#img-text-row").css("background-image", "url(assets/img/real_orFAKE.png)");
        }
        $("#real-or-fake").animate({
            opacity: 0
        }, 500, "linear", function() {
            $(this).animate({
                opacity: 1
            }, 500, "linear");
        });
        img.attr("src", preloaded_images[image_number - 1].src).load(function() {
            //restore prior margin and opacity
            img.css({
                "margin-left": old_margin,
                opacity: 1,
            });
        });
    });
}

function build_grid() {
    $("#main-img").hide();
    $("#grid").css({
        "opacity": 1
    });
    var sum = 0;
    for (var i = 0; i < scores.length; i++) {
        sum += parseInt(scores[i]);
        if (i % 5 == 0) {
            $("<div class='row grid-row'></div>").insertBefore($("#grid #grid-text"));
        }
        if (scores[i] == 1) {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/Grid' + (i + 1) + '.png")'});
        } else {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Adobe_RedX_v1_12.19.15.png'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/Grid' + (i + 1) + '.png")'});
        }
    }
    imagesLoaded("#grid", function() {
        results_grid_transition();
    });
    $("#grid-text").text(sum + "/25 answers correct!");
}

function setMobileOperatingSystemLinks() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
    $("#upper-left-link").attr("href","http://www.apple.com");
    $("#upper-right-link").attr("href","http://www.apple.com");

  }
  else if( userAgent.match( /Android/i ) ){
    $("#upper-left-link").attr("href","http://www.android.com");
    $("#upper-right-link").attr("href","http://www.android.com");
  }
}