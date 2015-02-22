function splash_screen_transition() {
    $("#ps-logo").hide();
    $("#spin").hide();
    $("#prompt").hide();
    $("#upper-left-adobe").show();
    $("#upper-right-ps-logo").show();
    $("#terms").show();
    $("#bottom-right-adobe").show();
    $("#img-text-row").show();
    $("#img-text-row").css("background-image", "url(assets/img/REALor_fake.png)");
    $("#img-col").append("<div id='twenty-five-wrapper'><div id='twenty-five-img'><img src='assets/img/25years_together.png'></div><p id='twenty-five-text'>SSS</p></div>");
    $("#twenty-five-wrapper").show();
    $("#twenty-five-text").text("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate.");
    $("#img-text-row").css({
        "height": "15%"
    });
    $("#img-row").css({
        "height": "65%"
    });
    $("#twenty-five-wrapper").append("<img class='center-block' id='begin' src='assets/img/SwipetoBegin.png'>");
}

function twenty_five_transition() {
    $("<div class='row' id='above-footer-row'><div class='col-xs-12' id='above-footer-col'></div></div>").insertBefore("#footer");
    $("#above-footer-col").append("<img id='left-for-fake' src='assets/img/LforFAKE.png'></img>");
    $("#above-footer-col").append("<img id='right-for-real' src='assets/img/RforREAL.png'></img>");
    $("#twenty-five-wrapper").hide();
    $("#img-row").css({
        "height": "55%"
    });
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
    $("#img-row").hide()
    $("#left-for-fake").hide();
    $("#right-for-real").hide();
    $("#grid").show();
    $("#above-footer-col").append("<img id='fb_button' src='assets/img/FB_icon.png'></img>");
    $("#above-footer-col").append("<img id='brag-about-it' src='assets/img/BragAboutIt_Button.png'></img>");
    $("#above-footer-col").append("<img id='twitter_button' src='assets/img/Twitter_icon.png'></img>");
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