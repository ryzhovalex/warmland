var nav = document.getElementById('headnav');
var navitems = document.getElementsByClassName('headitem');
var burger = document.getElementById('burger');
var navitemFirst = document.getElementById('navitem-first');


burger.onclick = function() {
	if (nav.classList.contains('nav_show_popup')) {
		nav.classList.remove('nav_show_popup');
		nav.classList.add('nav_show_general');
		for (var item of navitems) {
			item.style.display = 'inline-block';
		}
	} else {
		nav.classList.add('nav_show_popup');
		nav.classList.remove('nav_show_general');
		for (var item of navitems) {
			item.style.display = 'block';
		}
	}
}