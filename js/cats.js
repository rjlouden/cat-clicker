var cats = [{
	"image": "images/kitten.jpg",
	"name": "Sweet Kitty",
	"timesClicked": 0,
	"div": "sweet"
	},
	{
	"image": "images/very-happy-kitten.jpg",
	"name": "Happy Kitty",
	"timesClicked": 0,
	"div": "happy"
	}
];

var catDivHTML = '<div id="%div-name%"><img src="%image%" alt="%name%"></div>';
    catDivHTML = catDivHTML + '<div id = "%div-name%-times"><H1>Times Clicked= %times%</H1></div>';
for (var i in cats){
	var thisCat = catDivHTML.replace(/%div-name%/g,cats[i].div);
	thisCat = thisCat.replace("%image%",cats[i].image);
	thisCat = thisCat.replace("%name%",cats[i].name);
	thisCat = thisCat.replace("%times%",cats[i].timesClicked);
    $("body").prepend(thisCat);	
	console.log(thisCat);
}

var timesClicked=0;

$(document).ready(function(){
	for (var i in cats){
		$("#"+cats[i].div).click(function(){
			var divName = "#"+cats[i].div+"-times";
			cats[i].timesClicked++;
			$( divName).replaceWith( '<div id='+divName+'><H1>Times Clicked = '+cats[i].timesClicked+"</H1></div>" );
    });
	}
    $("#catpict").click(function(){
		timesClicked++;
		console.log(timesClicked);
		$( "#times" ).replaceWith( '<div id="times"><H1>Times Clicked = '+timesClicked+"</H1></div>" );
    });
});

