let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    const shopContainer = document.getElementById("shop-container");

    shopContainer.innerHTML = products.map(product => {
        let search = basket.find(x => x.id === product.id) || {};
        return `
            <div class="product-card">
                <img src="${product.image}" alt="Product">
                <p class="new-price">${product.price}</p>
                <div class="buttons-plus-minus">
                    <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
                    <div class="quantity" id="quantity-${product.id}">
                        ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        `;
    }).join("");
};


let increment = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if(search === undefined) return;
    else if (search.item === 0) return;
     else {
        search.item -= 1;
    }
    update(id)
    basket = basket.filter((x) => x.item !== 0);
    
localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (!search) return;
    document.getElementById(`quantity-${id}`).innerHTML = search.item;
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

generateShop();
calculation();


 