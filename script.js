/* =================================
   ROYAL PALACE RESTAURANT
================================= */


/* =================================
   CART
================================= */

let cart = [];


/*
    IMPORTANT:
    Apna WhatsApp number yaha likho.

    Example:
    const whatsappNumber = "919876543210";

    Country code ke saath number likhna hai.
    + sign mat lagana.
*/

const whatsappNumber = "919315330320";


/* =================================
   MOBILE MENU
================================= */

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    navbar.classList.toggle("show");

}


/* =================================
   SELECT FOOD SIZE
================================= */

function selectSize(button) {

    const card = button.closest(".food-card");

    const allButtons = card.querySelectorAll(".size-btn");

    allButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

}


/* =================================
   ADD SELECTED FOOD TO CART
================================= */

function addSelectedFood(button, foodName) {

    const card = button.closest(".food-card");

    const selectedButton = card.querySelector(".size-btn.active");


    if (!selectedButton) {

        alert("Please select food size.");

        return;

    }


    /*
        Button ke andar se size read hoga.

        Example:
        Half
        ₹199
    */

    const size = selectedButton.childNodes[0]
        .textContent
        .trim();


    const priceText = selectedButton
        .querySelector("span")
        .innerText;


    const price = parseInt(
        priceText
        .replace("₹", "")
        .trim()
    );


    /*
        Same food + same size
        already cart me hai to quantity increase hogi.
    */

    const existingItem = cart.find(
        item =>
            item.name === foodName &&
            item.size === size
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: foodName,

            size: size,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    /*
        Total quantity
    */

    let totalQuantity = 0;


    cart.forEach(item => {

        totalQuantity += item.quantity;

    });


    cartCount.innerText = totalQuantity;


    /*
        EMPTY CART
    */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add delicious food from our menu.
                </p>

            </div>

        `;

        cartTotal.innerText = "₹0";

        return;

    }


    /*
        CART ITEMS
    */

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>
                        ${item.name}
                    </h3>


                    <div class="cart-size">

                        <span>
                            Size:
                        </span>

                        <strong>
                            ${item.size}
                        </strong>

                    </div>


                    <div class="cart-item-price">

                        ₹${item.price}
                        ×
                        ${item.quantity}

                    </div>


                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove"
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </button>

                </div>


                <strong class="cart-item-total">

                    ₹${itemTotal}

                </strong>

            </div>

        `;

    });


    /*
        FINAL TOTAL
    */

    cartTotal.innerText =
        "₹" + total;

}


/* =================================
   INCREASE QUANTITY
================================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* =================================
   DECREASE QUANTITY
================================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


/* =================================
   REMOVE ITEM
================================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =================================
   OPEN CART
================================= */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("show");

}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("show");

}


/* =================================
   FILTER MENU
================================= */

function filterMenu(category, button) {

    const cards =
        document.querySelectorAll(".food-card");

    const buttons =
        document.querySelectorAll(".filter-btn");


    /*
        Active button
    */

    buttons.forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");


    /*
        Filter cards
    */

    cards.forEach(card => {

        const cardCategory =
            card.getAttribute("data-category");


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* =================================
   WHATSAPP ORDER
================================= */

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Please add at least one food item to your cart."
        );

        return;

    }


    let message =
        "🍽️ *NEW ORDER - ROYAL PALACE*%0A";


    message +=
        "━━━━━━━━━━━━━━━━━━%0A";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=

            `%0A${index + 1}. *${item.name}*%0A` +

            `📏 Size: ${item.size}%0A` +

            `🔢 Quantity: ${item.quantity}%0A` +

            `💰 Price: ₹${item.price}%0A` +

            `💵 Item Total: ₹${itemTotal}%0A`;

    });


    message +=
        "%0A━━━━━━━━━━━━━━━━━━%0A";


    message +=
        `💰 *TOTAL: ₹${total}*%0A%0A`;


    message +=
        "📍 Please contact me for delivery details.";


    /*
        WhatsApp URL
    */

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =================================
   THEME CHANGER
================================= */

function changeTheme(theme) {

    document.body.classList.remove(
        "light-theme",
        "gold-theme"
    );


    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }


    if (theme === "gold") {

        document.body.classList.add(
            "gold-theme"
        );

    }


    /*
        Theme save
    */

    localStorage.setItem(
        "restaurantTheme",
        theme
    );

}


/* =================================
   LOAD SAVED THEME
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedTheme =
            localStorage.getItem(
                "restaurantTheme"
            );


        if (savedTheme) {

            changeTheme(savedTheme);

        }

    }
);


/* =================================
   OFFER POPUP
================================= */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                document
                    .getElementById("offerPopup")
                    .classList.add("show");

            },
            5500
        );

    }
);


/* =================================
   CLOSE OFFER POPUP
================================= */

function closeOfferPopup() {

    document
        .getElementById("offerPopup")
        .classList.remove("show");

}


/* =================================
   OFFER POPUP ORDER BUTTON
================================= */

function shopNow() {

    closeOfferPopup();


    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =================================
   NEWSLETTER
================================= */

function subscribe() {

    const email =
        document.getElementById("email").value.trim();


    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    if (!email.includes("@")) {

        alert("Please enter a valid email.");

        return;

    }


    alert(
        "Thank you! You have subscribed successfully."
    );


    document.getElementById("email").value = "";

}


/* =================================
   ESC KEY
================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCart();

            closeOfferPopup();

        }

    }
);