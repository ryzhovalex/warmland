/* Script which displays actual date within DOM element .datetime */

const weekday = document.getElementById("weekday")
const day = document.getElementById("day")
const month = document.getElementById("month")
const year = document.getElementById("year")

const today = new Date()

const WEEKDAYS_MAP = new Map([
	[0, "Воскресенье"],
	[1, "Понедельник"],
	[2, "Вторник"],
	[3, "Среда"],
	[4, "Четверг"],
	[5, "Пятница"],
	[6, "Суббота"]
])

const DATES_MAP = new Map([
	[0, "Января"],
	[1, "Февраля"],
	[2, "Марта"],
	[3, "Апреля"],
	[4, "Мая"],
	[5, "Июня"],
	[6, "Июля"],
	[7, "Августа"],
	[8, "Сентября"],
	[9, "Октября"],
	[10, "Ноября"],
	[11, "Декабря"]
])

weekday.textContent = WEEKDAYS_MAP.get(today.getDay())
day.textContent = today.getDate()
month.textContent = DATES_MAP.get(today.getMonth())
year.textContent = today.getFullYear()



