import { arr } from "./Card.js";
import { cardArr } from "./Card.js";



const handleTagClick = (e) => {
    const target = e.currentTarget.closest(".tag");

    if (!target) return; 

    if (target.classList.contains("tag_bordered")) {
        target.classList.remove("tag_bordered");
        target.classList.add("tag_selected");

        const totalPrice = document.querySelector(".modal-price");
        let priceSlice = totalPrice.innerText.slice(1);
        let priceToInt  = parseFloat(priceSlice);
    
        totalPrice.innerHTML  = `$${(priceToInt + 0.50).toFixed(2)}`
    } else if (target.classList.contains("tag_selected")) {
        target.classList.remove("tag_selected");
        target.classList.add("tag_bordered");

        const totalPrice = document.querySelector(".modal-price");
        let priceSlice = totalPrice.innerText.slice(1);
        let priceToInt  = parseFloat(priceSlice);
    
        totalPrice.innerHTML  = `$${(priceToInt - 0.50).toFixed(2)}`
    }
};


const initializePriceChange = () => {
    const tagsAddivities = document.querySelectorAll(".additives .tag");

    tagsAddivities.forEach(item => {
        item.addEventListener("click", handleTagClick);
    });
};



document.addEventListener("click", () => {
    initializePriceChange();

    
});



