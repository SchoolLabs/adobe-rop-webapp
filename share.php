<?php
    $score = $_GET['score'];
?>
<html>
    <head>

		<!-- must use absolute urls -->
		<!-- // BEGIN FACEBOOK META -->
		<!--        <meta property="og:type" content="quiz"> 	-->
		<meta property="og:title" content="I got <?php echo $score; ?>/25 right. REAL or FAKE? Test your perception">
		<meta property="og:description" content="Lorem Ipsum sit dolor amet">
		<meta property="og:image" content="http://s3-static-ak.buzzfed.com/static/2015-02/13/17/campaign_images/webdr01/5-valentines-from-tina-belcher-that-are-better-th-2-14484-1423868071-22_dblbig.jpg">
		<meta property="og:url" content="http://www.dev.seanhelvey.com/school-adobe/share.php">
		<!-- // END FACEBOOK META -->

		<!-- // BEGIN TWITTER META -->
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@adobe">
		<meta name="twitter:creator" content="@adobe">
		<meta name="twitter:title" content="I got <?php echo $score; ?>/25 right. REAL or FAKE? Test your perception">
		<meta name="twitter:description" content="Lorem Ipsum sit dolor amet">
		<meta name="twitter:image:src" content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg">
		<!-- // END TWITTER META -->

	<title>REAL or FAKE | PS 25</title>
	<style>
	*  {
		font-family: "ubuntu",arial,sans-serif;
		font-weight: 100;
	}
	#fakebutton {background-color:#eee;padding:2em;}
	</style>
</head>
<body>
	<div><span id="fakebutton" class="Text">Fake button</span></div>
<div id="fb-root"></div>
      <script src="http://connect.facebook.net/en_US/all.js">
      </script>
      <script>
	  varScore = '19';

         FB.init({
            appId:'1595538550682763', cookie:true,
            status:true, xfbml:true
         });``
		 var oElement = document.getElementById('fakebutton');
		 oElement.onclick = clickHandler;

		 function clickHandler() {
		 	console.log("clicked");

	 		FB.ui({
	 		  method: 'share',
	 		  href: 'http://www.dev.seanhelvey.com/school-adobe/share.php?score='+varScore,
	 		}, function(response){});
		 }
      </script>

</body>
</html>