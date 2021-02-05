/* API for generating articles in blog's news blocks. */

class Article {
	/* 
	Origin article class.

	Options:
		>> href -- a reference for article
		>> type -- type of article (ex. "vertical-noimg")

	Methods:
		>> constructor({href, type}) -- creates article with given parameters
		>> put()
	*/
	static ARTICLE_TAG = "a"
	static ARTICLE_BASIC_CLASS = "article"
	static ARTICLE_TYPE_PREFIX = "article_type_"
	
	constructor(options) {
		this.position = {}
		this.href = options.href
		this.type = options.type 
		this.fullType = Article.ARTICLE_TYPE_PREFIX + this.type

		this.articleObj = 
			this.assemblyElement({
				tag: Article.ARTICLE_TAG, 
				classes: [Article.ARTICLE_BASIC_CLASS, this.fullType],
				href: this.href
			})
	}

	assemblyElement({tag, classes = null, text = null, URL = null, href = null} = {}) {
		/* Assembles an element with all given parameters as DOM object and returns it. */
		const element = document.createElement(tag)

		if (classes != null) {
			classes.forEach(className => element.classList.add(className))
		}
		
		if (text != null) {
			element.textContent = text
		}
		
		if (URL != null) {
			element.src = URL
		}	

		if (href != null) {
			element.href = href
		}

		return element
	}

	put({block, column, subcolumn = ""}) {
		/*
		Puts an article to certain position.

		Options:
			>> block -- block, where article will be placed (ex. "hs")
			>> column -- column of block (ex. "col2")
			>> [subcolumn = null] -- sub-column of column (ex. "left")
		*/

		this.position.block = block
		this.position.column = column
		this.position.subcolumn = subcolumn

		// remove old version
		if (this.parentBlock != undefined) {
			parentBlock.removeChild(articleObj)
		}

		// remove old class
		if (this.positionClass != undefined) {
			this.articleObj.classList.remove(positionClass)
		}
		
		// create new class path
		this.positionClass = 
			this.position.block + "-" + this.position.column + "__" + Article.ARTICLE_BASIC_CLASS

		this.articleObj.classList.add(this.positionClass)

		// create BEM selector
		let classSelector = "." + block + "-" + column

		if (subcolumn != "") {
			classSelector +=  "__" + subcolumn
		}

		this.parentBlock = document.querySelector(classSelector)

		this.parentBlock.appendChild(this.articleObj)
	}
}


class ArticleBasic extends Article {
	/* 
	Basic realisation of article which can have title, description(dscr) and image.
	Is children of basic class Article.

	Options:
		Parent:
		>> href -- a reference for article
		>> type -- type of article (ex. "vertical-noimg")
		====
		Children:
		>> [title] -- main text of article
		>> [dscr] -- description
		>> [imgURL] -- URL of image which be presented in article's body
	*/

	static TITLE_TAG = "h3"
	static DSCR_TAG = "p"
	static IMG_TAG = "img"

	static NO_DSCR_PROVIDED_TYPES = ["main-stretchimg"]

	static TITLE_CLASS = Article.ARTICLE_BASIC_CLASS + "__" + "title"
	static DSCR_CLASS = Article.ARTICLE_BASIC_CLASS + "__" + "dscr"
	static IMG_CLASS = Article.ARTICLE_BASIC_CLASS + "__" + "img"
 
	constructor(options) {
		super(options)

		if (options.title == undefined || options.title== "") {
			this.title = ""
			this.hasTitle = false
		} else {
			this.title = options.title
			this.hasTitle = true
		}

		if (options.dscr == undefined || options.dscr == "" || ArticleBasic.NO_DSCR_PROVIDED_TYPES.includes(this.type)) {
			this.dscr = ""
			this.hasDscr = false
		} else {
			this.dscr = options.dscr
			this.hasDscr = true
		}

		if (options.imgURL == undefined || options.imgURL == "" || this.type.includes("noimg")) {
			this.imgURL = ""
			this.hasImg = false
		} else {
			this.imgURL = options.imgURL
			this.hasImg = true
		}
		
		//- Assembly -//
		this.titleObj = 
			this.assemblyElement({
				tag: ArticleBasic.TITLE_TAG, 
				classes: [ArticleBasic.TITLE_CLASS],
				text: this.title
			})

		this.dscrObj = 
			this.assemblyElement({
				tag: ArticleBasic.DSCR_TAG, 
				classes: [ArticleBasic.DSCR_CLASS],
				text: this.dscr
			})

		this.imgObj = 
			this.assemblyElement({
				tag: ArticleBasic.IMG_TAG, 
				classes: [ArticleBasic.IMG_CLASS],
				URL: this.imgURL
			})
		//--//

		const childrenArr = []

		if (this.hasTitle) {
			childrenArr.push(this.titleObj)
		}

		if (this.hasDscr) {
			childrenArr.push(this.dscrObj)
		}

		if (this.hasImg) {
			childrenArr.push(this.imgObj)
		}

		childrenArr.forEach(obj => this.articleObj.appendChild(obj))
	}
}


class ArticleQuote extends Article {
	/* 
	Quote-based article, which have quote text, author name and img and additional images.

	Options:
		Parent:
		>> href -- a reference for article
		>> type -- type of article (ex. "vertical-noimg")
		====
		Children:
		>> [quote] -- main text of quote
		>> [author] -- name of author
		>> [authorImgURL] -- img of author
		>> [mainImgURL] -- URL of main image
		& Note! If you set mainImgURL, article will separate into two columns and receive ...
		... type MAIN_TYPE.
	*/

	static MAIN_TYPE = "quote-main"
	static MAIN_SUBCOLUMNS = {
		left: Article.ARTICLE_BASIC_CLASS + "__" + "left",
		right: Article.ARTICLE_BASIC_CLASS + "__" + "right"
	}

	static NO_AUTHOR_CONTAINER_TYPES = ["quote-small"]
	static NO_IMG_TYPES = ["quote-small"]

	static QUOTE_TAG = "h4"
	static AUTHOR_TAG = "p"
	static AUTHOR_IMG_TAG = "img"
	static MAIN_IMG_TAG = "img"

	static AUTHOR_CONTAINER_CLASSNAMES = {
		main: Article.ARTICLE_BASIC_CLASS + "__" + "author-container",
		sub: Article.ARTICLE_BASIC_CLASS + "-" + "author"
	}
	static QUOTE_CLASS = Article.ARTICLE_BASIC_CLASS + "__" + "quote"
	static AUTHOR_CLASS = ArticleQuote.AUTHOR_CONTAINER_CLASSNAMES.sub + "__" + "name"
	static AUTHOR_CLASS_SMALL = Article.ARTICLE_BASIC_CLASS + "__" + "author" + "-" + "name"
	static AUTHOR_IMG_CLASS = ArticleQuote.AUTHOR_CONTAINER_CLASSNAMES.sub + "__" + "img"
	static MAIN_IMG_CLASS = Article.ARTICLE_BASIC_CLASS + "__" + "img"
 
	constructor(options) {
		super(options)

		if (options.quote == undefined || options.quote== "") {
			this.quote = ""
			this.hasQuote = false
		} else {
			this.quote = options.quote
			this.hasQuote = true
		}

		if (options.author == undefined || options.author == "") {
			this.author = ""
			this.hasAuthor = false
		} else {
			this.author = options.author
			this.hasAuthor = true
		}

		if (options.authorImgURL == undefined || options.authorImgURL == "" || ArticleQuote.NO_IMG_TYPES.includes(this.type)) {
			this.authorImgURL = ""
			this.hasAuthorImg = false
		} else {
			this.authorImgURL = options.authorImgURL
			this.hasAuthorImg = true
		}

		if (options.mainImgURL == undefined || options.mainImgURL == "") {
			this.mainImgURL = ""
			this.hasMainImg = false
		} else {
			if (this.type != ArticleQuote.MAIN_TYPE) {
				throw Error(`Article with title: "${this.title}", was given a main image URL and hasn't set to quote-main type.`)
			}

			this.mainImgURL = options.mainImgURL
			this.hasMainImg = true
		}

		//- Assembly -//
		this.quoteObj = 
			this.assemblyElement({
				tag: ArticleQuote.QUOTE_TAG, 
				classes: [ArticleQuote.QUOTE_CLASS],
				text: this.quote
			})

		if (!ArticleQuote.NO_AUTHOR_CONTAINER_TYPES.includes(this.type)) {
			this.authorContainerObj = 
				this.assemblyElement({
					tag: "div", 
					classes: [
						ArticleQuote.AUTHOR_CONTAINER_CLASSNAMES.main, 
						ArticleQuote.AUTHOR_CONTAINER_CLASSNAMES.sub
					]
				})
			}

		let finalAuthorClasses = []

		if (ArticleQuote.NO_AUTHOR_CONTAINER_TYPES.includes(this.type)) {
			finalAuthorClasses.push(ArticleQuote.AUTHOR_CLASS_SMALL)
		} else {
			finalAuthorClasses.push(ArticleQuote.AUTHOR_CLASS)
		}

		this.authorObj = 
			this.assemblyElement({
				tag: ArticleQuote.AUTHOR_TAG, 
				classes: [finalAuthorClasses],
				text: this.author
			})

		this.authorImgObj = 
			this.assemblyElement({
				tag: ArticleQuote.AUTHOR_IMG_TAG, 
				classes: [ArticleQuote.AUTHOR_IMG_CLASS],
				URL: this.authorImgURL
			})

		this.mainImgObj = 
			this.assemblyElement({
				tag: ArticleQuote.MAIN_IMG_TAG, 
				classes: [ArticleQuote.MAIN_IMG_CLASS],
				URL: this.mainImgURL
			})
		//--//

		let childrenArr = []

		if (ArticleQuote.NO_AUTHOR_CONTAINER_TYPES.includes(this.type)) {
			
			if (this.authorImgURL == undefined || this.mainImgURL == undefined) {
				console.warn(`Article with quote: "${this.quote}", was given an image URL and has set to quote-small type, which doesn't support images.`)
			}

			if (this.hasQuote) {
				childrenArr.push(this.quoteObj)
			}

			if (this.hasAuthor) {
				this.authorObj.textContent = "- " + this.author
				this.authorObj.text = this.authorObj.textContent
				childrenArr.push(this.authorObj)
			}
		} else {
			if (this.hasAuthor) {
				this.authorContainerObj.appendChild(this.authorObj)
			}

			if (this.hasAuthorImg) {
				this.authorContainerObj.appendChild(this.authorImgObj)
			}

			if (this.type == ArticleQuote.MAIN_TYPE) {
				const leftCol = document.createElement("div")
				const rightCol = document.createElement("div")
				leftCol.classList.add(ArticleQuote.MAIN_SUBCOLUMNS.left)
				rightCol.classList.add(ArticleQuote.MAIN_SUBCOLUMNS.right)

				if (this.hasQuote) {
					leftCol.appendChild(this.quoteObj)
				}

				if (this.hasAuthor || this.hasAuthorImg) {
					leftCol.appendChild(this.authorContainerObj)
					this.authorImgObj.style.order = -1
				}

				rightCol.appendChild(this.mainImgObj)

				childrenArr = [leftCol, rightCol]
			} else {
				if (this.hasQuote) {
					childrenArr.push(this.quoteObj)
				}
				
				if (this.hasAuthor || this.hasAuthorImg) {
					childrenArr.push(this.authorContainerObj)
				}
			}
		}

		childrenArr.forEach(obj => this.articleObj.appendChild(obj))
	}		
}


function generateNews() {
	/* There is a full prototype pattern for all three news block - hs, sp, op. */

	new ArticleBasic({
		href: "#",
		type: "main", 
		title: "Реактор взорвался",
		dscr: "На ядерной станции, которая питала нашу любимую деревню, произошла критическая авария. Всё население было вынуждено покинуть место жительства.",
		imgURL: "images/news/nuclear-meltdown.jpg"
	}).put({
		block: "hs",
		column: "col2"
	})

	new ArticleBasic({
		href: "#",
		type: "horizontal-img", 
		title: "Новые меры безопасности",
		dscr: "В связи с последней аварией, ядерный регламент будет ужесточён.",
		imgURL: "images/news/nuclear-plant-v2.png"
	}).put({
		block: "hs",
		column: "col2"
	})

	new ArticleBasic({
		href: "#",
		type: "horizontal-img", 
		title: "Великое переселение",
		dscr: "В результате катастрофы жители Warmland отправились в великий поход на новые земли.",
		imgURL: "images/news/village.jpg"
	}).put({
		block: "hs",
		column: "col2"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-img", 
		title: "Клуб археологов",
		dscr: "Записывайтесь в клуб любителей артефактов и секретов. Бесплатная лопата при подписании хартии!",
		imgURL: "images/news/forest-villagers.png"
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "left"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Помидорный обман",
		dscr: "Помидоры марки 'Боб и друзья' оказались радиоактивными."
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "left"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Прорыв",
		dscr: "Исследователи национального университета Большого ботинка изобрели удобную ложку для обуви."
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "left"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Пивное безумие",
		dscr: "Мужчина получил многочисленные ушибы, пытаясь достать ящик с пивом."
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "right"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Диванный клуб",
		dscr: "В клуб любителей посидеть привезли два новых дивана."
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "right"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Научный провал",
		dscr: "Учёный пытался открыть философский камень, но получился королевский слайм."
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "right"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Вторжение",
		dscr: "Огромная армия королевских слаймов захватила восточное побережье."
	}).put({
		block: "hs",
		column: "col3",
		subcolumn: "right"
	})

	new ArticleBasic({
		href: "#",
		type: "main-stretchimg", 
		title: "Радиация - как спастись или как приобщиться",
		imgURL: "images/news/nuclear-plant.png"
	}).put({
		block: "sp",
		column: "col2",
		subcolumn: "top"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-img", 
		title: "Вкусная картошка",
		dscr: "Выращивание картошки у себя в подвале. Иллюзия или реальность? Рассказывает главный фермер деревни.",
		imgURL: "images/news/potato-farm.png"
	}).put({
		block: "sp",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Нападение пингвинов",
		dscr: "Основные правила выживания в ледяной клетке."
	}).put({
		block: "sp",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Забор: делаем правильно",
		dscr: "Подробные инструкции по постройке забора."
	}).put({
		block: "sp",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Большая морковь",
		dscr: "Специалист с портала carrothub рассказывает о главных правилах успешных агрономов."
	}).put({
		block: "sp",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-noimg", 
		title: "Вкусные зелья",
		dscr: "Приготовление зелий у себя дома. Опасно ли это? Рассказывает безумный химик Игорь."
	}).put({
		block: "sp",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleBasic({
		href: "#",
		type: "vertical-big", 
		title: "Главные овощи этого сезона - подробный гайд от председателя колхоза",
		dscr: "Говоря про овощи, важно отметить, что сегодня, в завтрашний день, не все могут объективно оценивать эту проблему рационально, вернее, мало кто может это делать. Таким образом, овощепроизводство, или, как говорила моя бабушка, овощевыращивание, содержит в себе очень много тонкостей, которые нужно учитывать. Что нужно в первую очередь для любого овоща? Конечно же, вода. А вода, знаете ли, не в километрах измеряется. Это расстояние измеряется в километрах, или вернее даже в часах. А овощи, они как жизнь - важно не упустить свою возможность, и не проспать момент, как говорил мой дед. Поэтому главный совет - поливайте вашу картошку каждый день, а капусту, как минимум, два раза в неделю. Что касаемо удобрений...",
		imgURL: "images/event-wheat.png"
	}).put({
		block: "sp",
		column: "col3"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-main", 
		quote: "Мне приснился сон, где мой огромный летающий бункер уничтожал всех смертоносным лазером... и ты там тоже был!",
		author: "Адольф",
		authorImgURL: "images/news/authors/hitler.png",
		mainImgURL: "images/news/flying-bunker.jpg"
	}).put({
		block: "op",
		column: "col2",
		subcolumn: "top"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-basic", 
		quote: "Скоро, с вашими так называемыми реакторами, вся наша деревня превратится в радиоактивное болото!",
		author: "Семён",
		authorImgURL: "images/news/authors/semen.png"
	}).put({
		block: "op",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-basic", 
		quote: "В школе меня называли сказочником, а я вырос и построил себе огромный дом на окраине деревни!",
		author: "Боб",
		authorImgURL: "images/news/authors/bob.png"
	}).put({
		block: "op",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-basic", 
		quote: "Что касается моей огромной тюрьмы на горе? Там нет пленных, только предатели.",
		author: "Иосиф",
		authorImgURL: "images/news/authors/stalin.png"
	}).put({
		block: "op",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-basic", 
		quote: "Заходите в мой БОЛЬШОЙ магазин мои праведные друзья!",
		author: "Мухаммед",
		authorImgURL: "images/news/authors/muhammad.png"
	}).put({
		block: "op",
		column: "col2",
		subcolumn: "bot"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-small", 
		quote: "Эх, сальца бы хорошего сейчас. С черным хлебушком. Да с чесночком!",
		author: "Сталкер"
	}).put({
		block: "op",
		column: "col3"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-small", 
		quote: "Когда я говорю о фарме незерита, я имею в ввиду пару сундуков за 10 минут.",
		author: "Слоупок"
	}).put({
		block: "op",
		column: "col3"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-small", 
		quote: "Я построил свой дом во всех локациях! Ну и кто смеётся теперь?",
		author: "Тодд"
	}).put({
		block: "op",
		column: "col3"
	})

	new ArticleQuote({
		href: "#",
		type: "quote-small", 
		quote: "Мы три часа летели, и наконец мы сели, туда куда хотели, на пляжный островок.",
		author: "Александр П."
	}).put({
		block: "op",
		column: "col3"
	})
}


//
/* Gives information about maintenance on page if it doesn't support this resoulition */

const resolution = window.screen.width * window.devicePixelRatio
const resolutionPoint = 1250
const maintenanceMessageText = "Ой... Страница в разработке для вашего разрешения. Но пока что можете посмотреть как Стив играет с пёсиком."
const maintenanceImgURL = "images/steeve-dog.jpg"

if (resolution < resolutionPoint) {
	const newsInner = document.querySelector(".news__inner")
	newsInner.innerHTML = ""

	const maintenanceContainer = document.createElement("div")
	const maintenanceMessage = document.createElement("p")
	const maintenanceImg = document.createElement("img")

	maintenanceContainer.classList.add("maintenance")
	maintenanceMessage.classList.add("maintenance__message")
	maintenanceImg.classList.add("maintenance__img")

	maintenanceMessage.textContent = maintenanceMessageText
	maintenanceImg.src = maintenanceImgURL

	maintenanceContainer.appendChild(maintenanceMessage)
	maintenanceContainer.appendChild(maintenanceImg)
	newsInner.appendChild(maintenanceContainer)
} else {
	generateNews()
}




