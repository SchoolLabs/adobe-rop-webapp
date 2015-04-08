/* indicates whether image is real or fake */
var IMAGES = [0,0,1,1,0,1,1,1,0,0,0,0,1,0,1,1,1,0,0,1,1,0,0,1,1];
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
var check_or_x = "Adobe_Desktop_X_V1";
var att_arr = ["Alter &copy; 2011",
               "Dariusz Klimczak &copy; 2015",
               "Alexander Remnev &copy; 2015",
               "Aman Agrawal &copy; 2015",
               "Ibrahim Oubahmane &copy; 2015",
               "Andreas Tauber &copy; 2015",
               "Benjamin Von Wong &copy; 2014",
               "Corey Rich &copy; 2002",
               "Caras Ionut &copy; 2014",
               "Caras Ionut &copy; 2014",
               "Caras Ionut &copy; 2014",
               "Joel Robison / Trevillion Images &copy; 2015",
               "Dimitris Vavylis / Caters News &copy; 2011",
               "John Wilhelm &copy; 2015",
               "Eco Suparman / Caters News &copy; 2012",
               "Lauri Tammik &copy; 2015",
               "Martin Le-May &copy; 2015",
               "Richard Silvera &copy; 2015",
               "Rudi Young &copy; 2015",
               "Natalie Fletcher &copy; 2013",
               "Olga Gladysheva &copy; 2015",
               "St<font face='Symbol'>&#233;</font>fane Gautier &copy; 2015",
               "Tawan Chaisom &copy; 2015",
               "Pete McBride &copy; 2011",
               "Yaroslav Segeda &copy; 2015"];

setMobileOperatingSystemLinks();

/* Calculate and return delta, which is the direction and distance the image will move.
This method also sets "scores" each time the user swipes */
function score_swipe(event) {
    if (event.type === "swiperight" || event.target.id == "desktop-photoshop") {
        delta = BEG_DELTA;
        if (IMAGES[image_number - 1] == 0) {
            correct_number++;
            check_or_x = "Adobe_Desktop_CHECK_V1";
            scores[image_number - 1] = 1;
        }
    } else {
        delta = -1 * BEG_DELTA;
        if (IMAGES[image_number - 1] == 1) {
            correct_number++;
            check_or_x = "Adobe_Desktop_CHECK_V1";
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
    var score = scores[image_number - 1];
    image_number++;
    //move left or right based on delta calculated above and reduce opacity
    img.animate({
        marginLeft: delta + "px",
        opacity: 0
    }, SWIPE_SPEED, "linear", function() {
        var selector = "";
        var or_selector = "";
        var or_height = 0;
        var or_margin = 0;
        var src1 = "";
        var src2 = "";
        if (real) {
            selector = "real";
            not_selector = "photoshop";
        } else {
            selector = "photoshop";
            not_selector = "real";
        }
        if (Modernizr.touch) {
            or_selector = "mobile-or";
            image = $("#img-text-col #mobile-" + selector);
            not_image = $("#img-text-col #mobile-" + not_selector);
            if (selector == "real") {
                src1 = "Adobe_RealOrPhotoshop_Real_White";
                src2 = "Adobe_RealOrPhotoshop_Real_Red";
                not_src1 = "Adobe_RealOrPhotoshop_Photoshop_White";
                not_src2 = getRandomImage(0, score); //randomize
            } else {
                src1 = "Adobe_RealOrPhotoshop_Photoshop_White";
                src2 = "Adobe_RealOrPhotoshop_Photoshop_Green";
                not_src1 = "Adobe_RealOrPhotoshop_Real_White";
                not_src2 = getRandomImage(1, score); //randomize
            }
        } else {
            or_selector = "desktop-or";
            image = $("#desktop-right-section #desktop-" + selector);
            not_image = $("#desktop-right-section #desktop-" + not_selector);
            if (selector == "real") {
                src1 = "Adobe_Desktop_RealButton";
                src2 = "Adobe_Desktop_RealButton_Selected";
                not_src1 = "Adobe_Desktop_PhotoshopButton";
                not_src2 = getRandomImage(0, score); //randomize
            } else {
                src1 = "Adobe_Desktop_PhotoshopButton";
                src2 = "Adobe_Desktop_PhotoshopButton_Selected";
                not_src1 = "Adobe_Desktop_RealButton";
                not_src2 = getRandomImage(1, score); //randomize
            }
        }

        $("#" + or_selector).css({"opacity":0});
        image.attr('src', "assets/img/new/" + src2 + ".png");
        not_image.attr('src', "assets/img/new/" + not_src2 + ".png");

        //note copyright animation has been moved!

        // var or_height = parseInt($("#" + or_selector).height());
        // var or_margin = parseInt($("#" + or_selector).css('margin-top'));
        // var not_image_old_height = parseInt(not_image.height());
        // var not_image_old_margin = parseInt(not_image.css('margin-top'));
        // var not_image_new_height = (not_image_old_height + or_height).toString() + "px";
        // var not_image_new_margin = (not_image_old_margin + or_margin).toString() + "px";

        // not_image.css({"height": not_image_new_height, "margin-top": not_image_new_margin});

        // $("#att-text").html("<p id='att-text'>" + att_arr[image_number - 1] + "</p>");
        $("#att-text").html("<p id='att-text'>" + att_arr[image_number - 1] + "</p>");

        setTimeout( function() {
            image.attr('src', "assets/img/new/" + src1 + ".png");
            // not_image.css({"height": not_image_old_height, "margin-top": not_image_old_margin});
            not_image.attr('src', "assets/img/new/" + not_src1 + ".png");
            $("#" + or_selector).css({"opacity":1});
            lock = false;
        }, 2400);



        if (preloaded_images[image_number - 1] === undefined) {
            img.attr("src", "assets/img/new/Swipe" + image_number + ".jpg").load(function() {
                //restore prior margin and opacity
                img.css({
                    "margin-left": old_margin,
                    opacity: 1,
                });
            });
        } else {
            img.attr("src", "assets/img/new/" + check_or_x + ".png").load(function() {
                //restore prior margin and opacity
                img.css({
                    "margin-left": old_margin,
                    opacity: 1,
                    "border-width": "0px"
                });
            });
            $("#att-text").css({opacity:0});
            setTimeout( function() {
                img.attr("src", preloaded_images[image_number - 1].src).load(function() {
                    //restore prior margin and opacity
                    img.css({
                        "margin-left": old_margin,
                        opacity: 1,
                        "border-width": "1px"
                    });
                });
                $("#att-text").css({opacity:1});
                    $("#current-number").html(image_number);
            }, 2400);
        }
        check_or_x = "Adobe_Desktop_X_V1"; //reset
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
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/new/Grid' + (i + 1) + '.jpg")'});
        } else {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Adobe_RedX_v1_12.19.15.png'></div>");
            $(".grid-row:last .grid-img:last .img").css({'background-image':'url("assets/img/new/Grid' + (i + 1) + '.jpg")'});
        }
    }
    imagesLoaded("#grid", function() {
        results_grid_transition(sum);
    });
}

function setMobileOperatingSystemLinks() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
    // $("#upper-left-link").attr("href","http://www.apple.com");
    // $("#upper-right-link").attr("href","http://www.apple.com");
  }
  else if( userAgent.match( /Android/i ) ){
    // $("#upper-left-link").attr("href","http://www.android.com");
    // $("#upper-right-link").attr("href","http://www.android.com");
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var real_images = ["Adobe_Mobile_R_ImageSwap_032615", "Adobe_Mobile_R_ImageSwap2_032615", "Adobe_Mobile_R_ImageSwap3_032615"];
var pshop_images = ["Adobe_Mobile_PS_ImageSwap_032615", "Adobe_Mobile_PS_ImageSwap2_032615", "Adobe_Mobile_PS_ImageSwap3_032615"];

var ps_correct_images = ["ps_correct_03","ps_correct_06","ps_correct_08","ps_correct_10","ps_correct_13"];
var ps_wrong_images = ["ps_wrong_03","ps_wrong_06","ps_wrong_08","ps_wrong_10","ps_wrong_13"];
var real_wrong_images = ["real_wrong_03","real_wrong_06","real_wrong_08","real_wrong_10","real_wrong_13"];
var real_correct_images = ["real_correct_03","real_correct_06","real_correct_08","real_correct_10","real_correct_13"];

function getRandomImage(pshop,score) {
    var image_index = getRandomInt(0,4);
    if (pshop == 1 && score == 1) {
        return ps_correct_images[image_index];
    } else if (pshop == 1 && score == 0) {
        return ps_wrong_images[image_index];
    } else if (pshop == 0 && score == 0) {
        return real_wrong_images[image_index];
    } else if (pshop == 0 && score == 1) {
        return real_correct_images[image_index];
    } else {
        return real_correct_images[image_index];
        console.log("image warning");
    }
}