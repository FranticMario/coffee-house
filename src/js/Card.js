export let arr ;

export class Card {
    constructor ({name, description, price, category, urlToImage, sizes, additives}) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.urlToImage = urlToImage;
        this.sizes = sizes;
        this.additives = additives;
        this.popup = this.renderPopup()
    }



    // Card generation
    renderCard() {
        let card = document.createElement("div");
        card.className = "menu__card block-shadow";
        card.addEventListener("click", () => {
            document.body.append(this.popup);
            document.documentElement.style.overflow = "hidden";
        })

        card.addEventListener("click", () => {
            arr = this.price
        })
        card.innerHTML =
        `
        <div class="photo__card">
            <img src="${this.urlToImage}" alt="" class="card__img">
         </div>
         <div class="card__content">
        <div class="card__description">
            <h3 class="card__title">${this.name}</h3>
            <p class="card__subtitle">${this.description}</p>
        </div>

        <h3 class="card__price">${this.price}</h3>
        `

        return card;
    }

    renderPopup() {
        const popup = document.createElement("div");
        popup.className = "overlay";
        popup.innerHTML = 
        `<div class="modal"> 
        <div class="photo__card">
            <img src="${this.urlToImage}" alt="" class="card__img">
        </div>  
       <div class="modal__description">
        <h3 class="modal__title">${this.name}</h3>
        <div class="modal__content">
            <p class="modal__subtitle">${this.description}</p>
            <div class="size__wrapper">
                <p class="size__title">
                    Size
                </p>
                <div class="size__tags tags">
                    <div class="tag tag_selected s">
                        <span class="size tag-icon s">S</span><span class="ml s">${this.sizes.s.size}</span>
                    </div>
                    <div class="tag tag_bordered m">
                        <span class="size tag-icon m">M</span><span class="ml m">${this.sizes.m.size}</span>
                    </div>
                    <div class="tag tag_bordered l">
                        <span class="size tag-icon l">L</span><span class="ml l">${this.sizes.l.size}</span>
                    </div>
                </div>
            </div>
            <div class="additives__wrapper">
                <p class="additives__title">Additives</p>
                <div class="additives tags">
                    <div class="tag tag_bordered" >
                        <span class="additives__tag tag-icon">1</span><span class="add">${this.additives[0].name}</span>
                    </div>
                    <div class="tag tag_bordered">
                        <span class="additives__tag tag-icon">2</span><span class="add">${this.additives[1].name}</span>
                    </div>
                    <div class="tag tag_bordered">
                        <span class="additives__tag tag-icon">3</span><span class="add">${this.additives[2].name}</span>
                    </div>
            </div>
            </div>

            <div class="modal__price">
                    <h3 class="modal__total">Total:</h3>
                    <h3 class="modal-price">$${this.price}</h3>
            </div>

            <div class="modal__alert">
                <img src="../../assets/icon/info-empty.svg" class="ico ico__alert"></img>
                <p class="alert__description">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
            </div>

            <div class="button button_secondary">
                Close
            </div>

        </div>
       </div>`

       return popup;
    }



    
}