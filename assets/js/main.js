/* preload spinner and splashscreen */
var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
$("#prompt-col").append("<div id='spin'></div>");
$("#spin").css({"padding-top":"50%"});
var preloaded_images = new Array();
function preload() {
    $("#spin").spin();
    for (i = 0; i < preload.arguments.length; i++) {
        preloaded_images.push(new Image());
        preloaded_images[preloaded_images.length - 1].src = preload.arguments[i];
    }
}
var preloaded_grid_images = new Array();
function preload_grid() {
    for (i = 0; i < preload_grid.arguments.length; i++) {
        preloaded_grid_images.push(new Image());
        preloaded_grid_images[preloaded_grid_images.length - 1].src = preload_grid.arguments[i];
    }
    $(window).load(function(){
        $("#spin").spin(false);
        splash_screen_transition();
    });
}
preload(
    "assets/img/Swipe1.jpg",
    "assets/img/Swipe2.jpg",
    "assets/img/Swipe3.jpg",
    "assets/img/Swipe4.jpg",
    "assets/img/Swipe5.jpg"
);
preload_grid(
    "assets/img/Grid1.png",
    "assets/img/Grid2.png",
    "assets/img/Grid3.png",
    "assets/img/Grid4.png",
    "assets/img/Grid5.png"
);
var preloaded_background_images = new Array();
preloaded_background_images.push(new Image());
preloaded_grid_images[preloaded_grid_images.length - 1].src = "assets/img/real_orFAKE.png";
preloaded_background_images.push(new Image());
preloaded_grid_images[preloaded_grid_images.length - 1].src = "assets/img/REALor_fake.png";

/* Event handlers. Call score_swipe to calculate delta and kickoff slide_transition */
function splash_screen_transition(e) {
    page = 2;
    adjust_fluid(page);
}

$("#img-row").on("swipeleft swiperight", function(e) {
    console.log("Swipe");
    page = 3;
    adjust_fluid(page);
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

$("#main-img").on("swipeleft swiperight", function(e) {
  delta = score_swipe(e);
  slide_transition($(this));
})

$( document ).ready(function() {
    page = 1; //global
    adjust_fluid(page);
});

function adjust_fluid(page){
    var total = $(window).outerHeight(true);
    var header = $("#header").outerHeight(true);
    var img_text_row = $("#img-text-row").outerHeight(true);
    var img_row = $("#img-row").outerHeight(true);
    var prompt_row = $("#prompt-row").outerHeight(true);
    var prompt_row_margin = $("#prompt-row").outerHeight(true) - $("#prompt-row").height();
    var grid = $("#grid").outerHeight(true);
    var footer = $("#footer").outerHeight(true);
    if (page == 1) {
      $("#footer").height(total - header - img_text_row - img_row - prompt_row - grid);
    } else if (page == 2) {
        $("#real-or-fake").css({"opacity":1});
        $("#ps-logo").hide();
        $("#spin").hide();
        $("#prompt-row").hide();
        $("#upper-left-adobe").show();
        $("#upper-right-ps-logo").show();
        $("#terms").show();
        $("#bottom-right-adobe").show();
        $("#img-text-row").css("background-image", "url(assets/img/REALor_fake.png)");
        $("#img-text-row").css({"height":"auto"});
        img_text_row = $("#img-text-row").outerHeight(true);
        $("#img-row").css({"height":"40%"});
        $("#img-col").append("<div id='twenty-five-wrapper'><div id='twenty-five-img'><img src='assets/img/25years_together.png'></div><p id='twenty-five-text'>SSS</p></div>");
        $("#twenty-five-wrapper").show();
        $("#twenty-five-text").text("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate.");
        $("#twenty-five-wrapper").append("<img id='begin' src='assets/img/SwipetoBegin.png'>");
        imagesLoaded("#begin", function(){
            var condition = header + img_text_row + img_row + grid + footer;
            while (condition > total) {
                $("#twenty-five-wrapper").css({
                    "margin-left": (parseInt($("#twenty-five-wrapper").css("margin-left").replace("px", "")) + 1).toString() + "px",
                    "margin-right": (parseInt($("#twenty-five-wrapper").css("margin-right").replace("px", "")) + 1).toString() + "px",
                    "height": ($("#twenty-five-wrapper").css("height").replace("px", "") - 2).toString() + "px"
                });
                img_row = $("#img-row").outerHeight(true);
                condition = header + img_text_row + img_row + grid + footer;
                adjusted = true;
            }
            if (adjusted) {
                var adjust = total - header - img_text_row - grid - footer;
                $("img-row").css({"height":adjust});
            }

            // for taller or longer phones like iPhone 5 & 6
            img_row = $("#img-row").outerHeight(true);
            while (header + img_text_row + img_row + grid + footer < total) {
                $("#img-row").css({
                    "margin-top": (parseInt($("#img-row").css("margin-top").replace("px", "")) + 1).toString() + "px"
                });
                img_row = $("#img-row").outerHeight(true);
            }
        });
        $("#img-row").css({"height":"auto"});

    } else if (page == 3) {
        var condition = header + img_text_row + img_row + grid + footer;
        var margin = "1";
        var adjusted = false;
        $("#twenty-five-wrapper").hide();
        $("#main-img").show();
        $("#img-row").css({"height":"auto"});
        $("#img-text-row").css("background-image", "url(assets/img/REALor_fake.png)");
        $("#twenty-five").hide();
        while (condition > total) {
            $("#main-img").css({
                "margin-left": (parseInt($("#main-img").css("margin-left").replace("px", "")) + parseInt(margin)).toString() + "px",
                "margin-right": (parseInt($("#main-img").css("margin-right").replace("px", "")) + parseInt(margin)).toString() + "px",
                "height": ($("#main-img").css("height").replace("px", "") - (2 * parseInt(margin))).toString() + "px"
            });
            img_row = $("#img-row").outerHeight(true);
            condition = header + img_text_row + img_row + grid + footer;
            adjusted = true;
        }
        if (adjusted) {
            var adjust = total - header - img_text_row - grid - footer;
            $("img-row").css({"height":adjust});
        }
        //for taller or longer phones like iPhone 5 & 6
        img_row = $("#img-row").outerHeight(true);
        while (header + img_text_row + img_row + grid + footer < total) {
            $("#img-row").css({
                "margin-top": (parseInt($("#img-row").css("margin-top").replace("px", "")) + 1).toString() + "px"
            });
            img_row = $("#img-row").outerHeight(true);
        }

    } else {
        $("#grid").css({"height":"auto"});
        grid = $("#grid").outerHeight(true);
        var condition = header + img_text_row + grid + footer;
        var adjusted = false;
        while (condition > total) {
            $(".grid-img img").css({
                "height": (parseInt($(".grid-img img").css("height").replace("px", "")) - 1).toString() + "px",
                "width": (parseInt($(".grid-img img").css("width").replace("px", "")) - 1).toString() + "px",
            });
            grid = $("#grid").outerHeight(true);
            condition = header + img_text_row + grid + footer;
            adjusted = true;
        }
        if (adjusted) {
            var adjust = total - header - img_text_row - footer;
            $("#grid").css({"height":adjust});
        }
    }
    $(window).resize();
}

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

  if (image_number == 1) {
    preload(
    "assets/img/Swipe6.jpg",
    "assets/img/Swipe7.jpg",
    "assets/img/Swipe8.jpg",
    "assets/img/Swipe9.jpg",
    "assets/img/Swipe10.jpg"
    );
    preload_grid(
    "assets/img/Grid6.png",
    "assets/img/Grid7.png",
    "assets/img/Grid8.png",
    "assets/img/Grid9.png",
    "assets/img/Grid10.png"
    );
  } else if (image_number == 6) {
    preload(
    "assets/img/Swipe11.jpg",
    "assets/img/Swipe12.jpg",
    "assets/img/Swipe13.jpg",
    "assets/img/Swipe14.jpg",
    "assets/img/Swipe15.jpg"
    );
    preload_grid(
    "assets/img/Grid11.png",
    "assets/img/Grid12.png",
    "assets/img/Grid13.png",
    "assets/img/Grid14.png",
    "assets/img/Grid15.png"
    );
  } else if (image_number == 11) {
    preload(
    "assets/img/Swipe16.jpg",
    "assets/img/Swipe17.jpg",
    "assets/img/Swipe18.jpg",
    "assets/img/Swipe19.jpg",
    "assets/img/Swipe20.jpg"
    );
    preload_grid(
    "assets/img/Grid16.png",
    "assets/img/Grid17.png",
    "assets/img/Grid18.png",
    "assets/img/Grid19.png",
    "assets/img/Grid20.png"
    );
  } else if (image_number == 16) {
    preload(
    "assets/img/Swipe21.jpg",
    "assets/img/Swipe22.jpg",
    "assets/img/Swipe23.jpg",
    "assets/img/Swipe24.jpg",
    "assets/img/Swipe25.jpg"
    );
    preload_grid(
    "assets/img/Grid21.png",
    "assets/img/Grid22.png",
    "assets/img/Grid23.png",
    "assets/img/Grid24.png",
    "assets/img/Grid25.png"
    );
  }

  var real = IMAGES[image_number - 1];
  image_number++;

  //move left or right based on delta calculated above and reduce opacity
  img.animate({marginLeft: delta + "px",opacity: 0}, SWIPE_SPEED, "linear", function(){
    // if (1 == false) {
    if (last == false) {
        if (real){
            $("#img-text-row").css("background-image", "url(assets/img/REALor_fake.png)");
        } else {
            $("#img-text-row").css("background-image", "url(assets/img/real_orFAKE.png)");
        }
        $("#real-or-fake").animate({opacity: 0},500,"linear", function() {
                $(this).animate({opacity: 1}, 500, "linear");
            }
        );
        img.attr("src",preloaded_images[image_number-1].src).load(function(){
            //restore prior margin and opacity
            img.css({
              "margin-left": old_margin,
              opacity: 1,
            });
          });
    } else {
        build_grid();
    }
  });

  function build_grid(){
        $("#main-img").hide();
        $("#grid").css({"opacity":1});
        var sum = 0;
        for (var i = 0; i < scores.length; i++){
            sum += parseInt(scores[i]);
            if (i % 5 == 0) {
                $("<div class='row grid-row'></div>").insertBefore( $("#grid #grid-text"));
            }
            if (scores[i] == 1) {
                $(".grid-row:last").append( "<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Grid"+ (i + 1) +".png'></div>" );
            } else {
                $(".grid-row:last").append( "<div class='col-xs-15 grid-img incorrect'><img class='img' src='assets/img/Grid"+ (i + 1) +".png'></div>" );
            }
        }
        imagesLoaded("#grid", function(){
          $(".incorrect").addClass("cross");
          page = 4;
          adjust_fluid(page);
        });
        $("#grid-text").text(sum + "/25 answers correct!");
  }

}