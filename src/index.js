import { Card } from "./js/Card.js";
import { arr } from "./js/Card.js";
// import { priceChange } from "./js/price.js";

function hamburger() {
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector(".header");
    const navigation = document.querySelector(".container__navigation");
    const navigationLinkUl = document.querySelector(".navigation");
    const linkMenu = document.querySelector(".link-underline");


    const closeByLink = (e) => {
        !(e.target.closest('.navigation__link a')) || toggleMenu();
    }

    const closeByOberlay = (e) => {
        !(e.target.classList.contains('header__navigation')) || toggleMenu();
    }

    const resizeWindow = () => !(window.innerWidth > 766 && header.classList.contains('overlay-header')) || toggleMenu();

    const toggleMenu =  () => {
        // if(window.innerWidth > 768) return;
        hamburger.classList.toggle("hamburger-active");
        navigation.classList.toggle("open")
        navigation.classList.toggle("navigation-show");

        linkMenu.classList.toggle("menu-show");
        document.documentElement.style.overflow = navigation.classList.contains("navigation-show") ? "hidden" : "";
    }

    hamburger.addEventListener("click", toggleMenu);
    document.addEventListener('click', closeByOberlay);
    navigationLinkUl.addEventListener("click", closeByLink);
    window.addEventListener("resize", resizeWindow)

    }
    hamburger()


// Constants
const cardContainer = document.querySelector(".offer-wrapper");
const offerTags = document.querySelectorAll(".offer__tags .tag");
let defaultPrice = 0;
let dataArray = [];

// Function 
const getTagActive = () => {
    let tags = document.querySelectorAll(".offer__tags .tag");
    tags.forEach((tag, index) => {
        if(tag.classList.contains("tag_selected")) {
            localStorage.setItem("selectedTag", tag.textContent);
            localStorage.setItem("anotherVariable", index);
        }

    })
}
const storedTag = localStorage.getItem("selectedTag")?.toLowerCase().trim() || "coffee";
const anotherVariable =  parseInt(localStorage.getItem("anotherVariable") || 0);  


const loadTagMenu = (localTag = 0) => {
    offerTags.forEach((tag, index)  => {
        if(index === localTag) {
            tag.classList.remove("tag_bordered");
            tag.classList.add("tag_selected");
        }

    })
}


const addTagsClickHandler = () => {
    document.querySelector(".offer__tags").addEventListener("click", (e) => {
        if (e.target.closest(".tag") ||  e.target.classList.contains("img__tag")) {
            let clickedTag = e.target;

          if(clickedTag.classList.contains("tag__icon") === true) {
            clickedTag = clickedTag.parentNode.parentNode
          }
                console.log(clickedTag);
                removeSelectedTags();
                addSelectedTag(clickedTag);
                getTagActive();
                generateCard(dataArray, cardContainer, clickedTag.innerText);
                addClickHanderMenuCard()

        }
    });
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll(".offer__tags .tag");
    tags.forEach(tag => {
        console.log(tag)
        tag.classList.remove("tag_selected");
        tag.classList.add("tag_bordered");
    })

}

const addSelectedTag = (clickedTag) => {
    if(clickedTag.classList.contains("tag__titel") || clickedTag.classList.contains("img__tag") ) {
        clickedTag.parentNode.classList.add("tag_selected");
        clickedTag.parentNode.classList.remove("tag_bordered");
    } else if (clickedTag.classList.contains("tag__icon")) {
        clickedTag.parentNode.parentNode.classList.add("tag_selected");
        clickedTag.parentNode.parentNode.classList.remove("tag_bordered");
    }  else if (clickedTag.classList.contains("size") || clickedTag.classList.contains("ml")) {
        clickedTag.parentNode.classList.add("tag_selected");
        clickedTag.parentNode.classList.remove("tag_bordered");
    }
    
    
    else {
        clickedTag.classList.add("tag_selected");
        clickedTag.classList.remove("tag_bordered");
    }

}

const generateCard = (arr, wrapper, tag ) => {
    cardContainer.innerHTML = "";
    let lowSelectedTag = tag.toLowerCase();
    arr.forEach(name => {
        if (name.category === lowSelectedTag) {
           wrapper.append(name.renderCard())
        }
    })
}

const getData = async url => {
    let response = await fetch(url);
    if (!response.ok) { throw new Error(`Ошибка статус ${response.status}`); }
    return await response.json();
  };

  getData("../../assets/json/products.json")
  .then((data) => {data.forEach(obj => {
    dataArray.push(new Card(obj))
  }
     )})
  .then(() => {
    generateCard(dataArray, cardContainer, storedTag);
  });




const addTagsClickHandlerSize = () => {
    window.addEventListener("click", e => {
        let sizeTag = e.target;
        console.log(sizeTag)
        if(sizeTag.closest(".size__tags")) {
    
            changePriceSize(sizeTag, arr);
            removeSelectedTagsModalSize();
            addSelectedTagSize(sizeTag);
            getNewSizePrice(defaultPrice)
        }
    });
    
}



const  getNewSizePrice = () => {
    const totalPrice = document.querySelector(".modal-price");
    let newPriceToNum = totalPrice.innerText.slice(1);
    let newPrice = parseFloat(newPriceToNum);
    defaultPrice = newPrice;
}




const removeSelectedTagsModalSize = () => {
    let tags = document.querySelectorAll(".size__tags .tag");

    tags.forEach(tag => {
        tag.classList.remove("tag_selected");
        tag.classList.add("tag_bordered");


})


}

const changePriceSize = (e, defaultprice) => {
    const totalPrice = document.querySelector(".modal-price");


    const addivitiesList = document.querySelectorAll(".additives .tag");

    addivitiesList.forEach(tag => {
        console.log(tag)
        tag.classList.remove("tag_selected");
        tag.classList.add("tag_bordered");
    })
    let defaultPriceToNum = parseFloat(defaultprice);
    if(e.closest(".m")) {
        totalPrice.innerHTML = "$" + (defaultPriceToNum + 0.50).toFixed(2);
    } else if (e.closest(".l")) {
        totalPrice.innerHTML = "$" + (defaultPriceToNum + 1).toFixed(2);
    } else {
        totalPrice.innerHTML = "$" + defaultPriceToNum.toFixed(2);
    }
}

const addSelectedTagSize = (clickedTag) => {
    if (clickedTag.classList.contains("tag__icon")) {
        clickedTag.parentNode.parentNode.classList.add("tag_selected");
        clickedTag.parentNode.parentNode.classList.remove("tag_bordered");
    }
    else if (clickedTag.classList.contains("size") || clickedTag.classList.contains("ml")) {
        clickedTag.parentNode.classList.add("tag_selected");
        clickedTag.parentNode.classList.remove("tag_bordered");
}  else if (clickedTag.classList.contains("size__tags")) return
    else {
        clickedTag.classList.add("tag_selected");
        clickedTag.classList.remove("tag_bordered");
    }
}

const closeModal = (e) => {
    let classes = e.target.classList;
    if(classes.contains("overlay") || classes.contains("button_secondary")) {
        document.querySelector(".overlay").remove();
        document.documentElement.style.overflow = "";
    }
}

const refreshCard = (e) => {
    const menuCard = document.querySelectorAll(".menu__card");
    const btnRefresh = document.querySelector(".btn-refresh")
    if(e.target.classList.contains("btn-refresh")) {
         menuCard.forEach(card => {
             card.style.display = "flex";

         })

         if(e.target.closest(".btn-refresh")) {
             btnRefresh.style.display = "none";
         }
    
}}



    
    
console.log("Hello");
getTagActive();
loadTagMenu(anotherVariable);
addTagsClickHandler();
addTagsClickHandlerSize();
window.addEventListener('click', closeModal);
window.addEventListener('click', refreshCard);


