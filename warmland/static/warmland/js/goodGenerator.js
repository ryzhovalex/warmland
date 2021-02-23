/* API for generating goods in the market */

function createNewGood(type, imgURL, name, description, 
						price, isHotOffer=false, hotOfferDiscount=0) {

	if (description.length > 72) {
		console.warn(`Too long description at '${name}' with image '${imgURL}', small resolution render may be incorrect.`)
	}

	const ITEM_PATTERN =
		`
		<div class="good__left-col">
			<img src=${'/images/goods/' + imgURL} class="good__img">
		</div>
		<div class="good__right-col">
			<h3 class="good__name">${name}</h3>
			<p class="good__description">${description}</p>
			<div class="good__price">
				<form action="URL" class="good__order-form order-form">
					<input type="submit" href="#" class="order-form__btn btn" value="Заказ">
					<input type="number" class="order-form__amount" min="1" max="100" value="1">
				</form>
				<span class="good__price-info price">
					<b class="price__value" data-price="${price}"></b>
					<img src="images/icons/coin.png" class="price__img">
				</span>
			</div>
		</div>	
		`
	const SERVICE_PATTERN =
		`
		<div class="good__left-col">
			<img src="${'images/goods/' + imgURL}" class="good__img">
		</div>
		<div class="good__right-col">
			<h3 class="good__name">${name}</h3>
			<p class="good__description">${description}</p>
			<div class="good__price good__price_service">
				<form action="URL" class="good__order-form order-form order-form_service">
					<input type="submit" href="#" class="order-form__btn btn" value="Заказ">
				</form>
				<span class="good__price-info price">
					<b class="price__value" data-price="${price}"></b>
					<img src="images/icons/coin.png" class="price__img">
				</span>
			</div>
		</div>	
		`
	const HOTOFFER_PATTERN =
		`
		<p class="hot-offer__discount">-${hotOfferDiscount}%</p>
		<img class="hot-offer__img" src="images/icons/hot-offer-present.png" alt="Hot offer!">
		`

	let newGood = document.createElement("div")
	newGood.classList.add("good__item")
	newGood.dataset.filter = type
	newGood.dataset.hotoffer = isHotOffer

	// Inner HTML changings //
	if (type == "service") {
		newGood.innerHTML = SERVICE_PATTERN
	} else {
		newGood.innerHTML = ITEM_PATTERN
	}

	// Hot Offer adaptation //
	if (isHotOffer) {
		// create hot offer title and icon container
		let hotOfferIcon = document.createElement("div")
		hotOfferIcon.classList.add("hot-offer")
		hotOfferIcon.innerHTML = HOTOFFER_PATTERN

		// add color to good's name
		newGood.querySelector(".good__name").style.color = "orange"

		newGood.appendChild(hotOfferIcon)

		// create hot offer crossed old price
		let priceCross = newGood.querySelector(".good__price-info").cloneNode(true)
		let newGoodPrice = newGood.querySelector(".good__price")

		priceCross.classList.remove("good__price-info")
		priceCross.classList.add("good__price-info-crossed")

		const priceCrossPriceValue = priceCross.querySelector(".price__value") 
		priceCrossPriceValue.classList.remove("price__value")
		priceCrossPriceValue.classList.add("price__value-crossed")

		newGoodPrice.appendChild(priceCross)

		// calculate new price //
		let newGoodDiscountPrice = newGood.querySelector(".price__value").dataset.price

		newGoodDiscountPrice = 
			parseInt(Math.ceil(newGoodDiscountPrice - (newGoodDiscountPrice * hotOfferDiscount / 100)))

		newGood.querySelector(".price__value").dataset.price = newGoodDiscountPrice
	}

	let goodsList = document.getElementById("good-list")
	goodsList.appendChild(newGood)
}


function createGoodList() {
	createNewGood(
		'food', 'food-bread.png', 'Хлеб', 
		'Вкусный и свежий хлеб! Теперь на 99% без плесени.', 
		2, true, 50)
	createNewGood(
		'food', 'food-fish.png', 'Рыба', 
		'Рыба из сточных вод ядерного реактора. Имеет специфичный вкус.', 
		2)
	createNewGood(
		'food', 'food-steak.png', 'Стейк', 
		'Хорошо прожаренный стейк из термоядерной печи', 
		3)
	createNewGood(
		'food', 'food-cake.png', 'Торт', 
		'Огро-о-омный торт с посыпкой и украшениями в виде паучьих глаз.', 
		5)
	createNewGood(
		'ingot', 'ingot-iron.png', 'Железо', 
		'Настоящий железный слиток!', 
		3)
	createNewGood(
		'ingot', 'ingot-gold.png', 'Золото', 
		'Выкапывалось узниками коммунистического лагеря.', 
		12, true, 40)
	createNewGood(
		'block', 'block-brick.png', 'Кирпичи', 
		'Произведено многочисленными любителями хоррор-игр!', 
		3)
	createNewGood(
		'material', 'material-bonemeal.png', 'Костная мука', 
		'Стала незаменимой на огороде с тех пор как фермеры отказались от навоза.', 
		8, true, 40)
	createNewGood(
		'service', 'service-help.png', 'Помощь на огороде', 
		'Ваш мирный сосед придёт на помощь, если сил полить грядку не осталось.', 
		20, true, 75)
}


function createHotOffersList() {
	createNewGood(
		'food', 'food-bread.png', 'Хлеб', 
		'Вкусный и свежий хлеб! Теперь на 99% без плесени.', 
		2, true, 50)
	createNewGood(
		'material', 'material-bonemeal.png', 'Костная мука', 
		'Стала незаменимой на огороде с тех пор как фермеры отказались от навоза.', 
		8, true, 40)
	createNewGood(
		'ingot', 'ingot-gold.png', 'Золото', 
		'Выкапывалось узниками коммунистического лагеря.', 
		12, true, 40)
	createNewGood(
		'service', 'service-help.png', 'Помощь на огороде', 
		'Ваш мирный сосед придёт на помощь, если сил полить грядку не осталось.', 
		20, true, 75)
}


// Generate goods according to current page //
let bodyId = document.querySelector("body").id

if (bodyId == "home") {
	createHotOffersList()
} else if (bodyId == "market") {
	createGoodList()
}

