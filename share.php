<?php


if( isset($_GET['score'])){
	$score = (int)$_GET['score'] ;
	$title = "DEF: I got ".$score."/25 right. REAL or FAKE? Test your perception";
}else {
	$title = "Real or Fake Quiz, Test Your Perception";
	$score = "BADSCORE";
};


?>
<html>
    <head>
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

	<title><?php echo $title; ?></title>
	<style>
	#buttonwrapper {
		width:300px;
		margin:0 auto;
		background-color:#eee;
		height:30px;
		vertical-align:middle;
		padding:0;
	}
	#buttonwrapper div {
		height:30px;
		line-height:30px;
		vertical-align:middle;
		padding:0;
		display:inline;
	}
	h1, h3 {
		width:300px;
		margin:0 auto;
		font-size:18px;
		text-transform:uppercase;
	}
	h3 {
		font-size:12px;
		text-transform:normal;
		padding-bottom:1em;
	}
	#twitter_button, #fb_button {
		/* background-color:#4099ff; */

	}
	#fb_button {
		/* background-color:#3b5998; */
	}
	*  {
		font-family: "ubuntu",arial,sans-serif;
		font-weight: 100;
	}
	#twitter_button img, #fb_button img {
		width:30px;
		height:30px;
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
	<br />
	<h3>Adobe Photoshop 25</h3>
	<h1>REAL or FAKE POC</h1>
	<br />
	<div id="buttonwrapper">
		<div id="fb_button" class="text"><img src="images/FB_icon.png" /></div>
		<div>Brag About It!</div>
		<div id="twitter_button" class="text"><img src="images/Twitter_icon.png" /></div>
	</div>

			<script>
		 var oFBElement = document.getElementById('fb_button');
		 oFBElement.onclick = fbClickHandler;

		 var oTwitterElement = document.getElementById('twitter_button');
		 oTwitterElement.onclick = twitterClickHandler;

		 var oFBElement2 = document.getElementById('fb_button_2');
		 oFBElement2.onclick = onFBClick;

			 </script>



</body>
</html>