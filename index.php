<?php


if( isset($_GET['score'])){
  $score = (int)$_GET['score'] ;
  $title = "DEF: I got ".$score."/25 right. REAL or FAKE? Test your perception";
}else {
  $title = "Real or Fake Quiz, Test Your Perception";
  $score = "BADSCORE";
};


?>
<head>
    <meta charset="utf-8">
    <title><?php echo $title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <meta name="description" content="Yes No">
    <link href="assets/css/vendor/reset.css" rel="stylesheet">
    <link href="assets/css/vendor/bootstrap.css" rel="stylesheet">
    <link href="assets/css/vendor/bootstrap-theme.css" rel="stylesheet">
    <link href="assets/css/main.css" rel="stylesheet">

    <script src="//use.typekit.net/bmc0kph.js"></script>
    <script>try{Typekit.load();}catch(e){}</script>

    <!-- must use absolute urls -->
    <!-- NEED TO CHANGE THE URLS TO ALL MATCH THE DEV DOMAIN -->


    <!-- // BEGIN FACEBOOK META -->
    <meta property="og:title" content="FB: <?php echo $title; ?>">
    <meta property="og:description" content="Lorem Ipsum sit dolor amet">
    <meta property="og:image" content="http://dev.seanhelvey.com/assets/img/fb_shareimage_1120x500.jpg">
    <meta property="og:url" content="http://dev.seanhelvey.com/share.php?score=<?php echo $score; ?>">
    <!-- // END FACEBOOK META -->

    <!-- // BEGIN TWITTER META -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@adobe">
    <meta name="twitter:creator" content="@adobe">
    <meta name="twitter:title" content="FB: <?php echo $title; ?>">
    <meta name="twitter:description" content="Lorem Ipsum sit dolor amet">
    <meta name="twitter:image:src" content="http://dev.seanhelvey.com/assets/img/fb_shareimage_1120x500.jpg?1">
    <!-- // END TWITTER META -->
  <style>
  *  {
    font-family: "ubuntu",arial,sans-serif;
    font-weight: 100;
  }
  </style>
    <script src="http://connect.facebook.net/en_US/all.js">
        </script>
        <script>
        // SET THE SCORE FROM THE QUIZ HERE
      var varScore = "19";
      var shareText="I got "+varScore+"/25 right. REAL or FAKE? Test your perception"; // used by twitter share
      var shareDesc="Share description copy goes here";
      var shareURL = "http://dev.seanhelvey.com/share.php?score="+varScore;
      var shareImage = "http://dev.seanhelvey.com/assets/img/fb_shareimage_1120x500.jpg";
      FB.init({
              appId:'1595538550682763', cookie:true,
              status:true, xfbml:true
           });

       function fbClickHandler() {
        FB.ui({
          method: 'feed',
          link: shareURL,
          picture:shareImage,
          description:shareDesc,
          caption: shareText,
        }, function(response){});
       }

       function twitterClickHandler() {
        window.open("https://twitter.com/share?url="+encodeURIComponent(shareURL)+"&text="+encodeURIComponent(shareText), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false; }


      </script>
</head>
<body>
    <script src="assets/js/vendor/jquery-2.1.3.min.js"></script>
    <script src="assets/js/vendor/jquery.event.move.js"></script>
    <script src="assets/js/vendor/jquery.event.swipe.js"></script>
    <script src="assets/js/vendor/jquery.color.js"></script>
    <script src="assets/js/vendor/jquery.touchSwipe.min.js"></script>
    <script src="assets/js/vendor/bootstrap.js"></script>
    <script src="assets/js/vendor/retina.js"></script>
    <script src="assets/js/vendor/spin.min.js"></script>
    <script src="assets/js/vendor/jquery.spin.js"></script>
    <script src="assets/js/vendor/imagesloaded.pkgd.min.js"></script>
    <script src="assets/js/vendor/modernizr.custom.83564.js"></script>
    <div class="container" id="main-container">
      <div class="row" id="header">
        <div class="col-xs-12" id="header-col">
            <a href="http://www.adobe.com" id="upper-left-link"><img class="img" id="upper-left-adobe" src="assets/img/Adobe_creatingmagic.png" target="_blank"></a>
            <a href="http://www.adobe.com" id="upper-right-link" target="_blank"><img class="img" id="upper-right-ps-logo" src="assets/img/PS-Logo.png"></a>
        </div>
      </div>
      <div class="row" id="img-text-row">
        <div class="col-xs-12" id="img-text-col">
          <img class="img-responsive center-block" id="real-or-fake" src="assets/img/realorfake.png">
        </div>
      </div>
      <div class="row text-center" id="img-row">
        <div class="col-xs-12" id="img-col">
          <img class="img" id="main-img" src="assets/img/Swipe1.jpg">
          <img class="img" id="ps-logo" src="assets/img/PS-Logo.png">
        </div>
      </div>
      <div class="row" id="prompt-row">
        <div class="col-xs-12" id="prompt-col">
            25 Years!
        </div>
      </div>
      <div class="container" id="grid">
        <div id="grid-text"></div>
      </div>
      <div class="row" id="footer">
        <div class="col-xs-12" id="footer-col">
            <a href="http://www.google.com" id="terms" target="_blank">Terms</a>
            <a href="http://www.adobe.com" id="bottom-right-link" target="_blank"><img class="img" id="bottom-right-adobe" src="assets/img/adobe_logo.png"></a>
        </div>
      </div>
    </div>
    <script src="assets/js/preload.js"></script>
    <script src="assets/js/transitions.js"></script>
    <script src="assets/js/main.js"></script>
</body>