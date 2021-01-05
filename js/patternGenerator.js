/* Pattern generator for a page. */

const HEADER_PATTERN =
		`
		<div class="header__inner container1000">
			<div class="title">
				<div class="title__logo">
					<img src="images/logo-hoe.png" alt="hoe" width="60px" height="60px">
				</div>
				<div class="title__content">
					<a href="index.html">WarmLand</a>
				</div>
			</div>
			<div class="burger" id="burger"></div>
			<nav class="nav nav_show_general" id="headnav">
				<a href="index.html" class="nav__item headitem">Домой</a>
				<a href="market.html" class="nav__item headitem">Рынок</a>
				<a href="blog.html" class="nav__item headitem">Новости</a>
				<a href="about.html" class="nav__item headitem">О нас</a>
			</nav>
			<div class="connect">
				<p class="connect__content" onclick="clickCopy('ho.mcplay.in:25632')">	
					ho.mcplay.in:25632
					<span class="popup-content" id="connectPopup">Скопировано в буфер обмена.</span>
				</p>	
			</div>
		</div>
		`
const FOOTER_PATTERN =
		`
		<div class="footer">
			<div class="footer__inner container1600">
				<div class="footer__left">
					<div class="footer__logo title__content">Warmland</div>
					<p class="footer__dscr">Лучшее погружение в мир vanilla и industrial minecraft. Подключайся к нам, будем собирать пшеницу вместе!</p>
				</div>

				<div class="footer__right">
					<nav class="nav nav-bot">
						<a href="#" class="nav__item">Домой</a>
						<a href="market.html" class="nav__item">Рынок</a>
						<a href="blog.html" class="nav__item">Новости</a>
						<a href="about.html" class="nav__item">О нас</a>
					</nav>
					<div class="footer__right-bot">
						<div class="footer__contact contacts">
							<div class="contacts__item">
								<a href="https://discord.gg/5kg2fZyF" class="discord-href" id="discord-href">
									<img src="images/icons/discord.png" alt="" class="discord-href__img" width="48px" height="48px">
								</a>
							</div>
						</div>
						<p class="footer__powered">Powered by: Creeper International</p>
					</div>
				</div>
			</div>
		</div>	
		`


function generateBodyPattern(pattern, parent_tag, position) {
	let generatedElement = document.createElement(parent_tag)
	let pageBody = document.querySelector("body")
	generatedElement.innerHTML = pattern

	// add tag class //
	if (parent_tag == "header") {
		generatedElement.classList.add("header__wrapper")
	}

	// inserting //
	if (position == "first") {
		pageBody.insertBefore(generatedElement, pageBody.childNodes[0])
	} else if (position == "last") {
		pageBody.appendChild(generatedElement)
	}
}

generateBodyPattern(HEADER_PATTERN, "header", "first")
generateBodyPattern(FOOTER_PATTERN, "footer", "last")

