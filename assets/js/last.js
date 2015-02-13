var scores = sessionStorage.getItem("scores").split(",");
var sum = 0;
for (var i = 0; i < scores.length; i++){
    sum += parseInt(scores[i]);
    if (i % 5 == 0) {
        $("#grid").append( "<div class='row grid-row'></div>" );
    }
    if (scores[i] == 1) {
        $(".grid-row:last").append( "<div class='col-xs-15 grid-img'><img class='img' src='assets/img/Grid"+ (i + 1) +".png'></div>" );
    } else {
        $(".grid-row:last").append( "<div class='col-xs-15 grid-img incorrect'><img class='img' src='assets/img/Grid"+ (i + 1) +".png'></div>" );
    }
}
$(".img").load(function(){
    $(".incorrect").addClass("cross");
    $("#footer").height(total - header - img_text_row - $("#grid").height());
});
$("#footer").css({"color":"white"});
$("#footer").text(sum + "/25 answers correct!");