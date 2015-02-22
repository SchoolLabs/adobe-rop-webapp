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

function incremental_preload() {
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
}