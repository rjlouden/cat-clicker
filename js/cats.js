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
	},
	"fish": {
		"image": "images/fishbowl.jpg",
		"name": "Fish Bowl Kitty",
		"timesClicked": 0,
		},
	"lovey": {
		"image": "images/loveyCat.jpg",
		"name": "Hugging Kittens",
		"timesClicked": 0,
	},
		"justACat": {
		"image": "images/blackAndWhite.jpg",
		"name": "Black and White Cat",
		"timesClicked": 0,
	},
		"koreaMap": {
		"image": "images/KoreaMap.jpg",
		"name": "Korean Map",
		"timesClicked": 0,
	}
};

var catDivHTML = '<div id="%div-name%"><H1>%name%</H1><img src="%image%" alt="%name%"></div>';
    catDivHTML = catDivHTML + '<div id = "%div-name%-times"><H1>Times Clicked= %times%</H1></div>';

var menuButtonHTML ='<button id="%button-id%" type="button" class="menu-button">%name%</button>';

for (var catID in cats){
	var catHTML = catDivHTML.replace(/%div-name%/g,catID);
	catHTML = catHTML.replace("%image%",cats[catID].image);
	catHTML = catHTML.replace(/%name%/g,cats[catID].name);
	cats[catID].catHTML=catHTML;
}


$(document).ready(function(){
	
	for (var catID in cats){
		var thisButton = menuButtonHTML.replace("%name%",cats[catID].name);
		thisButton = thisButton.replace("%button-id%","button-"+catID);
		$("#menu").append(thisButton);
			
		$("#button-"+catID).click(function(event){
			var catID = event.currentTarget.id.replace(/^button-/,"");
			var catHTML = cats[catID].catHTML.replace("%times%",cats[catID].timesClicked);
			$( "#cats").replaceWith('<div id="cats" >'+catHTML+'</div>');
			
			$("#"+catID).click(function(event){catClickEvent(event)});
		});
	
		$("#button-sweet").trigger('click');
	}
});

function catClickEvent(event){
	var catID = event.currentTarget.id;
	var divTimesName = catID+"-times";
	cats[catID].timesClicked++;
	$( "#"+divTimesName).replaceWith( '<div id="'+divTimesName+'"><H1>Times Clicked = '+cats[catID].timesClicked+"</H1></div>" );
}




