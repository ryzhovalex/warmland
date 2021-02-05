var popupTimer;

//copy on click
function clickCopy(str) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);

	var popup = document.getElementById("connectPopup");
	var isShowed = popup.classList.contains("connect__content_show");
	//if isn't showing now, prevention of multiply clicks
	if (!isShowed) {
		clearTimeout(popupTimer);
		changePopup();
		popupTimer = setTimeout(changePopup, 4000);
	}
}

//popup window
function changePopup() {
	unhidePopup();
	var popup = document.getElementById("connectPopup");
	var isShowed = popup.classList.contains("connect__content_show");

	if (isShowed) {
		popup.classList.remove("connect__content_show");
		popup.classList.add("connect__content_hide");
		//REFACTOR - 1000 it is a fade animation time (990 for debug)
		//maybe it is better to convert all animations and operations to js from css
		//or move ALL visibility changing to js from css
		popupTimer = setTimeout(hidePopup, 990);
	} else {
		popup.classList.remove("connect__content_hide");
		popup.classList.add("connect__content_show");
	}
}

function hidePopup() {
	var popup = document.getElementById("connectPopup");
	popup.style.visibility = "hidden";
}

function unhidePopup() {
	var popup = document.getElementById("connectPopup");
	popup.style.visibility = "visible";
}
