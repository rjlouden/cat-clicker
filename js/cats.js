var timesClicked=0;

$(document).ready(function(){
    $("#catpict").click(function(){
		timesClicked++;
		console.log(timesClicked);
		$( "#times" ).replaceWith( '<div id="times"><H1>Times Clicked = '+timesClicked+"</H1></div>" );
    });
});

