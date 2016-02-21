var model = {
	"cats" : {
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
	}
}


var viewMenu = {
	"menuButtonHTML" :'<button id="%button-id%" type="button" class="menu-button">%name%</button>',
	"render" : function(){
		var myCats = octopus.getCats();
		for (catID in myCats){
			var thisButton = this.menuButtonHTML.replace("%name%",myCats[catID].name);
			thisButton = thisButton.replace("%button-id%","button-"+catID);
			$("#cat-menu").append(thisButton);
			
			$("#button-"+catID).click(function(event){ viewMenu.buttonClickEvent(event)});
		}
		
		for (var firstCat in myCats) break;
		$("#button-"+firstCat).trigger('click');		
	},
	"makeSelected":  function(button){
		$("#"+button).removeClass('btn-success').addClass('btn-primary ');
	},
	"makeUnSelected": function(button){
		$("#"+button).addClass('btn-success').removeClass('btn-primary');
	},
	"buttonClickEvent" : function(event){
		var currentCat = octopus.getCurrentCatName();
		
		this.makeUnSelected("button-"+currentCat);
		this.makeSelected(event.currentTarget.id);
		currentCat = event.currentTarget.id.replace(/^button-/,"")
		octopus.setCurrentCatName(currentCat);
		
		viewCat.renderCat(currentCat);
	},
};

var viewCat = {
	"catTimesString" : 'Times Clicked= %times%',
	"init": function(){
		this.catName = document.getElementById("cat-name");
		this.catCount = document.getElementById("cat-count");
		this.catImg = document.getElementById("cat-img");
		
		$("#cat-img").click(function(event){viewCat.catClickEvent(event)});
	},
	"catClickEvent" : function (event){
		var currentCat = octopus.getCurrentCatName();
		
		octopus.incrementTimesClicked(currentCat);
		this.renderCat(currentCat);
	},
	"renderCat": function(catID){
		var thisCat = octopus.getThisCat(catID);
		
		this.catName.textContent = thisCat.name;
		this.catImg.src = thisCat.image;
		this.catImg.alt = thisCat.name;
		this.catCount.textContent = this.catTimesString.replace("%times%",thisCat.timesClicked);
	}
};

var octopus = {
	getCats : function(){
		return model.cats;
	},
	getThisCat : function(catID){
		return model.cats[catID];
	},
	getCurrentCatName: function(){
		return model.currentCat;
	},
	setCurrentCatName: function(catID){
		model.currentCat = catID;
	},
	incrementTimesClicked: function(catID){
		model.cats[catID].timesClicked++;
	},
	"init": function(){
		viewCat.init();
		viewMenu.render();
	}
}

$(document).ready(function(){
	octopus.init();
	var jPM = $.jPanelMenu({
		openPosition: "23%"
	});
        jPM.on();
    });





