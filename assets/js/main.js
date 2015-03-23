/* indicates whether image is real or fake */
var IMAGES = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var BEG_DELTA = 120;
var SWIPE_SPEED = 250;
var HIGHLIGHT_SPEED = 250;
var delta = 0;
var correct_number = 0;
var image_number = 1;
var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var old_margin = 0;
var first = true;
var lock = false;
var once = false;

setMobileOperatingSystemLinks();

/* Calculate and return delta, which is the direction and distance the image will move.
This method also sets "scores" each time the user swipes */
function score_swipe(event) {
    if (event.type === "swiperight" || event.target.id == "desktop-photoshop") {
        delta = BEG_DELTA;
        if (IMAGES[image_number - 1] == 0) {
            correct_number++;
            scores[image_number - 1] = 1;
        }
    } else {
        delta = -1 * BEG_DELTA;
        if (IMAGES[image_number - 1] == 1) {
            correct_number++;
            scores[image_number - 1] = 1;
        }
    }
    return delta;
}

/* Slide transition will either show next image or redirect to final page via anmate */
function slide_transition(img) {
    incremental_preload(image_number);
    if (first) {
        image_number = getParameterByName('image');
        first = false;
        if (!image_number) {
            image_number = 1;
        }
    }
    // image_number = 25;
    if (image_number < IMAGES.length) {
        animate(img, delta);
    } else {
        build_grid();
        $("#img-row").off();
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* Call highlight, move the swiped image, either show next image or final page */
function animate(img, delta, last) {
    var real = IMAGES[image_number - 1];
    image_number++;
    //move left or right based on delta calculated above and reduce opacity
    img.animate({
        marginLeft: delta + "px",
        opacity: 0
    }, SWIPE_SPEED, "linear", function() {
        var selector = "";
        var src1 = "";
        var src2 = "";
        if (real) {
            selector = "real";
        } else {
            selector = "photoshop";
        }
        if (Modernizr.touch) {
            image = $("#img-text-col #mobile-" + selector);
            if (selector == "real") {
                src1 = "Adobe_RealOrPhotoshop_Real_White";
                src2 = "Adobe_RealOrPhotoshop_Real_Red";
            } else {
                src1 = "Adobe_RealOrPhotoshop_Photoshop_White";
                src2 = "Adobe_RealOrPhotoshop_Photoshop_Green";
            }
        } else {
            image = $("#desktop-right-section #desktop-" + selector);
            if (selector == "real") {
                src1 = "Adobe_Desktop_RealButton";
                src2 = "Adobe_Desktop_RealButton_Selected";
            } else {
                src1 = "Adobe_Desktop_PhotoshopButton";
                src2 = "Adobe_Desktop_PhotoshopButton_Selected";
            }
        }
        $("#att-text").animate({
            color: "white",
        }, 2400, function() {
            $("#att-text").css({"color": "transparent"})
        });

        image.fadeOut(200, function () {
            image.attr('src', "assets/img/new/" + src2 + ".png");
            image.fadeIn(2200, function () {
                image.attr('src', "assets/img/new/" + src1 + ".png");
                lock = false;
            });
        });
        if (preloaded_images[image_number - 1] === undefined) {
        img.attr("src", "assets/img/Swipe" + image_number + ".jpg").load(function() {
            //restore prior margin and opacity
            img.css({
                "margin-left": old_margin,
                opacity: 1,
            });
        });
        } else {
        img.attr("src", preloaded_images[image_number - 1].src).load(function() {
            //restore prior margin and opacity
            img.css({
                "margin-left": old_margin,
                opacity: 1,
            });
        });
        }
    });
}

function build_grid() {
    $("#main-img").hide();
    var sum = 0;
    for (var i = 0; i < scores.length; i++) {
        sum += parseInt(scores[i]);
        if (i % 5 == 0) {
            // $("<div class='row grid-row'></div>").insertBefore($("#img-col #grid-text"));
            $("#img-col").append("<div class='row grid-row'></div>");
        }
        if (scores[i] == 1) {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Adobe_Clearx_v1_12.19.15.png'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/Grid' + (i + 1) + '.png")'});
        } else {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Adobe_RedX_v1_12.19.15.png'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/Grid' + (i + 1) + '.png")'});
        }
    }
    imagesLoaded("#grid", function() {
        results_grid_transition(sum);
    });
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