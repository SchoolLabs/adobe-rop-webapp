$( window ).resize(function(){
  // $("#footer").height(total - header - img_text_row - img_row);
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

// $("#ps-logo").swipe( {
//     tap:function(event, target) {
//         // window.location.href = "main.html";
//         window.screenfull.request();
//     }
// });

/* Event handlers. Call score_swipe to calculate delta and kickoff slide_transition */
$("#prompt-row").on("swiperight", function(e) {
    $("#real-or-fake").css({"opacity":1});
    $("#ps-logo").hide();
    $("#prompt-row").hide();
    $("#main-img").show();
    page = 2;
    adjust_fluid(page);
})

$("#main-img").on("swiperight", function(e) {
    $("#grid").css({"opacity":1}); //debug
    $("#grid").height("200px");
    $("#grid").css({"background-color":"yellow"});
  delta = score_swipe(e);
  slide_transition($(this));
})
$("#main-img").on("swipeleft", function(e) {
  delta = score_swipe(e);
  slide_transition($(this));
})

$( document ).ready(function() {
    page = 1; //global
    adjust_fluid(page);
    sessionStorage.setItem("scores", scores);
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
      $("#prompt-row").outerHeight(total - header - img_text_row - img_row - grid - footer - prompt_row_margin);
    } else if (page == 2) {
        console.log(page);
        $("#img-text-row").css({"height":"auto"});
        $("#img-row").css({"height":"auto"});
        img_text_row = $("#img-text-row").outerHeight(true);
        img_row = $("#img-row").outerHeight(true);
        var condition = header + img_text_row + img_row + grid + footer;
        var margin = "1";
        while (condition > total) {
            $("#main-img").css({
                "margin-left": (parseInt($("#main-img").css("margin-left").replace("px", "")) + parseInt(margin)).toString() + "px",
                "margin-right": (parseInt($("#main-img").css("margin-right").replace("px", "")) + parseInt(margin)).toString() + "px",
                "height": ($("#main-img").css("height").replace("px", "") - (2 * parseInt(margin))).toString() + "px"
            });
            img_row = $("#img-row").outerHeight(true);
            condition = header + img_text_row + img_row + grid + footer;
        }
        var adjust = total - header - img_text_row - img_row - grid - footer;
        $("img-row").css({"height":adjust});
    } else {
       $("#grid").css({"height":"auto"});

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

$("#grid").css({"background-color":"green"});

  if (image_number == 1) {
    preload(
    "assets/img/Swipe6.jpg",
    "assets/img/Swipe7.jpg",
    "assets/img/Swipe8.jpg",
    "assets/img/Swipe9.jpg",
    "assets/img/Swipe10.jpg"
    )
  } else if (image_number == 6) {
    preload(
    "assets/img/Swipe11.jpg",
    "assets/img/Swipe12.jpg",
    "assets/img/Swipe13.jpg",
    "assets/img/Swipe14.jpg",
    "assets/img/Swipe15.jpg"
    );
  } else if (image_number == 11) {
    preload(
    "assets/img/Swipe16.jpg",
    "assets/img/Swipe17.jpg",
    "assets/img/Swipe18.jpg",
    "assets/img/Swipe19.jpg",
    "assets/img/Swipe20.jpg"
    );
  } else if (image_number == 16) {
    preload(
    "assets/img/Swipe21.jpg",
    "assets/img/Swipe22.jpg",
    "assets/img/Swipe23.jpg",
    "assets/img/Swipe24.jpg",
    "assets/img/Swipe25.jpg"
    );
  }

  image_number++;
$("#grid").css({"background-color":"blue"});

  //move left or right based on delta calculated above and reduce opacity
  img.animate({marginLeft: delta + "px",opacity: 0}, SWIPE_SPEED, "linear", function(){

    $("#grid").css({"background-color":"purple"});
    if (1 == false) {
    // if (last == false) {
      //switch out old image and bring in new image
      //STUBBED FOR TESTING
      img.attr("src",preloaded_images[image_number-1].src).load(function(){
      // img.attr("src",preloaded_images[image_number-1].src).load(function(){
      // img.attr("src","assets/img/finalcorn" + image_number +".png").load(function(){
        //restore prior margin and opacity
        img.css({
          "margin-left": old_margin,
          opacity: 1,
        });
      });
    } else {
$("#grid").css({"background-color":"pink"});
$("#gird-text").text(scores);
      sessionStorage.setItem("scores", scores);
      build_grid();
      page = 3;
      adjust_fluid(page);
    }
  });

  function build_grid(){
    $("#grid").css({"background-color":"orange"});
      $("#main-img").hide();
      $("#grid").css({"opacity":1});
      $("#grid").css({"background-color":"white"});
        // var scores = sessionStorage.getItem("scores").split(",");
        // var sum = 0;
        // for (var i = 0; i < scores.length; i++){
        //     sum += parseInt(scores[i]);
        //     if (i % 5 == 0) {
        //         $("#grid").append( "<div class='row grid-row'></div>" );
        //     }
        //     if (scores[i] == 1) {
        //         $(".grid-row:last").append( "<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Grid"+ (i + 1) +".png'></div>" );
        //     } else {
        //         $(".grid-row:last").append( "<div class='col-xs-15 grid-img incorrect'><img class='img' src='assets/img/Grid"+ (i + 1) +".png'></div>" );
        //     }
        // }
        // $(".img").load(function(){
        //     $(".incorrect").addClass("cross");
        //     // $("#footer").height(total - header - img_text_row - $("#grid").height());
        // });
        // $("#grid").css({"color":"white"});
        // $("#grid-text").text(sum + "/25 answers correct!");
  }

}