import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail,addDoc,collection,db, getDocs, doc} from "./firebase-config.js";

const googleProvider = new GoogleAuthProvider();

window.googleSignIn = function googleSignIn() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;  
            if (user.email === "admin@gmail.com") {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error);
            alert("Error: " + error.message);
        });
};

window.signup = function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "signin.html";
            alert("Thank you, " + userCredential.user.email);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });

 
};

window.login = function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            if (user.email === "admin@gmail.com") {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

window.showpassword = function showpassword() {
    let showPassword = document.getElementById("loginPassword");
    let show = document.getElementById("show");
    const type = showPassword.type === "text";
    showPassword.type = type ? "password" : "text";   
    if (showPassword.type === "text") {
        show.innerHTML = `<i id="togglePassword" class="fa fa-eye-slash" onclick="hidepassword()"></i>`;
    }
};

window.hidepassword = function hidepassword() {
    let showPassword = document.getElementById("loginPassword");
    let show = document.getElementById("show");
    const type = showPassword.type === "password";
    showPassword.type = type ? "text" : "password";   
    if (showPassword.type === "password") {
        show.innerHTML = `<i id="togglePassword" class="fa fa-eye" onclick="showpassword()"></i>`;
    }
};


window.forgotPassword = function forgotPassword() {
    const email = document.getElementById("resetEmail").value;

    if (!email) {
        alert("Please enter your email!");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset link has been sent to your email!");
        })
        .catch((error) => {
            
            alert("Error: " + error.message);
        });
};




let show = document.getElementById("card");


// >>>>>>>>>>>>>category
const selectedCategory = "view-category";  

const snap = await getDocs(collection(db, "all-products"));

snap.forEach((element) => {
    let data = element.data();
    
    // Check if the product belongs to the selected category
    if (data.category === selectedCategory) {
        let createElement = document.createElement("div");
        createElement.className = "food_items";
        let productId = element.id; 
        createElement.id = productId;

        createElement.innerHTML = `
            <img src="${data.imageUrl}" alt="${data.product_name}" />
            <h1>${data.product_name}</h1>
        `;

        createElement.addEventListener("click", () => {
            let categoryPage = '';

            
            // Use product_name to decide the page
            if (data.product_name === "Continental Food") {
                categoryPage = "Continental.html";
            } else if (data.product_name === "Fast Food") {
                categoryPage = "fast_food.html";
            } else if (data.product_name === "Coldrink") {
                categoryPage = "coldrink.html";
            } else if (data.product_name === "Main Food") {
                categoryPage = "main_food.html";
            } else {
                categoryPage = "default_page.html";
            }

            // Redirect to the correct page
            window.location.href = `${categoryPage}`;
        });

        document.getElementById("category_items").appendChild(createElement);
    }
});



const productCategory = "products";  

const snapProduct = await getDocs(collection(db, "all-products"));

snapProduct.forEach((element) => {
    let data = element.data();
    console.log(data.category);


    if (data.category === productCategory) {
        let createElement = document.createElement("div");
        createElement.className = "card";
        let productId = element.id; 
        createElement.id = productId;

        createElement.innerHTML = `
        
       
            <img src="${data.imageUrl}" alt="${data.product_name}" />
            <h1>${data.product_name}</h1>
            <p>Price: $${data.product_price}</p>
             
                
                
            
            <div class="cart-btn">
                <button onclick="add(this)" class="cart">Add to cart</button>
                <button onclick="viewDetail(this)" class="cart">View Detail</button>
            </div>
        `;
        
        document.getElementById("card").appendChild(createElement);
    }
});
 



// >>>>>>>>>>>>>continental food 



const continentalCategory = "continental-product";  

const contProduct = await getDocs(collection(db, "all-products"));

contProduct.forEach((element) => {
    let data = element.data();

    if (data.category === continentalCategory) {
        let createElement = document.createElement("div");
        createElement.className = "card";
        let productId = element.id;
        createElement.id = productId;

        createElement.innerHTML = `
        
       
            <img src="${data.imageUrl}" alt="${data.product_name}" />
            <h1>${data.product_name}</h1>
            <p>Price: $${data.product_price}</p>
             
                
                
            
            <div class="cart-btn">
                <button onclick="add(this)" class="cart">Add to cart</button>
                <button onclick="viewDetail(this)" class="cart">View Detail</button>
            </div>
        `;
        
        document.getElementById("continantal").appendChild(createElement);
    }
});


// >>>>>>>>>> hide popup
window.hide=function hide(){
    document.getElementById("popup").style.display="none";
    document.getElementById("myContact").style.display="none"
}

// >>>>>>>>>>.view popup

window.viewDetail = async function viewDetail(cardView) {
    document.getElementById("popup").style.display = "block";
    document.getElementById("add").style.display = "none";
    document.getElementById("view").style.display = "flex";
    let id = cardView.parentNode.parentNode.id;

    try {
        const snap = await getDocs(collection(db, "all-products"));
        snap.forEach((doc) => {
            if (doc.id === id) {
                let data = doc.data();
                document.getElementById("view").innerHTML = `
                    <div class="first_section">
                        <img src="${data.imageUrl}" alt="${data.product_name}" />
                        
                    </div>
                    <div class="second_section">
                        <h1>${data.product_name}</h1>
                        <p>Price: $${data.product_price}</p>
                        <p>Product Description: ${data.product_description}</p>
                    </div>
                `;
            }
        });
    } catch (error) {
        console.error("Error fetching product data for view detail:", error);
    }
};

// >>>>>>>>>>.view popup
window.add = async function add(cardAdd) {
    document.getElementById("popup").style.display = "block";
    document.getElementById("view").style.display = "none";
    document.getElementById("add").style.display = "block";

    let id = cardAdd.parentNode.parentNode.id;

    try {
        const snap = await getDocs(collection(db, "all-products"));
        let quantity = 1;

        snap.forEach((doc) => {
            if (doc.id === id) {
                let data = doc.data();
                document.getElementById("add").innerHTML = `
                    <img id="productImage" src="${data.imageUrl}" alt="${data.product_name}" />
                    <h1 id="productName">${data.product_name}</h1>
                    <div><b>Price: </b><span id="productPrice">${data.product_price}</span><span> PKR</span></div>
                    <div>
                        <b>Quantity:</b>
                        <button onclick="minQuantity()" class="quantityButton minButton">-</button>
                        <span class="quantity" id="quantity">${quantity}</span>
                        <button onclick="addQuantity()" class="quantityButton">+</button>
                    </div>
                    <div>
                        <button class="orderButton" onclick="order()">Order</button>
                    </div>
                `;
            }
        });
    } catch (error) {
        console.error("Error fetching product data for add to cart:", error);
    }
};

 
let quantity = 1;

window.addQuantity = function addQuantity() {
    quantity += 1;
    document.getElementById("quantity").innerHTML = quantity;
};

window.minQuantity = function minQuantity() {
    if (quantity > 1) {
        quantity -= 1;
        document.getElementById("quantity").innerHTML = quantity;
    }
};

 
window.order = function order() {
    const productName = document.getElementById("productName").textContent;
    const productPrice = parseFloat(document.getElementById("productPrice").textContent);  
    const productQuantity = parseInt(document.getElementById("quantity").textContent); 
    const productImage = document.getElementById("productImage").src;

   

    const orderItem = {
        name: productName,
        price: productPrice,
        
        quantity: productQuantity,
        image: productImage
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let existingOrder = orders.find(item => item.name === productName && item.image === productImage);

    if (existingOrder) {
        existingOrder.quantity += productQuantity;
    } else {
        orders.push(orderItem);
    }

    localStorage.setItem("orders", JSON.stringify(orders));

    let book = document.getElementById("bookOrder");
    book.style.display = "block";
    setTimeout(() => {
        book.style.display = "none";
    }, 2200);
    document.getElementById("popup").style.display = "none";
};

const words = ["Continental Food", "Fast Food", "Chicken Biryani", "Coldrink"];  
    const textChanger = document.querySelector(".text");
    let index = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[index];
      if (deleting) {
        textChanger.innerHTML = currentWord.slice(0, charIndex--);
      } else {
        textChanger.innerHTML = currentWord.slice(0, charIndex++);
      }

      const speed = deleting ? 100 : 200;

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1000);  
      }
      else if (deleting && charIndex === 0) {
        deleting = false;
        index = (index + 1) % words.length; 
        setTimeout(typeEffect, 100);  
      } else {
        setTimeout(typeEffect, speed);
      }
    }

    typeEffect();  

 




window.userInfo=function userInfo(){
      document.getElementById("myContact").style.display="block"

      const user = auth.currentUser;

 
    document.getElementById("contact_text").innerHTML=`${user.email}`
}  
 
 