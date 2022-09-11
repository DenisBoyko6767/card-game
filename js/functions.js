//card action
export function cardAction() {
	//========================================================================================================================================================
	// ---init result game



	//========================================================================================================================================================
	// ---display alert
	const alerts = document.querySelectorAll('.alert');
	const buttonsAlert = document.querySelectorAll('.alert__body span');

	//провіряємо алєрти на класс ектів, якщо є, то локаєм скролл
	function alertLockScroll() {
		alerts.forEach(alert => {
			if (alert.classList.contains("_active")) {
				document.body.classList.add('_lock');
			}
		});
	}

	function alertRemoveLockScroll() {
		alerts.forEach(alert => {
			if (!alert.classList.contains("_active")) {
				document.body.classList.remove('_lock');
			}
		});
	}
	alertLockScroll();
	//Вішаємо подію на кожну кнопку
	buttonsAlert.forEach(button => {
		button.addEventListener('click', buttonAlertAction)
	});

	function buttonAlertAction() {
		alertRemoveLockScroll();
		generateNewPosition();
		this.parentElement.parentElement.classList.remove("_active");
	}

	function displayAlertForRestButton() {
		const alertAnim = document.querySelector('.alert-anim');

		alertAnim.classList.add('_active');
		setTimeout(() => {
			alertAnim.classList.remove('_active');
		}, 1000);
	}
	//========================================================================================================================================================
	// ---init active item
	const cards = document.querySelectorAll('.card__item'); // global variable
	const cardsParent = document.querySelector('.card__wrapper'); // global variable
	let touchCounter = 0; // global variable
	let complatedCounter = 0; // global variable
	let loseCounter = 0; // global variable
	let arrayCounter = 0; // global variable
	let ItemsArray = [];

	// подія на клік
	cardsParent.addEventListener('click', initCurrentCard)

	// головна функція ініциалізації
	function initCurrentCard(e) {
		let currentItem = e.target.closest('.card__item');

		// створення массиву з двох нажатих елементів
		ItemsArray.splice(arrayCounter,0,currentItem)
		// ліміт дотиків
		if (touchCounter < 2) {
			touchCounter++;
			// перевірка на однаковість
			if (currentItem == ItemsArray[1]) {
				touchCounter--;
				console.log('same');
			} else {
				console.log('not same');
				currentItem.classList.add('_active');
			}
		}
		//console.log(e.target.closest('.card__item'));
	}

	//========================================================================================================================================================
	//---generate random position for iamges-item when click reset button
	//
	const buttonReset = document.querySelector('.card__button');

	// подія на клік
	buttonReset.addEventListener('click', generateNewPosition);

	// головна функфія генерації
	function generateNewPosition(e) {
		// варіейбл 
		let cardImage = Array.from(document.querySelectorAll('.card__image'));
		let cardImageParent = Array.from(document.querySelectorAll('.card__item'));
		let newCardImageArray = []; // ссилочний тип масива

		// преревірка на четність + створення 2 масивів
		if (cardImage.length % 2 == 0) {
			let newHalfArrayOne = [] // ссилочний тип масива
			let newHalfArrayTwo = [] // ссилочний тип масива
			let counterForFirstArr = 0;
			let counterForSecondArr = 0;

			// ініціалізація 2 массивів по дата-айді
			cardImage.forEach(currentCardImg => {
				if (currentCardImg.getAttribute('data-id-animal') == '1') {
					newHalfArrayOne.splice(counterForFirstArr, 0, currentCardImg);
					counterForFirstArr++;
				} else if (currentCardImg.getAttribute('data-id-animal') == '2') {
					newHalfArrayTwo.splice(counterForSecondArr, 0, currentCardImg);
					counterForSecondArr++;
				}
			});
			//перемішення 2 створених масивів
			shuffle(newHalfArrayOne);
			shuffle(newHalfArrayTwo);

			// обйеднання 2 створених масивів в один
			newCardImageArray.splice(0, 0, ...newHalfArrayOne, ...newHalfArrayTwo);

			//вставляємо створені, рандомно згенеровані елементи в родича (newCardImageArray)
			cardImageParent.forEach((cardCurrentParent, index) => {
				cardCurrentParent.prepend(newCardImageArray[index]);
			});
		}

		if (this == buttonReset) {
			displayAlertForRestButton();
		}

	}
}
//========================================================================================================================================================









//========================================================================================================================================================
// ---help functions
function shuffle(arr) {
	var j, temp;
	for (var i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
//========================================================================================================================================================













//========================================================================================================================================================
export function popup() {
	let popup_link = document.querySelectorAll('._popup-link');
	let popups = document.querySelectorAll('.popup');
	let unlock = true;
	for (let index = 0; index < popup_link.length; index++) {
		const el = popup_link[index];
		el.addEventListener('click', function (e) {
			if (unlock) {
				let item = el.getAttribute('href').replace('#', '');
				let video = el.getAttribute('data-video');
				popup_open(item, video);
			}
			e.preventDefault();
		})
	}
	for (let index = 0; index < popups.length; index++) {
		const popup = popups[index];
		popup.addEventListener("mousedown", function (e) {
			if (!e.target.closest('.popup__body')) {
				popup_close(e.target.closest('.popup'));
			}
		});
	}

	function popup_open(item, video = '') {
		let activePopup = document.querySelectorAll('.popup._active');
		if (activePopup.length > 0) {
			popup_close('', false);
		}
		let curent_popup = document.querySelector('.popup_' + item);
		if (curent_popup && unlock) {
			if (video != '' && video != null) {
				let popup_video = document.querySelector('.popup_video');
				popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			}
			if (!document.querySelector('.menu__body._active')) {
				body_lock_add(500);
			}
			curent_popup.classList.add('_active');
			history.pushState('', '', '#' + item);
		}
	}

	function popup_close(item, bodyUnlock = true) {
		if (unlock) {
			if (!item) {
				for (let index = 0; index < popups.length; index++) {
					const popup = popups[index];
					let video = popup.querySelector('.popup__video');
					if (video) {
						video.innerHTML = '';
					}
					popup.classList.remove('_active');
				}
			} else {
				let video = item.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				item.classList.remove('_active');
			}
			if (!document.querySelector('.menu__body._active') && bodyUnlock) {
				body_lock_remove(500);
			}
			history.pushState('', '', window.location.href.split('#')[0]);
		}
	}

	function body_lock_remove(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lock_padding = document.querySelectorAll("._lp");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				body.classList.remove("_lock");
			}, delay);

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}

	function body_lock_add(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lock_padding = document.querySelectorAll("._lp");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			body.classList.add("_lock");

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}

	let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
	if (popup_close_icon) {
		for (let index = 0; index < popup_close_icon.length; index++) {
			const el = popup_close_icon[index];
			el.addEventListener('click', function () {
				popup_close(el.closest('.popup'));
			})
		}
	}
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			popup_close();
		}
	});
}
//========================================================================================================================================================