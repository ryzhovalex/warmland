var slideIndex = 1;
showSlide(slideIndex);
var timerId;

// Next/previous controls
function plusSlide(n) {
	showSlide(slideIndex += n, true);
}

// Thumbnail image controls
function currentSlide(n) {
	showSlide(slideIndex = n, true);
}

function showSlide(n, userAction) {
	slideIndex = n;
	var i;
	var slides = document.getElementsByClassName("slide");
	var dots = document.getElementsByClassName("slider__dot");

	// Change image every certain time
	var nextSlide = slideIndex + 1;
	if (nextSlide > slides.length) {nextSlide = 1}
	if (nextSlide < 1) {nextSlide = slides.length}

	if (userAction == true) {
		console.log("user action");
		clearTimeout(timerId);
	} 
		
	timerId = setTimeout(showSlide, 15000, nextSlide, false);

	if (n > slides.length) {slideIndex = 1}

	if (n < 1) {slideIndex = slides.length}

	for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
	}

	for (i = 0; i < dots.length; i++) {
	  dots[i].className = dots[i].className.replace(" slider__dot_active", "");
	}

	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " slider__dot_active";
}