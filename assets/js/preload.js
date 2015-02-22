var preloaded_images = new Array();
var preloaded_background_images = new Array();
var preloaded_grid_images = new Array();

$("#img-col").append("<div id='spin'></div>");
$("#img-col").css({
    // "padding-top": "5%"
});

$("#img-col").append("<div id='prompt'>25 Years!</div>");

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

preloaded_background_images.push(new Image());
preloaded_grid_images[preloaded_grid_images.length - 1].src = "assets/img/real_orFAKE.png";
preloaded_background_images.push(new Image());
preloaded_grid_images[preloaded_grid_images.length - 1].src = "assets/img/REALor_fake.png";

function preload() {
    $("#spin").spin();
    for (i = 0; i < preload.arguments.length; i++) {
        preloaded_images.push(new Image());
        preloaded_images[preloaded_images.length - 1].src = preload.arguments[i];
    }
}

function preload_grid() {
    for (i = 0; i < preload_grid.arguments.length; i++) {
        preloaded_grid_images.push(new Image());
        preloaded_grid_images[preloaded_grid_images.length - 1].src = preload_grid.arguments[i];
    }
    $(window).load(function() {
        $("#spin").spin(false);
        splash_screen_transition();
    });
}

function incremental_preload(img_number) {
    if (image_number >= 5) {
        preload("assets/img/Swipe" + (img_number+1) + ".jpg")
        preload_grid("assets/img/Grid" + (img_number+1) + ".png")
    }
}