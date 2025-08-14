let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Update cart icon with total items
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.reduce((sum, x) => sum + x.item, 0);
};

calculation();

// Increment item quantity
let increment = (id) => {
    let search = basket.find(x => x.id === id);

    if (!search) {
        basket.push({ id: id, item: 1 });
    } else {
        search.item += 1;
    }

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCardItems(); // Refresh cart
};

// Decrement item quantity
let decrement = (id) => {
    let search = basket.find(x => x.id === id);

    if (!search || search.item === 0) return;

    search.item -= 1;
    basket = basket.filter(x => x.item !== 0); // Remove items with 0 quantity

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCardItems(); // Refresh cart
};

// Update quantity display and cart icon
let update = (id) => {
    const quantityDiv = document.getElementById(`quantity-${id}`);
    let search = basket.find(x => x.id === id);
    if (quantityDiv) quantityDiv.innerHTML = search ? search.item : 0;

    calculation();
};

let removeItem = (id) => {
    basket = basket.filter(x => x.id !== id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCardItems();
    calculation();
};

let generateCardItems = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;

            // Look in all arrays: white headphones, black headphones, speakers, earphones, turntable
            let search = products.find(y => y.id === id) 
                      || headBlack.find(y => y.id === id) 
                      || speakers.find(y => y.id === id) 
                      || earphones.find(y => y.id === id)
                      || turntable.find(y => y.id === id)
                      || {}; 

            return `
                <div class="cartItem">
                    <img src="${search.image || ''}" alt="${search.name || 'Product Image'}" style="max-width: 100%;" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name || 'Unknown Product'}</p>
                                <p>${search.price || ''}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="buttons-plus-minus">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div class="quantity" id="quantity-${id}">
                                ${item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
        label.innerHTML = "";
    } else {
        shoppingCart.innerHTML = "";
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="home.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
    }
};

// Initialize cart
generateCardItems();
calculation();
