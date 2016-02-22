var model = {
	"cats" : {
		"cat1": {
			"image": "images/kitten.jpg",
			"name": "Sweet Kitty",
			"timesClicked": 0,
		},
		"cat2": {
			"image": "images/very-happy-kitten.jpg",
			"name": "Happy Kitty",
			"timesClicked": 0,
		},
		"cat3": {
			"image": "images/fishbowl.jpg",
			"name": "Fish Bowl Kitty",
			"timesClicked": 0,
		},
		"cat4": {
			"image": "images/loveyCat.jpg",
			"name": "Hugging Kittens",
			"timesClicked": 0,
		},
		"cat5": {
			"image": "images/blackAndWhite.jpg",
			"name": "Black and White Cat",
			"timesClicked": 0,
		},
		"cat6": {
			"image": "images/KoreaMap.jpg",
			"name": "Korean Map",
			"timesClicked": 0,
		}
	}
}


var viewMenu = {
	"menuButtonHTML" :'<button id="%button-id%" type="button" class="menu-button">%name%</button>',
	"catButton": {},
	"render" : function(){
		var myCats = octopus.getCats();
		for (catID in myCats){
			var thisButton = this.menuButtonHTML.replace("%name%",myCats[catID].name);
			thisButton = thisButton.replace("%button-id%","button-"+catID);
			$("#cat-menu").append(thisButton);
			$("#button-"+catID).click(function(event){ viewMenu.buttonClickEvent(event)});
			
			this.catButton[catID] = document.getElementById("button-"+catID);
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
	"updateText" : function(catID){
		var thisCat= octopus.getThisCat(catID);
		this.catButton[catID].textContent=thisCat.name;
		
	},
	"updatePanel": function (inPanel){
		if(inPanel) {
			$("#cat-menu").addClass('panel'); }
		else {
			$("#cat-menu").removeClass('panel');
		}
	}
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
		
		if(viewAdmin.jPM.isOpen()){
			viewAdmin.render();	
		}
	},
	"updatePanel": function (inPanel){
		if(inPanel) {
			$("#cats").addClass('panel'); }
		else {
			$("#cats").removeClass('panel');
		}
	}
};

var viewAdmin = {
	init: function(){
		this.jPM = $.jPanelMenu({
			openPosition: "23%",
			closeOnContentClick: false,
			afterOpen: function(){
				viewAdmin.render();
				viewMenu.updatePanel(true);
				viewCat.updatePanel(true);
			},
			afterClose: function(){
				viewMenu.updatePanel(false);
				viewCat.updatePanel(false);
			}
		});
        this.jPM.on();
		
		$("button#save").click(function(event){ viewAdmin.saveEvent()});
		$("button#reset").click(function(event){ viewAdmin.render()});
		
		this.catName = document.getElementsByName("cat-name-input")[1];
		this.catURL = document.getElementsByName("cat-url-input")[1];
		this.catClicked = document.getElementsByName("clicked-input")[1];
	},
	render: function(){
		var thisCat=octopus.getThisCat(octopus.getCurrentCatName());
		
		viewAdmin.catName.value=thisCat.name;
		viewAdmin.catURL.value=thisCat.image;
		viewAdmin.catClicked.value=thisCat.timesClicked;
		
	},
	saveEvent: function(){
		var currentCat = octopus.getCurrentCatName();
		var thisCat=octopus.getThisCat(currentCat);
		
		if (thisCat.name !== this.catName.value || 
		thisCat.image !== this.catURL.value || 
		thisCat.timesClicked !== this.catClicked.value){
			if (/^[0-9]+$/.test(this.catClicked.value, 10)){
				octopus.updateCat(currentCat, {
					name: this.catName.value, 
					URL: this.catURL.value, 
					clicked: this.catClicked.value} );
				
				viewCat.renderCat(currentCat);	
			}
			
		}
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
		viewAdmin.init();
		viewCat.init();
		viewMenu.render();
	},
	updateCat: function(catID, catObject){
		if (model.cats[catID].name !== catObject.name){
			model.cats[catID].name=catObject.name;
			viewMenu.updateText(catID);
		}
		model.cats[catID].image=catObject.URL;
		model.cats[catID].timesClicked=catObject.clicked;		
	}
}

$(document).ready(function(){
	octopus.init();
    });





