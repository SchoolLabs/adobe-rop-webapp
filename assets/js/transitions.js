function splash_screen_transition() {
    /* Event handlers */
    var once = false;

    if (Modernizr.touch) {
        $("#img-row").on("swipeleft swiperight", function(e) {
            if (once == false) {
                twenty_five_transition();
                old_margin = $("#main-img").css("marginLeft");
            } else {
                delta = score_swipe(e);
                slide_transition($("#main-img"));
            }
            once = true;
        });
    } else {
        $("#img-row").on("click", function(e) {
            console.log("click");
            if (once == false) {
                twenty_five_transition();
                old_margin = $("#main-img").css("marginLeft");
            } else {
                delta = score_swipe(e);
                slide_transition($("#main-img"));
            }
            once = true;
        });
    }

    $("#ps-logo").hide();
    $("#spin").hide();
    // $("#two-five-logo").hide();
    $("#upper-left-adobe").show();
    $("#terms").show();
    // $("#bottom-right-adobe").show();

    $("#img-col").append("<div id='twenty-five-wrapper'><p id='twenty-five-text' class='text-center'>SSS</p></div>");
    $("#twenty-five-wrapper").show();
    $("#twenty-five-text").text("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate.");
    // $("#twenty-five-wrapper").append("<img class='center-block' id='begin' src='assets/img/SwipetoBegin.png'>");
    // $("#twenty-five-wrapper").append("<img class='center-block' id='real-or-photoshop' src='assets/img/new/Adobe_MobileStates_SplashScreen_RealOrPhotoshop.png'>");
    $("#twenty-five-wrapper").append("<img class='center-block' id='real' src='assets/img/new/Adobe_RealOrPhotoshop_Real_White.png'>");
    $("#twenty-five-wrapper").append("<img class='center-block' id='or' src='assets/img/new/Adobe_RealOrPhotoshop_Or_White.png'>");
    $("#twenty-five-wrapper").append("<img class='center-block' id='photoshop' src='assets/img/new/Adobe_RealOrPhotoshop_Photoshop_White.png'>");
    $("#twenty-five-wrapper").append("<img class='center-block' id='start-button' src='assets/img/new/Adobe_MobileStates_SplashScreen_StartButton.png'>");
}

function twenty_five_transition() {
    $("#two-five-logo").hide();
    $("#img-col").addClass("col-md-8");
    $("#img-row").append("<div class='col-md-4' id='desktop-right-section'></div>")
    $("#desktop-right-section").show();
    $("#desktop-right-section").append("<img id='desktop-right-img' src='assets/img/new/Adobe_MobileStates_LoadingScreen_25Logo.png'></img>");
    $("#twenty-five-wrapper").hide();
    if (Modernizr.touch) {
        $("#img-text-row").show();
        $("#img-text-col").append("<img class='center-block' id='real' src='assets/img/new/Adobe_RealOrPhotoshop_Real_White.png'>");
        $("#img-text-col").append("<img class='center-block' id='or' src='assets/img/new/Adobe_RealOrPhotoshop_Or_White.png'>");
        $("#img-text-col").append("<img class='center-block' id='photoshop' src='assets/img/new/Adobe_RealOrPhotoshop_Photoshop_White.png'>");
        // $("#img-text-row").css("background-image", "url(assets/img/new/Adobe_MobileStates_SplashScreen_RealOrPhotoshop.png)");
        $("#real, #photoshop").css({
            "height": "25%"
        })
        $("#or").css({
            "height": "20%"
        })
        $("#img-text-row").css({
            "height": "15%"
        });
        $("#img-row").css({
            "height": "65%"
        });
    } else {
        $("#desktop-right-section").append("<img class='center-block' id='real' src='assets/img/new/Adobe_RealOrPhotoshop_Real_White.png'>");
        $("#desktop-right-section").append("<img class='center-block' id='or' src='assets/img/new/Adobe_RealOrPhotoshop_Or_White.png'>");
        $("#desktop-right-section").append("<img class='center-block' id='photoshop' src='assets/img/new/Adobe_RealOrPhotoshop_Photoshop_White.png'>");
    }
    $("#main-img").show();
}

function results_grid_transition(sum) {
    var varScore = sum.toString();
    var shareText="I got "+ varScore +"/25 right. REAL or FAKE? Test your perception"; // used by twitter share
    var shareDesc="Share description copy goes here";
    var shareURL = "http://dev.seanhelvey.com/school_adobe/index.php?score="+varScore;
    var shareImage = "http://dev.seanhelvey.com/school_adobe/assets/img/fb_shareimage_1120x500.jpg";
    FB.init({
        appId:'1595538550682763', cookie:true,
        status:true, xfbml:true
    });
    // $("#img-row").hide()
    $("#left-for-fake").hide();
    $("#right-for-real").hide();
    $("#desktop-right-img").hide();
    $("#desktop-right-section").append("<div id='grid-text-mobile'></div>");
    $("#desktop-right-section").append("<div id='grid-text-desktop'></div>");
    $("#grid-text-mobile").text(sum + "/25 answers correct!");
    $("#grid-text-desktop").text(sum + "/25 answers correct!");
    $("#desktop-right-section").append("<img id='fb_button' src='assets/img/FB_icon.png'></img>");
    $("#desktop-right-section").append("<img id='brag-about-it' src='assets/img/new/Brag.png'></img>");
    $("#desktop-right-section").append("<img id='twitter_button' src='assets/img/Twitter_icon.png'></img>");
    $('#fb_button').on("click", function(){
        FB.ui({
          method: 'feed',
          link: shareURL,
          picture:shareImage,
          description:shareDesc,
          caption: shareText,
        }, function(response){});
     });

     $('#twitter_button').on("click", function() {
        window.open("https://twitter.com/share?url="+encodeURIComponent(shareURL)+"&text="+encodeURIComponent(shareText), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
     });
}