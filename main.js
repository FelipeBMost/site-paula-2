const recipeTitle = document.querySelector("[data-recipeTitle]");
const recipeImage = document.querySelector("[data-recipeImage]");
const recipeDescription = document.querySelector("[data-recipeDescription]");
const recipeDescriptionItem1 = document.querySelector("[data-recipeDescriptionItem='1']");
const recipeDescriptionItem2 = document.querySelector("[data-recipeDescriptionItem='2']");
const recipeDescriptionItem3 = document.querySelector("[data-recipeDescriptionItem='3']");
const recipeButtonRight = document.querySelector("[data-recipeButtonRight]");
const recipeButtonLeft = document.querySelector("[data-recipeButtonLeft]");
const cartNumberOfItens = document.querySelector("[data-cartCounter]");
const cart = document.querySelector("#cart");
const itemList = cart.querySelector("[data-itemList]");
const openCart = document.querySelector("#open-cart");
const addToCartButton = document.querySelector("#add-to-cart");
const closeCart = cart.querySelector("#close-cart");
const removeItemButtom = cart.querySelectorAll("[data-removeButton]");

const recipes = [{
  title: 'Urso Kuma',
  imagePath: './images/ursoKuma.png',
  description: {
    qt: '10m',
    height: '25cm',
    price: '25,00',
  },
  color: '#9EE59D',
  titleColor: '#367630',
  buttonColor: '#367630',
  titleShadow: '#26c91863'
}, {
  title: 'Ursa Vênus',
  imagePath: './images/ursaVenus.png',
  description: {
    qt: '12m',
    height: '30cm',
    price: '30,00',
  },
  color: '#EEAAFA',
  titleColor: '#573076',
  buttonColor: '#573076',
  titleShadow: '#26c91863'
}];
let recipeCounter = 0;
let cartCounter = cart.querySelector('[data-itemList]').children;
openCart.addEventListener("click", () => {
  document.body.classList.add("stop-scroll")
  cart.showModal();
})
closeCart.addEventListener("click", () => {
  cart.close();
})
cart.addEventListener("close", () => {
  document.body.classList.remove("stop-scroll");
  cartItemsCount(cartCounter.length);
})
cart.addEventListener("click", (e) => {
  const target = e.target
  if(target.matches("[data-removeButton]")) {
    target.parentElement.remove();
  }
})
addToCartButton.addEventListener("click", () => {
  addToCartFunction(recipeCounter);
})
recipeButtonRight.addEventListener("click", () => {
  if (recipeCounter === recipes.length - 1) return
  if (recipeCounter === 0)
    recipeButtonLeft.style.setProperty("background-color", "#002e69");
  recipeCounter += 1;
  if (recipeCounter === recipes.length - 1)
    recipeButtonRight.style.setProperty("background-color", "grey");
  generateRecipe(recipeCounter);
})
recipeButtonLeft.addEventListener("click", () => {
  if (recipeCounter <= 0) return
  if (recipeCounter > 0)
    recipeButtonRight.style.setProperty("background-color", "#002e69");
  recipeCounter -= 1;
  if (recipeCounter === 0) {
    recipeButtonLeft.style.setProperty("background-color", "grey");
  }
  generateRecipe(recipeCounter)
})
let generateRecipe = (counter) => {
  recipeTitle.textContent = recipes[counter].title.toUpperCase();
  recipeImage.setAttribute("src", recipes[counter].imagePath);
  recipeDescriptionItem1.textContent = `Qt. de linha: ${recipes[counter].description.qt}`;
  recipeDescriptionItem2.textContent = `Altura: ${recipes[counter].description.height}`;
  recipeDescriptionItem3.textContent = `Valor: ${recipes[counter].description.price}`;
  document.documentElement.style.setProperty('--recipe-color', recipes[counter].color);
  document.documentElement.style.setProperty('--recipe-title', recipes[counter].buttonColor);
  document.documentElement.style.setProperty('--recipe-button-color', recipes[counter].buttonColor);
  document.documentElement.style.setProperty('--recipe-shadow', recipes[counter].buttonColor);
}
let cartItemsCount = (counter) => {
  cartNumberOfItens.textContent = counter !== 1 ? `${counter} items` : `${counter} item`;
}
let addToCartFunction = (counter) => {
  const listItem = document.createElement("li");
  listItem.classList.add('cart-item', 'flex', 'se');
  const itemImage = document.createElement("img");
  itemImage.setAttribute('src', recipes[counter].imagePath);
  itemImage.setAttribute('alt', '');
  itemImage.classList.add('item-image');
  const itemName = document.createElement('p');
  itemName.textContent = recipes[counter].title;
  const itemButton = document.createElement('button');
  itemButton.textContent = 'remover';
  itemButton.setAttribute('data-removeButton', '');
  itemButton.classList.add('remove-item');
  listItem.appendChild(itemImage);
  listItem.appendChild(itemName);
  listItem.appendChild(itemButton);
  itemList.appendChild(listItem);
  cartItemsCount(cartCounter.length);
}
let preloadImages = () => {
  for (let i = 1; i < recipes.length; i++) {
    newImage = document.createElement('img');
    newImage.setAttribute('src', recipes[i].imagePath);
    console.log(newImage)
  }
}
generateRecipe(recipeCounter);
cartItemsCount(cartCounter.length);
preloadImages();