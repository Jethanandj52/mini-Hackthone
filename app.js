import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail,addDoc,collection,db, getDocs, doc} from "./firebase-config.js";

const googleProvider = new GoogleAuthProvider();

window.googleSignIn = function googleSignIn() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;  // Define the user from the result object
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
    showPassword.type = type ? "password" : "text";  // Toggle password visibility
    if (showPassword.type === "text") {
        show.innerHTML = `<i id="togglePassword" class="fa fa-eye-slash" onclick="hidepassword()"></i>`;
    }
};

window.hidepassword = function hidepassword() {
    let showPassword = document.getElementById("loginPassword");
    let show = document.getElementById("show");
    const type = showPassword.type === "password";
    showPassword.type = type ? "text" : "password";  // Toggle password visibility
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




window.submit= async function submit(){
    let product_name=document.getElementById("product_name").value
let product_price=document.getElementById("price").value
let imageUrl=document.getElementById("url").value
let category=document.getElementById("category").value
let product_description=document.getElementById("disc").value
    try{
        const docRef= await addDoc(collection(db, "all-products"),{
            product_name:product_name,
            product_price:product_price,
            imageUrl:imageUrl,
            category:category,
            product_description:product_description,
        
             
        },
 
    
    )
    }catch(error){
        console.log("Error adding document: ", error);
    }
}
let show = document.getElementById("card");


// >>>>>>>>>>>>>category
// Specify the category you want to display
const selectedCategory = "view-category"; // Category select karo

const snap = await getDocs(collection(db, "all-products"));

snap.forEach((element) => {
    let data = element.data();

    // Category match hone par card create karna
    if (data.category === selectedCategory) {
        let createElement = document.createElement("div");
        createElement.className = "food_items";
        let productId = element.id; // Firestore document ID

        // Set product ID as card ID
        createElement.id = productId;

        createElement.innerHTML = `
            <img src="${data.imageUrl}" alt="${data.product_name}" />
            <h1>${data.product_name}</h1>
        `;

        // Add event listener to the card for redirect
        createElement.addEventListener("click", () => {
            // Redirect to a specific page based on productId
            if (productId === "6y3JhVk6xXq9O1cESztf") {
                window.location.href = `Continental.html?productId=${productId}`;
            } else if (productId === "WeYY4nfvuU6P7ZfeWN35") {
                window.location.href = `fast_food.html?productId=${productId}`;
            } else if (productId === "ySJcVyjCvgGrm1YrdDG3") {
                window.location.href = `coldrink.html?productId=${productId}`;
            } else if (productId === "kudRO2j5Y61EgDhRifSt") {
                window.location.href = `main_food.html?productId=${productId}`;
            } 
        
             else {
                // Default page if no condition matches
                window.location.href = `default_page.html?productId=${productId}`;
            }
        });

        // Append the created card to the container
        document.getElementById("category_items").appendChild(createElement);
    }
});


// Specify the category you want to display
const productCategory = "products"; // Change this as needed

const snapProduct = await getDocs(collection(db, "all-products"));

snapProduct.forEach((element) => {
    let data = element.data();

    // Check if the product category matches the selected category
    if (data.category === productCategory) {
        let createElement = document.createElement("div");
        createElement.className = "card";
        let productId = element.id; // Firestore document ID

        // Set the product ID as the card ID
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



const continentalCategory = "continental-product"; // Change this as needed

const contProduct = await getDocs(collection(db, "all-products"));

contProduct.forEach((element) => {
    let data = element.data();

    // Check if the product category matches the selected category
    if (data.category === continentalCategory) {
        let createElement = document.createElement("div");
        createElement.className = "card";
        let productId = element.id; // Firestore document ID

        // Set the product ID as the card ID
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
}

// >>>>>>>>>>.view popup

window.viewDetail = async function viewDetail(cardView) {
    

    // Get the Firestore document ID from the product card
    let id = cardView.parentNode.parentNode.id;

    try {
        const snap = await getDocs(collection(db, "all-products"));
        snap.forEach((doc) => {
            if (doc.id === id) {
                // Get the product data from the Firestore document
                let data = doc.data();
                // Set the product data in the popup
                document.getElementById("view").innerHTML = `
                    <div class="first_section">
                        <img src="${data.imageUrl}" alt="${data.product_name}" />
                        <div>1</div>
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

    // Get the Firestore document ID from the product card
    let id = cardAdd.parentNode.parentNode.id;

    try {
        const snap = await getDocs(collection(db, "all-products"));
        let quantity = 1;

        snap.forEach((doc) => {
            if (doc.id === id) {
                // Get the product data from Firestore
                let data = doc.data();
                // Set the product data in the popup using simple IDs
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


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Quantity Increment and Decrement Functions
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Order Function (Save to Local Storage)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
window.order = function order() {
    // Get product details using simple IDs
    const productName = document.getElementById("productName").textContent;
    const productPrice = parseFloat(document.getElementById("productPrice").textContent);  // Convert to float
      // Convert to float
    const productQuantity = parseInt(document.getElementById("quantity").textContent);  // Convert to integer
    const productImage = document.getElementById("productImage").src;

   

    // Create the order item object
    const orderItem = {
        name: productName,
        price: productPrice,
        
        quantity: productQuantity,
        image: productImage
    };

    // Get existing orders from local storage or initialize an empty array
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let existingOrder = orders.find(item => item.name === productName && item.image === productImage);

    if (existingOrder) {
        // Update the quantity if the product already exists
        existingOrder.quantity += productQuantity;
    } else {
        // Add a new order if it doesn't exist
        orders.push(orderItem);
    }

    // Save updated orders to local storage
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


 







