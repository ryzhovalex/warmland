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
		
		/* //!// Throw it to children classes 
		this.hasQuote = false
		this.hasAuthor = false
		this.hasExtra = false
		this.hasBack = false
		*/

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

		if (options.dscr == undefined || options.dscr == "") {
			this.dscr = ""
			this.hasDscr = false
		} else {
			this.dscr = options.dscr
			this.hasDscr = true
		}

		if (options.imgURL == undefined || options.imgURL == "") {
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

		if (options.authorImgURL == undefined || options.authorImgURL == "") {
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
				throw Error(`Article: ${this.articleObj}, was given a main image URL and hasn't set to quote-main type.`)
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
			console.warn(`Article: ${this.articleObj}, was given an image URL and has set to quote-small type, which doesn't support images.`)

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


/////////////////
a = new ArticleQuote({
	href: "#",
	type: "quote-basic", 
	quote: "Я всегда любил молоко",
	author: "Иосиф",
	authorImgURL: "images/event-wheat2.jpg"
})

a.put({
	block: "hs",
	column: "col3",
	subcolumn: "left"
})

