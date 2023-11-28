import { Card } from "./js/Card.js";

window.onload = function() {
    console.log("Hello");
    getTagActive();
    loadTagMenu(anotherVariable);
    addTagsClickHandler();
    window.addEventListener("click", addTagsClickHandlerSize)
}

// Constants
const cardContainer = document.querySelector(".offer-wrapper");
const offerTags = document.querySelectorAll(".offer__tags .tag");
let isSizeTagClicked = false;
let dataArray = [];
console.log(dataArray)
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
const storedTag = localStorage.getItem("selectedTag").toLowerCase().trim();
const anotherVariable =  parseInt(localStorage.getItem("anotherVariable"));


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


const addTagsClickHandlerSize = (e) => {
    let sizeTag = e.target;
    console.log(sizeTag)
    if(sizeTag.closest(".tag")) {
 

        removeSelectedTagsModalSize(sizeTag);
        addSelectedTag(sizeTag);
        priceChangeSizeTag(sizeTag);
        getTagActiveSize()
    }
}


const removeSelectedTagsModalSize = (e) => {
    let tags = document.querySelectorAll(".size__tags .tag");
    tags.forEach(tag => {
        tag.classList.remove("tag_selected");
        tag.classList.add("tag_bordered");
    })
}

const getTagActiveSize = () => {
    let tags = document.querySelectorAll(".size__tags .tag");
    tags.forEach((tag, index) => {
        if(tag.classList.contains("tag_selected")) {
            localStorage.setItem("selectedTagSize", tag.childNodes);
            localStorage.setItem("indexSize", index);
        }

    })
}

const lastTagSize = localStorage.getItem("selectedTagSize").toLowerCase().trim();


const priceChangeSizeTag = (e) => {

    console.log(lastTagSize)

// tags.forEach(tag => {
//     if(tag.contains("tag_selected l")) {
//         priceNum = priceNum + 1;
//         price.innerText = `$${priceNum.toFixed(2)}`;
//     }
   
// })
   





}

