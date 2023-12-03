function hamburger() {
const hamburger = document.querySelector(".hamburger");
const header = document.querySelector(".header");
const navigation = document.querySelector(".header__navigation");
const navigationLinkUl = document.querySelector(".navigation");
const menuBtn  = document.querySelector(".link-button")
const coffeCup = document.querySelector(".ico-coffe-cup") // width height 40px
const linkBtnText = document.querySelector(".link-button__text") // text size -> 32px line height 125%
const linkMenu = document.querySelector(".link-underline");
const favorite = document.querySelector(".favorite");

const closeByLink = (e) => {
    !(e.target.closest('.navigation__link a')) || toggleMenu();

}

const closeByOberlay = (e) => {
    !(e.target.classList.contains('overlay-header')) || toggleMenu();

}

const toggleMenu =  () => {
    if(window.innerWidth > 768) return;
    header.classList.toggle("overlay-header");
    hamburger.classList.toggle("hamburger-active");
    coffeCup.style.width = "40px";
    coffeCup.style.height = "40px";
    coffeCup.style.backgroundImage = "url()";
    linkBtnText.style.fontSize = "32px";
    document.documentElement.style.overflow = header.classList.contains("overlay-header") ? "hidden" : "";
    navigation.style.display = "flex";
    linkMenu.style.display = "flex";
    favorite.style.display = "none"

    if (!header.classList.contains("overlay-header")) {
        coffeCup.style.width = ""; 
        coffeCup.style.height = "";
        coffeCup.style.backgroundImage = "url()"; 
        linkBtnText.style.fontSize = ""; 
        navigation.style.display = "none";
        linkMenu.style.display = "none";
        favorite.style.display = "block"
    }

}

// const resetStyles = () => {
//     coffeCup.style.width = ""; 
//     coffeCup.style.height = "";
//     coffeCup.style.backgroundImage = "url()"; 
//     linkBtnText.style.fontSize = ""; 
//     navigation.style.display = "none";
//     linkMenu.style.display = "none";
//     favorite.style.display = "block"
// }




hamburger.addEventListener("click", toggleMenu);
document.addEventListener('click', closeByOberlay);
navigationLinkUl.addEventListener("click", closeByLink);

}
hamburger()













function carousel () {
let items = document.querySelectorAll(".item");
let currentItem = 0;
let intervalId;
let isEnabled = true;
let isPaused = false;

const changeCurrentItem = (n) => {
    currentItem = (n + items.length) % items.length;
    console.log(currentItem)
}
const hideItem = (direction) => {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener("animationend", function() {
        this.classList.remove("active", direction);
    })
}

const showItem = (direction) => {
    items[currentItem].classList.add("next", direction);
    items[currentItem].addEventListener("animationend", function() {
        this.classList.remove("next", direction);
        this.classList.add("active");
        isEnabled = true;
    })
}

const setClassSelected = (index) => {
    let currentIndex = index ;

    if(currentIndex > 2 ) {
        currentIndex = 0;
    }
    if(currentIndex < 0) {
        currentIndex = 2 ;
    }
    let progress = document.querySelectorAll(".progress__line");
    progress.forEach((tag, i) => { 
    if(currentIndex === i){
        tag.classList.add("control-selected");
    } else {
        tag.classList.remove("control-selected");
    }
})}


const previousItem = (n) => {
    hideItem("to-right");
    changeCurrentItem(n-1);
    showItem("from-left");
    setClassSelected(n-1);
    updateProgressBar()
}

const nextItem = (n) => {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
    setClassSelected(n + 1);
    updateProgressBar()
}

document.querySelector(".control__arrow.left").addEventListener("click", function() {
   if(isEnabled) {
    previousItem(currentItem);
    updateProgressBar()
   }
});


document.querySelector(".control__arrow.right").addEventListener("click", function() {
   if(isEnabled) {
    nextItem(currentItem);
    updateProgressBar()
   }
});





const updateProgressBar = () => {
    const controlSelected = document.querySelector(".control-selected");
    let progress = document.querySelectorAll(".progress__line");
    let width = 0;
    clearInterval(intervalId);
    intervalId = setInterval(() => {

        clearInterval(intervalId);
        intervalId = setInterval(() => {
            if (!isPaused) {
                width += 1;
                controlSelected.style.width = width + "px";

                if (width == 40) {
                    clearInterval(intervalId);
                    controlSelected.style.width = 0 + "px";
                    progress[0].classList.add("control-selected");
                    nextItem(currentItem);
                }
            }
        }, 100);
    }) 
};

const stopProgressBar = () => {
    clearInterval(intervalId);
};

updateProgressBar()

window.addEventListener("mousedown", () => {
    isPaused = !isPaused;
    if (!isPaused) {
        updateProgressBar();
    }
});

window.addEventListener("mouseup", () => {
    isPaused = !isPaused; 
    if (isPaused) {
        updateProgressBar();
    }
});

const swipeDetected = (el) => {
    let surface = el;

    let startX  = 0;
    let startY  = 0;
    let distX  = 0;
    let distY  = 0;


    let startTime  = 0;
    let elapsedTime  = 0;

    let threshold = 150;
    let restraint  = 100;
    let allowedTime = 300;

    surface.addEventListener("mousedown", e =>  {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false)

    surface.addEventListener('mouseup', e => {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTIme = new Date().getTime() - startTime;
		if (elapsedTIme <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
                        updateProgressBar();
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
                        updateProgressBar();
					}
				}
			}
		}
		e.preventDefault();
	}, false);
    
    surface.addEventListener('touchstart', e => {
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
                    updateProgressBar();
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
                    updateProgressBar();
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', e => {
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
                                    updateProgressBar();
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
                                    updateProgressBar();
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

let el = document.querySelector(".carousel");
swipeDetected(el);

}; 

carousel()