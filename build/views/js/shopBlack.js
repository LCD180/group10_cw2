let basket = JSON.parse(localStorage.getItem("data")) || [];

const shopContainer = document.getElementById("shop-container"); 


let generateShopBlack = () => {
    shopContainer.innerHTML = headBlack.map(product => {
        let search = basket.find(x => x.id === product.id) || {};
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <p class="new-price">${product.price}</p>
                <div class="buttons-plus-minus">
                    <i onclick="decrementBlack(${product.id})" class="bi bi-dash-lg"></i>
                    <div class="quantity" id="quantity-${product.id}">
                        ${search.item || 0}
                    </div>
                    <i onclick="incrementBlack(${product.id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        `;
    }).join("");
};

let incrementBlack = (id) => {
    let search = basket.find(x => x.id === id);
    if (!search) {
        basket.push({ id: id, item: 1 });
    } else {
        search.item += 1;
    }
    updateBlack(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrementBlack = (id) => {
    let search = basket.find(x => x.id === id);
    if (!search) return;

    search.item -= 1;

    
    if (search.item <= 0) {
        basket = basket.filter(x => x.id !== id);
    }

    updateBlack(id);
    localStorage.setItem("data", JSON.stringify(basket));
};


let updateBlack = (id) => {
    let search = basket.find(x => x.id === id);
    document.getElementById(`quantity-${id}`).innerHTML = search ? search.item : 0;
    calculation();
};

let calculation = () => {
    const cartIcon = document.getElementById("cartAmount");
    if (cartIcon) {
        cartIcon.innerHTML = basket.reduce((total, product) => total + product.item, 0);
    }
};


generateShopBlack();
calculation();
