// Search Scenario //

var search = document.getElementById("market-search");
var itemList = document.getElementById("good-list");

search.addEventListener('keyup', searchTyping);
search.addEventListener('focus', searchClearValue);
search.addEventListener('blur', searchRecoverValue);


function searchTyping(evt) {
	var text = evt.target.value.toLowerCase();
	var items = itemList.getElementsByClassName("good__item");

	Array.from(items).forEach(function(item) {
		var itemName = item.querySelector(".good__name").textContent;

		if (itemName.toLowerCase().indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}


function searchClearValue(evt) {
	if (evt.target.style.color != "white") {
		evt.target.value = "";
		evt.target.style.color = "white";
	}
}


function searchRecoverValue(evt) {
	if (evt.target.value == "") {
		evt.target.value = "search";
		evt.target.style.color = "rgba(255,255,255,0.3)";
	} 
}


// Sorting Scenario //
var sortName = document.getElementById("sort-name");
var sortPrice = document.getElementById("sort-price");

sortName.addEventListener('click', sortHandler);
sortPrice.addEventListener('click', sortHandler);


function sortHandler(evt) {
	// External level of sorting programm //
	var condition = getSortCondition(evt);
	sortArrowRedraw(evt, condition);
	toggleSortCondition(evt);
	condition = getSortCondition(evt);
	
	if (evt.target.id == "sort-name") {
		sortByValue(evt, condition, ".good__name");
	} else if (evt.target.id == "sort-price") {
		sortByValue(evt, condition, ".good__price");
	}
}


function getSortCondition(evt) {
	/* Checks condition of button (sorting increase or decrease logic) 	
		|	if asc == sorting increase
		|	if desc	== sorting decrease
	*/
	return evt.target.dataset.sortup;
}


function toggleSortCondition(evt) {
	if (evt.target.dataset.sortup == "asc") {
		evt.target.dataset.sortup = "desc";
	} else { // == "desc" or "dot"
		evt.target.dataset.sortup = "asc";
	}
}


function sortArrowRedraw(evt, condition) {
	// Arrow condition change //
	var uparrowStyleDisplay = 
		evt.target.parentElement.querySelector(".selection__arrow-up").style.display;
	var downarrowStyleDisplay = 
		evt.target.parentElement.querySelector(".selection__arrow-down").style.display;
	var dotStyleDisplay = 
		evt.target.parentElement.querySelector(".selection__dot").style.display;
	
	dotStyleDisplay = "none";

	if (condition == "asc") { // == arrow down
		uparrowStyleDisplay = "inline-block";
		downarrowStyleDisplay = "none";
	} else { // == arrow up or dot
		uparrowStyleDisplay = "none";
		downarrowStyleDisplay = "inline-block";
	} 

	evt.target.parentElement.querySelector(".selection__arrow-up").style.display 
		= uparrowStyleDisplay;

	evt.target.parentElement.querySelector(".selection__arrow-down").style.display
		= downarrowStyleDisplay;

	evt.target.parentElement.querySelector(".selection__dot").style.display
		= dotStyleDisplay;
}


function sortByValue(evt, condition, nameofClass) {
	// Sorting goods by alphabet //
	var items = Array.from(document.getElementsByClassName("good__item"));
	var values = [];

	items.forEach(function(item) {
		var itemName = item.querySelector(nameofClass).textContent;

		values.push(itemName);
	});

	if (condition == "asc") { 
		values = values.sort();
	} else {
		values = values.sort().reverse();
	}

	items.forEach(function(item) {
		var itemName = item.querySelector(nameofClass).textContent;

		for (var value of values) {
			if (itemName == value) {
				// set order in flex container according to index of sorted suitable value
				item.style.order = values.indexOf(value);	
			}
		}
	});
}
