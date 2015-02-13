var total = $(window).height();
var header = $("#header").height();
var img_text_row = $("#img-text-row").height();
var img_row = $("#img-row").height();
var footer = $("#footer").height();

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