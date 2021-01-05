/* Script for order sections of all goods.
Does: 
	- drawing all prices at the page's loading
	- describes order's amount-input increment and decrement logic
*/

// Draw all prices according to their default values //
var pricesArray =
	Array.from(document.getElementsByClassName("price__value"));

pricesArray.forEach(function(price) {
	price.textContent = price.dataset.price;
});


// Add events for each amount input //
var amountsArray = 
	Array.from(document.getElementsByClassName("order-form__amount"));

amountsArray.forEach(function(amount) {
	amount.addEventListener("change", priceChangeController);
	amount.addEventListener("keyup", priceChangeController);
});



function priceChangeController(evt) {
	/* Controls price value and calls appropriate functions for
	manupulation with it. */
	let inputObject = evt.target;
	let priceObject = inputObject.parentElement.parentElement
		.querySelector(".price__value");
	let inputMaxValue = parseInt(inputObject.getAttribute("max"));
	let priceDefaultPrice = parseInt(priceObject.dataset.price);
	
	if (inputObject.value == "" || 
		parseInt(inputObject.value) > inputMaxValue) 
	{
		orderRestoreDefaultValues(
			inputObject, priceObject, priceDefaultPrice);
	} else {
		priceChangeValue(inputObject, priceObject, priceDefaultPrice);
	}
}


function priceChangeValue(input, priceObject, priceDefaultPrice) {
	/* Change value of price according to amount of input value. */
	let priceCurrentPrice = priceDefaultPrice * parseInt(input.value);
	priceObject.textContent = priceCurrentPrice;
}


function orderRestoreDefaultValues
	(inputObject, priceObject, priceDefaultPrice) {
	/* Reset value of input and price to default ...
	... if it is empty string. */
	priceObject.textContent = priceDefaultPrice;
	inputObject.value = "1";
}

