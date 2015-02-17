/* indicates whether image is real or fake */
var IMAGES = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var BEG_DELTA = 120;
var SWIPE_SPEED = 250;
var HIGHLIGHT_SPEED = 250;
var delta = 0;
var correct_number = 0;
var image_number = 1;
var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var total = $(window).outerHeight(true);
var header = $("#header").outerHeight(true);
var img_text_row = $("#img-text-row").outerHeight(true);
var img_row_margin = 0;
var img_row = $("#img-row").outerHeight(true);
var prompt_row = $("#prompt-row").outerHeight(true);
var prompt_row_margin = $("#prompt-row").outerHeight(true) - $("#prompt-row").height();
var grid = $("#grid").outerHeight(true);
var above_footer = 0;
var footer = $("#footer").outerHeight(true);
var adjusted = false;
var condition = 0;

/* Event handlers */
var once = false;
$("#img-row").on("swipeleft swiperight", function(e) {
    if (once == false) {
        twenty_five_transition();
    }
    once = true;
});

$("#main-img").on("swipeleft swiperight", function(e) {
    delta = score_swipe(e);
    slide_transition($(this));
})

/* Calculate and return delta, which is the direction and distance the image will move.
This method also sets "scores" each time the user swipes */
function score_swipe(event) {
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
function slide_transition(img) {
    incremental_preload();
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
            $(".grid-row:last").append("<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Grid" + (i + 1) + ".png'></div>");
        } else {
            $(".grid-row:last").append("<div class='col-xs-15 grid-img incorrect'><img class='img' src='assets/img/Grid" + (i + 1) + ".png'></div>");
        }
    }
    imagesLoaded("#grid", function() {
        $(".incorrect").addClass("cross");
        results_grid_transition();
    });
    $("#grid-text").text(sum + "/25 answers correct!");
}

function splash_screen_transition() {
    $("#real-or-fake").css({
        "opacity": 1
    });
    $("#ps-logo").hide();
    $("#spin").hide();
    $("#prompt-row").hide();
    $("#upper-left-adobe").show();
    $("#upper-right-ps-logo").show();
    $("#terms").show();
    $("#bottom-right-adobe").show();
    $("#img-text-row").css("background-image", "url(assets/img/REALor_fake.png)");
    $("#img-text-row").css({
        "height": "auto"
    });
    img_text_row = $("#img-text-row").outerHeight(true);
    $("#img-row").css({
        "height": "40%"
    });
    $("#img-col").append("<div id='twenty-five-wrapper'><div id='twenty-five-img'><img src='assets/img/25years_together.png'></div><p id='twenty-five-text'>SSS</p></div>");
    $("#twenty-five-wrapper").show();
    $("#twenty-five-text").text("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate.");
    $("#twenty-five-wrapper").append("<img id='begin' src='assets/img/SwipetoBegin.png'>");
    imagesLoaded("#begin", function() {
        img_text_row = $("#img-text-row").outerHeight(true);
        img_row = $("#img-row").outerHeight(true);
        grid = $("#grid").outerHeight(true);
        footer = $("#footer").outerHeight(true);
        adjusted = false;
        condition = header + img_text_row + img_row + grid + footer;
        if (condition > total) {
            $("#twenty-five-text").hide();
            $("#twenty-five-img").hide();
        }
        // for taller or longer phones like iPhone 5 & 6
        img_row = $("#img-row").outerHeight(true);
        while (header + img_text_row + img_row + grid + footer < total) {
            $("#img-row").css({
                "margin-bottom": (parseInt($("#img-row").css("margin-bottom").replace("px", "")) + 1).toString() + "px"
            });
            img_row = $("#img-row").outerHeight(true);
        }
    });
    $("#img-row").css({
        "height": "auto"
    });
}

function twenty_five_transition() {
    img_text_row = $("#img-text-row").outerHeight(true);
    $("#img-row").css({
        "margin-top": 0,
        "margin-bottom": 0
    });
    img_row_margin = $("#img-row").outerHeight(true) - $("#img-row").height();
    img_row = $("#img-row").outerHeight(true);
    grid = $("#grid").outerHeight(true);
    footer = $("#footer").outerHeight(true);
    $("<div class='row' id='above-footer-row'><div class='col-xs-12' id='above-footer-col'></div></div>").insertBefore("#footer");
    $("#above-footer-col").append("<img id='left-for-fake' src='assets/img/lforFake.png'></img>");
    $("#above-footer-col").append("<img id='right-for-real' src='assets/img/rforReal.png'></img>");
    above_footer = $("#above-footer-row").outerHeight(true);
    $("#twenty-five-wrapper").hide();
    $("#main-img").show();
    $("#main-img").height(total - header - img_text_row - img_row_margin - grid - above_footer - footer);
    condition = header + img_text_row + img_row + grid + above_footer + footer;
    adjusted = false;
    while (condition > total) {
        $("#main-img").css({
            "margin-left": (parseInt($("#main-img").css("margin-left").replace("px", "")) + 1).toString() + "px",
            "margin-right": (parseInt($("#main-img").css("margin-right").replace("px", "")) + 1).toString() + "px",
            "height": ($("#main-img").css("height").replace("px", "") - (2)).toString() + "px"
        });
        $("#right-for-real").css({
            "margin-right": (parseInt($("#right-for-real").css("margin-right").replace("px", "")) + 1).toString() + "px",
        });
        $("#left-for-fake").css({
            "margin-left": (parseInt($("#left-for-fake").css("margin-left").replace("px", "")) + 1).toString() + "px",
        });
        img_row = $("#img-row").outerHeight(true);
        condition = header + img_text_row + img_row + grid + above_footer + footer;
        adjusted = true;
    }
    if (adjusted) {
        adjust = total - header - img_text_row - grid - above_footer - footer;
        $("img-row").css({
            "height": adjust
        });
    }
    //for taller or longer phones like iPhone 5 & 6
    img_row = $("#img-row").outerHeight(true);
    while (header + img_text_row + img_row + grid + above_footer + footer < total) {
        $("#img-row").css({
            "margin-top": (parseInt($("#img-row").css("margin-top").replace("px", "")) + 1).toString() + "px"
        });
        img_row = $("#img-row").outerHeight(true);
    }
}

function results_grid_transition() {
    $("#grid").css({
        "height": "auto"
    });
    grid = $("#grid").outerHeight(true);
    img_text_row = $("#img-text-row").outerHeight(true);
    img_row = $("#img-row").outerHeight(true);
    above_footer = $("#above-footer-row").outerHeight(true);
    footer = $("#footer").outerHeight(true);
    $("#above-footer-col").append("<img id='brag-about-it' src='assets/img/BragAboutIt_Button.png'></img>");
    $("#above-footer-col").css({
        "text-align": "center"
    });
    $("#left-for-fake").hide();
    $("#right-for-real").hide();
    condition = header + img_text_row + grid + above_footer + footer;
    adjusted = false;
    while (condition > total) {
        $(".grid-img img").css({
            "height": (parseInt($(".grid-img img").css("height").replace("px", "")) - 1).toString() + "px",
            "width": (parseInt($(".grid-img img").css("width").replace("px", "")) - 1).toString() + "px",
        });
        grid = $("#grid").outerHeight(true);
        condition = header + img_text_row + grid + above_footer + footer;
        adjusted = true;
    }
    if (adjusted) {
        adjust = total - header - img_text_row - above_footer - footer;
        $("#grid").css({
            "height": adjust
        });
    }
}