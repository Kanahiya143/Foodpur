const menu = document.querySelector("#menubar");
const ul = document.querySelector("ul");

menu.addEventListener("click", () => {
  ul.classList.toggle("showmenu");
  if (ul.className == "showmenu") {
    menu.className = "fa-solid fa-xmark";
  } else {
    menu.className = "fa-solid fa-bars";
  }
});

const searchIcon = document.querySelector("#searchicon");
const searchBar = document.querySelector("#search");
const cart = document.querySelector("#cart");
const cartnumber = document.querySelector("#cartnumber");

function closeSearch(){
  searchBar.value = ""
  searchIcon.className = "fa-solid fa-magnifying-glass";
  searchIcon.style.setProperty("color", "black", "important");
  searchIcon.style.setProperty("z-index", "999", "important");
  cart.style.setProperty("display", "flex", "important");
  document.getElementById('username').style.setProperty("display", "flex", "important");
  ul.style.setProperty("display", "flex", "important");
  searchBar.style.setProperty("width", "0vw", "important");
  searchBar.style.setProperty("border-radius", "50%", "important");
  if(cartList.length > 0){
    cartnumber.style.setProperty("display", "flex", "important");
  }
}

searchIcon.addEventListener("click", () => {
  searchBar.classList.toggle("searchbar");
  addCartHTML();
  if (searchBar.className == "searchbar") {
    searchIcon.className = "fa-solid fa-xmark";
    searchIcon.style.setProperty("color", "red", "important");
    searchIcon.style.setProperty("z-index", "999", "important");
    ul.style.setProperty("display", "none", "important");
    cart.style.setProperty("display", "none", "important");
    cartnumber.style.setProperty("display", "none", "important");
    document.getElementById('username').style.setProperty("display", "none", "important");
    searchBar.style.setProperty("border-radius", "15px", "important");
    searchBar.style.setProperty("width", "45vw", "important");
    searchBar.style.setProperty("transition", "0.2s ease", "important");
  } else {
    closeSearch();

  }
});

//++++++++++++++++++++++++++ slider +++++++++++++++++++//

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");

left.addEventListener("click", pervSlide);
right.addEventListener("click", nextSlide);

let slideIndex = 0;

slides[slideIndex].classList.add("active");

function pervSlide() {
  slides[slideIndex].classList.remove("active");
  slideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
  slides[slideIndex].classList.add("active");
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function nextSlide() {
  slides[slideIndex].classList.remove("active");
  slideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1;
  slides[slideIndex].classList.add("active");
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

setInterval(nextSlide, 3000);

//++++++++++++++++++Login Form+++++++++++++++++++++//

const loginbtn = document.querySelector(".loginbtn");
const loginform = document.querySelector(".loginform");
const logclose = document.querySelector("#logclose");
const resclose = document.querySelector("#resclose");
const registrationform = document.querySelector(".registrationform");
const registerbtn = document.querySelector("#resbtn");
const logbtn = document.querySelector("#logbtn");
const forgetpwd = document.querySelector("#forgetpwd");

loginbtn.addEventListener("click", () => {
  loginform.style.setProperty("display", "flex", "important");
});

logclose.addEventListener("click", () => {
  loginform.style.setProperty("display", "none", "important");
});

resclose.addEventListener("click", () => {
  registrationform.style.setProperty("display", "none", "important");
});

registerbtn.addEventListener("click", () => {
  loginform.style.setProperty("display", "none", "important");
  registrationform.style.setProperty("display", "flex", "important");
});
forgetpwd.addEventListener("click", () => {
  loginform.style.setProperty("display", "none", "important");
  registrationform.style.setProperty("display", "flex", "important");
});

logbtn.addEventListener("click", () => {
  loginform.style.setProperty("display", "flex", "important");
  registrationform.style.setProperty("display", "none", "important");
});

//++++++++++++++++++++ Cart Btn  +++++++++++++++++++++//

const closecart = document.querySelector("#closecart");
const cartMsg = document.querySelector("#cartmsg");
const opencart = document.querySelector(".cartaria");
const cartbtn = document.querySelector(".cartbtn");
const cartHeading = document.querySelector(".cartheading");

cart.addEventListener("click", () => {
  opencart.style.setProperty("right", "0vh", "important");
  opencart.style.setProperty("transition", "0.2s ease", "important");
  cartbtn.style.setProperty("right", "0vh", "important");
  cartbtn.style.setProperty("transition", "0.2s ease", "important");
  cartHeading.style.setProperty("right", "0", "important");
  cartHeading.style.setProperty("transition", "0.2s ease", "important");
  cartMsg.style.setProperty("right", "18vh", "important");
  cartMsg.style.setProperty("transition", "0.2s ease", "important");
  showCheckoutPage.style.setProperty("display", "none", "important");
});
closecart.addEventListener("click", () => {
  opencart.style.setProperty("right", "-60vh", "important");
  cartbtn.style.setProperty("right", "-60vh", "important");
  cartHeading.style.setProperty("right", "-60vh", "important");
  cartMsg.style.setProperty("right", "-22vh", "important");

});

//+++++++++++++++++++ Product List ++++++++++++++++++//


let productsHTML = document.querySelector(".products");

function addDataToHTML(currentArray) {
  productsHTML.innerHTML = "";
  if (productList.length > 0) {
    currentArray.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("product");
      newProduct.setAttribute("data-aos", "fade-up");
      newProduct.setAttribute("data-aos-duration", 1000);
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `<img src="${product.img}" alt="">
      <h3 class="pname">${product.name}</h3>
      <h4 class="price">Price : <i class="fa-solid fa-indian-rupee-sign" id="rupeesign"></i>${product.price}</h4>
      <button class="addtocart">Add to Cart</button> `;
      productsHTML.appendChild(newProduct);
    });
  }
};

// get the data from json




  let productList = [];
  fetch("product.json")
  .then((response) => response.json())
  .then((data)=>{
    productList = data;
    addDataToHTML(productList);
    
    searchBar.addEventListener("keyup", ()=>{
      let filterArray = [];
      
      let text = searchBar.value.toLowerCase();
      filterArray = productList.filter((a)=>{
        return (
          compareForFilter(a.name, text) ||
          compareForFilter(a.price, text) 
        )});
        if(text = ""){
          addDataToHTML(productList);
                     document.querySelector('.slider_container').style.setProperty("display", "flex", "important");  
           document.querySelector('.trending').style.setProperty("display", "flex", "important");
           left.style.setProperty("display", "flex", "important");
           right.style.setProperty("display", "flex", "important");
       }
       else{
         if(filterArray == ""){
           document.querySelector('.slider_container').style.setProperty("display", "none", "important");  
           document.querySelector('.trending').style.setProperty("display", "none", "important");
           left.style.setProperty("display", "none", "important");
           right.style.setProperty("display", "none", "important");
           productsHTML.innerHTML = `<h1 style="color:red">No record found</h1>;`
         }
         else{
           document.querySelector('.slider_container').style.setProperty("display", "none", "important");  
           document.querySelector('.trending').style.setProperty("display", "none", "important");
           left.style.setProperty("display", "none", "important");
           right.style.setProperty("display", "none", "important");
           addDataToHTML(filterArray);
         }
       }
    })
  }) 



  //+++++++++++++++++++Search+++++++++++++++++++++//

  function compareForFilter (dataText, inputText){
      return dataText.toString().toLowerCase().includes(inputText);
  }

    






//+++++++++++++ Add item in Cart +++++++++++++++++//

let cartList = [];
let numberOfQuantity = document.querySelector("#cartnumber");
const removeCartItem = document.querySelectorAll("#removecartitem");
let totalAmount = document.querySelector("#totalamount");
let totalQuantity = 0;
let totalPrice = 0;
let numberOfProduct = [];

productsHTML.addEventListener("click", (e) => {
  closeSearch();
  let positionClick = e.target;
  let productId = positionClick.parentElement.dataset.id;
  if (positionClick.classList.contains("addtocart")) {
    addToCart(productId);
    
    let productInfo = productList[productId - 1];
    let posOfProInArray = numberOfProduct.findIndex(
      (value) => value === productId
      );
      
      if(posOfProInArray < 0){
        numberOfProduct.push(productId);
        totalQuantity = totalQuantity + 1;
      }
      totalPrice = totalPrice + productInfo.price;
      numberOfQuantity.innerText = totalQuantity;  
    }
    show(totalPrice)
    totalAmount.innerText = totalPrice;
    cartMsg.innerText = ""
  });


  
  
  function addToCart(productId) {
    // here check product is already present in cart or not
    
    let posOfProInArray = cartList.findIndex(
      (value) => value.productId === productId
      );
      
      if (posOfProInArray < 0) {
        // if not present then give -1 and add in array
        cartList.push({
          productId: productId,
          quantity: 1,
        });
      }else{
        cartList[posOfProInArray].quantity = cartList[posOfProInArray].quantity + 1;
      }     
      addCartHTML();
}


const addCartHTML = () => {
  let cLength = cartList.length;
  window.cartLength = cLength;
  opencart.innerHTML = "";
  if (cartList.length > 0) {
    cartnumber.style.setProperty("display", "flex", "important");
    cartList.forEach((cart) => {
      let cartItem = document.createElement("div");
      cartItem.classList.add("cartitem");
      let productInfo = productList[cart.productId - 1];

      cartItem.innerHTML = `<div class="cartitem">
      <img src="${productInfo.img}" alt="">
      <h3>${productInfo.name}</h3>
      <div class="price">
      <h3>Price</h3>
      <span>${productInfo.price * cart.quantity}</span>
      </div>
      <div class="quantity" >
      <h3>Quantity</h3>
      <span class="quantities">
      ${cart.quantity}
      </span>
      </div>`;
      opencart.appendChild(cartItem);
    });
  }
};

const checkOut = document.getElementById('checkout')
const cancel = document.getElementById('cancel')
const pay = document.getElementById('pay')
const showCheckoutPage = document.querySelector('.checkout')
const cprice = document.getElementById('cprice')


function show(a){
  cprice.innerText = a ;
}

function cartClose(){
  opencart.style.setProperty("right", "-60vh", "important");
  cartbtn.style.setProperty("right", "-60vh", "important");
  cartHeading.style.setProperty("right", "-60vh", "important");
}

function checkOutPrice(){
  addCartHTML();
  loginUser();
  if(cartLength != 0 && globleLogged){
    showCheckoutPage.style.setProperty("display", "flex", "important");
    cartClose();
  }
  else if(cartLength == 0){
    alert('add items')
    cartClose();
    showCheckoutPage.style.setProperty("display", "none", "important");
  }else{
    loginform.style.setProperty("display", "flex", "important");
    cartClose();
  }
}


checkOut.addEventListener('click', checkOutPrice)




cancel.addEventListener('click', ()=>{
  showCheckoutPage.style.setProperty("display", "none", "important");
})
pay.addEventListener('click', ()=>{
  let name = document.getElementById('aname').value;
  let phone = document.getElementById('phone').value;
  let village = document.getElementById('village').value;
  let district = document.getElementById('district').value;
  let pincode = document.getElementById('pincode').value;
  let add = name == "" || phone == "" || village == "" || district == "" || pincode == ""
  if(add){
    alert('Fill full address please')
  }else{
    cartList = []
    numberOfQuantity.innerText = ""; 
    numberOfProduct = [];
    totalQuantity = 0;
    totalPrice = 0;
    totalAmount.innerText = 0;
    cartnumber.style.setProperty("display", "none", "important");
    showCheckoutPage.style.setProperty("display", "none", "important");
    opencart.innerHTML = "";
    cartMsg.innerText = "Empty Cart"
    alert('Orders are delivered as soon as possible');
    show(0);
  }
})


function registerUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let user_records = [];
  user_records = JSON.parse(localStorage.getItem("users")) || [];

  if (user_records.some((v) => v.email === email)) {
    alert("Duplicate Data");
  } else {
    user_records.push({
      "name": name,
      "email": email,
      "password": password
    });
    localStorage.setItem("users", JSON.stringify(user_records));
    alert("User registered")
    loginform.style.setProperty("display", "flex", "important");
    registrationform.style.setProperty("display", "none", "important");
  }
}

function loginUser() {
  let email = document.getElementById("lemail").value;
  let password = document.getElementById("lpassword").value;
  let user_records = [];
  user_records = JSON.parse(localStorage.getItem("users")) || [];
  let user =  user_records.find((v) => {
    return v.email === email && v.password === password})
    if (user) {
      loginform.style.setProperty("display", "none", "important");
      loginbtn.style.setProperty("display", "none", "important");
      showCheckoutPage.style.setProperty("display", "flex", "important");
      document.getElementById('username').innerText = `Hi, ${user.name}`
      let islogged = true;
      window.globleLogged = islogged
      showCheckoutPage.style.setProperty("display", "none", "important");
    }else if(email == "" || password == ""){
      let islogged = false;
      window.globleLogged = islogged;
    }else {
      alert('Invailid email or password')
    };
}

















