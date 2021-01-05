/* Goods searching, sorting and filtering logic.
Provides all user's manupulating with good's list and chaining them together.
*/

// Search & Filter Scenario //

var search = document.getElementById("market-search");
var searchDefaultName = "search";
var itemList = document.getElementById("good-list");
var cross = document.getElementById("search-clear");
var items = itemList.getElementsByClassName("good__item");
var itemsArray = Array.from(items);
var notfoundMsg = document.getElementById("good-not-found-msg");

var typeFilter = document.getElementById("type-filter");

search.addEventListener('keyup', searchController);
typeFilter.addEventListener("change", searchController);

search.addEventListener('focus', searchClearDefault);
search.addEventListener('blur', searchRecoverDefault);
cross.addEventListener('click', searchClear);


function filterAndSearchItems(searchText, filterValue) {
	/* Manipulate goods according to search's and filter's inputs */

	var searchText = getSearchLoweredText();
	var filterOption = getCurrentFilterOption();

	itemsArray.forEach(function(item) {
		var itemName = item.querySelector(".good__name").textContent;
		var itemNameTextFound = itemName.toLowerCase().indexOf(searchText);

		// if search field is not used or coincidence with good name
		var hasSuitName = 
			searchText == "" || 
			searchText == searchDefaultName || 
			itemNameTextFound != -1;

		var hasSuitFilter = 
			item.dataset.filter == filterOption.value || filterOption.value == 'all';

		if (hasSuitName & hasSuitFilter) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
}


function searchController(evt) {
	/* 	
		Manipulates items after searching and/or filtering changings. 
	*/

	var text = getSearchLoweredText(); 
	let hasToShowCross = 
		text != '' &  
		search.style.color == "white";

	// cross appearing logic
	if (hasToShowCross) {
		crossShow();
	} else {
		crossHide();
	}

	filterAndSearchItems();
	notfoundMsgHandler();
}


function notfoundMsgHandler() {
	// Shows not found message if it needs. Void. //
	let noMatches = true;

	itemsArray.forEach(function(item) {
		if (item.style.display == "flex" & noMatches) {
			noMatches = false;
		}
	});

	if (noMatches) {
		notfoundMsg.style.display = "block";
	} else {
		notfoundMsg.style.display = "none";
	}
}


function crossShow() {
	// Shows cross. Void. //
	cross.style.display = "inline-block";
}


function crossHide() {
	// Hides cross. Void. //
	cross.style.display = "none";
}


function searchClear(evt) {
	// Just clears value of event-target //
	search.value = searchDefaultName;
	search.style.color = "rgba(255,255,255,0.3)";

	searchController();
}


function searchClearDefault(evt) {
	if (evt.target.style.color != "white") {
		evt.target.value = "";
		evt.target.style.color = "white";
	}
}


function searchRecoverDefault(evt) {
	if (evt.target.value == "") {
		evt.target.value = searchDefaultName;
		evt.target.style.color = "rgba(255,255,255,0.3)";
	} 
}


function getSearchLoweredText() {
	return search.value.toLowerCase();
}


function getCurrentFilterOption() {
	return typeFilter.options[typeFilter.selectedIndex];
}


// Sorting Scenario //
var sortName = document.getElementById("sort-name");
var sortPrice = document.getElementById("sort-price");

sortName.addEventListener('click', sortHandler);
sortPrice.addEventListener('click', sortHandler);


function sortHandler(evt) {
	// External level of sorting programm //
	dotReturn(evt);
	var condition = getSortCondition(evt);
	sortArrowRedraw(evt, condition);
	toggleSortCondition(evt);
	condition = getSortCondition(evt);

	
	if (evt.target.id == "sort-name") {
		sortByValue(evt, condition, ".good__name");
	} else if (evt.target.id == "sort-price") {
		sortByValue(evt, condition, ".price__value");
	}
}


function dotReturn(evt) {
	// Toggle and redraw all sorters except event sorter to dots. Void. //

	var sorters = document.getElementsByClassName("selection__btn_type_sort");

	Array.from(sorters).forEach(function (sorter) {
		if (sorter != evt.target) {
			/* REFACTOR: bad, bad, bad!!
			Need some way to merge with sortArrowRedraw and
			maybe do iterate list of sorters and do toggle and redraw simultaneously...
			*/
			sorter.dataset.sortup = "none";

			sorter.parentElement.querySelector(".selection__arrow-up").style.display 
				= "none";

			sorter.parentElement.querySelector(".selection__arrow-down").style.display
				= "none";

			sorter.parentElement.querySelector(".selection__dot").style.display
				= "inline-block";
		}
	});
}


function getSortCondition(evt) {
	/* Checks condition of button (sorting increase or decrease logic) 	
		|	if asc == increase sorting 
		|	if desc	== decrease sorting 
		|	if none == no sorting
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

	var uparrowStyleDisplay, downarrowStyleDisplay;

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
		= "none"; // hide dot for target button
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