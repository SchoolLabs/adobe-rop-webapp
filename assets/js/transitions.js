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
    $("#twenty-five-wrapper").append("<img class='center-block' id='begin' src='assets/img/SwipetoBegin.png'>");
    imagesLoaded("#begin", function() {
        total = $(window).outerHeight(true);
        header = $("#header").outerHeight(true);
        img_text_row = $("#img-text-row").outerHeight(true);
        img_row = $("#img-row").outerHeight(true);
        footer = $("#footer").outerHeight(true);
        adjusted = false;
        condition = header + img_text_row + img_row + footer;
        if (condition > total) {
            $("#twenty-five-text").hide();
            $("#twenty-five-img").hide();
        }
        // for taller or longer phones like iPhone 5 & 6
        img_row = $("#img-row").outerHeight(true);
        while (header + img_text_row + img_row + footer < total) {
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
    $("#above-footer-col").append("<img id='left-for-fake' src='assets/img/LforFAKE.png'></img>");
    $("#above-footer-col").append("<img id='right-for-real' src='assets/img/RforREAL.png'></img>");
    above_footer = $("#above-footer-row").outerHeight(true);
    $("#twenty-five-wrapper").hide();
    $("#main-img").show();
    $("#main-img").height(total - header - img_text_row - img_row_margin - grid - above_footer - footer);
    img_row = $("#img-row").outerHeight(true);
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
    $("#above-footer-col").append("<div id='share-div'></div>");
    $("#share-div").append("<img id='fb-share' src='assets/img/FB_icon.png'></img>");
    $("#share-div").append("<img id='brag-about-it' src='assets/img/BragAboutIt_Button.png'></img>");
    $("#share-div").append("<img id='twitter-share' src='assets/img/Twitter_icon.png'></img>");
    // $("#brag-about-it").on("click tap", share_page_transition);
    $("#above-footer-col").css({
        "text-align": "center"
    });
    $("#left-for-fake").hide();
    $("#right-for-real").hide();
    condition = header + img_text_row + grid + above_footer + footer;
    adjusted = false;
    while (condition > total) {
        // $(".grid-img").css({
        //     "height": (parseInt($(".grid-img").css("height").replace("px", "")) - 1).toString() + "px",
        //     "width": (parseInt($(".grid-img").css("width").replace("px", "")) - 1).toString() + "px",
        // });
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