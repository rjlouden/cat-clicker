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

var activeButton;

var viewMenu = {
	"menuButtonHTML" :'<button id="%button-id%" type="button" class="menu-button">%name%</button>',
	"render" : function(){
		var myCats = octopus.getCats();
		for (catID in myCats){
			var thisButton = viewMenu.menuButtonHTML.replace("%name%",myCats[catID].name);
			thisButton = thisButton.replace("%button-id%","button-"+catID);
			$("#menu").append(thisButton);
			
			$("#button-"+catID).click(function(event){ octopus.buttonClickEvent(event)});
		}
		
		for (var firstCat in myCats) break;
		$("#button-"+firstCat).trigger('click');		
	},
	"makeSelected":  function(button){
		$("#"+button).removeClass('btn-success').addClass('btn-primary ');
	},
	"makeUnSelected": function(button){
		$("#"+button).addClass('btn-success').removeClass('btn-primary');
	}
};

var viewCat = {
	"catdivHTML" : '<div id="%div-name%"><H1>%name%</H1><img src="%image%" alt="%name%"></div>',
	"catTimesHTML" : '<div id = "%div-name%-times"><H1>Times Clicked= %times%</H1></div>',
	"renderCat": function(catID){
		var thisCat = octopus.getThisCat(catID);
		
		var catHTML = viewCat.catdivHTML.replace(/%div-name%/g,catID);
		catHTML = catHTML.replace("%image%",thisCat.image);
		catHTML = catHTML.replace(/%name%/g,thisCat.name);
		var catTimesHTML = viewCat.catTimesHTML.replace(/%div-name%/g,catID);
		$("#cats").replaceWith('<div id="cats" >'+catHTML+catTimesHTML+'</div>');
	},
	"renderTimes": function(catID, times){
		var thisCat = octopus.getThisCat(catID);
		var catTimesHTML = viewCat.catTimesHTML.replace(/%div-name%/g,catID);
		catTimesHTML = catTimesHTML.replace(/%times%/g,thisCat.timesClicked);
		$( "#"+catID+"-times").replaceWith( catTimesHTML);
	}
};

var octopus = {
	getCats : function(){
		return cats;
	},
	getThisCat : function(catID){
		return cats[catID];
	},
	catClickEvent : function (event){
		var catID = event.currentTarget.id;
		cats[catID].timesClicked++;
		viewCat.renderTimes(catID,cats[catID].timesClicked);
	},
	buttonClickEvent : function(event){
		viewMenu.makeUnSelected(activeButton);
		activeButton= event.currentTarget.id;
		viewMenu.makeSelected(activeButton);
		
		var catID = event.currentTarget.id.replace(/^button-/,"");
		
		viewCat.renderCat(catID);
		viewCat.renderTimes(catID);
		
		$("#"+catID).click(function(event){octopus.catClickEvent(event)});
	}
}

$(document).ready(function(){
	viewMenu.render();
});




