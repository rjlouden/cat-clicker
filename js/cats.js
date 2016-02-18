var cats = {
	"sweet": {
		"image": "images/kitten.jpg",
		"name": "Sweet Kitty",
		"timesClicked": 0,
		},
	"happy": {
		"image": "images/very-happy-kitten.jpg",
		"name": "Happy Kitty",
		"timesClicked": 0,
	}
};

var catDivHTML = '<div id="%div-name%"><H1>%name%</H1><img src="%image%" alt="%name%"></div>';
    catDivHTML = catDivHTML + '<div id = "%div-name%-times"><H1>Times Clicked= %times%</H1></div>';

for (var catID in cats){
	var thisCat = catDivHTML.replace(/%div-name%/g,catID);
	thisCat = thisCat.replace("%image%",cats[catID].image);
	thisCat = thisCat.replace(/%name%/g,cats[catID].name);
	thisCat = thisCat.replace("%times%",cats[catID].timesClicked);
    $("#cats").append(thisCat);
}

$(document).ready(function(){
	for (var catID in cats){
		$("#"+catID).click(function(event){
			var catID = event.currentTarget.id;
			var divTimesName = catID+"-times";
			cats[catID].timesClicked++;
			$( "#"+divTimesName).replaceWith( '<div id="'+divTimesName+'"><H1>Times Clicked = '+cats[catID].timesClicked+"</H1></div>" );
    });
	}
});

