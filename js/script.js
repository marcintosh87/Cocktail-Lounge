"use strict";
window.addEventListener("DOMContentLoaded", (e) => {
  const searchURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  //card Selectors
  const card = document.querySelector(".card-block");

  //selectors
  const searchBtn = document.querySelector("#search");
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#searchInput");
  const cardContainer = document.querySelector("#containerOfCards");
  const modalEntry = document.querySelector(".modal-entry");
  const searchVodka = document.querySelector("#vodka");
  const searchGin = document.querySelector("#gin");
  const searchRum = document.querySelector("#rum");
  const searchTequila = document.querySelector("#tequila");
  const searchWhiskey = document.querySelector("#whiskey");

  function searchCocktails(query = "rum") {
    fetch(`${searchURL}${query}
`)
      .then((res) => res.json())
      .then((cocktail) => {
        let {
          drinks: [{}],
        } = cocktail;
        //dont touch
        cocktail.drinks.forEach(renderCard);
        //dont touch
        console.log(cocktail);
      });
  }

  function renderCard(cocktail) {
    const ing = Object.entries(cocktail)
      .slice(17, 32)
      .map((entry) => entry[1]);
    const measure = Object.entries(cocktail)
      .slice(32, 47)
      .map((entry) => entry[1]);

    const measureIng = measure.map((value, index) => value + ing[index]);

    //creation
    const cardBlock = document.createElement("div");
    const card = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const cardDesc = document.createElement("p");
    const modalBtn = document.createElement("div");
    const modal = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalHeader = document.createElement("div");
    const modalClose = document.createElement("span");
    const modalHeaderTitle = document.createElement("h2");
    const modalbody = document.createElement("div");
    const modalInstruct = document.createElement("p");
    const modalIngredients = document.createElement("ul");
    const modalIngHeader = document.createElement("h5");
    const likeBtn = document.createElement("button");
    const dislikeBtn = document.createElement("button");
    let likeBtnCount = 0;
    let dislikeBtnCount = 0;

    //modifications
    cardBlock.classList.add("card-block");
    card.classList.add("card");
    card.style.width = "12rem";
    cardImg.src = cocktail.strDrinkThumb;
    cardImg.classList.add("card-img-top");
    cardBody.classList.add("card-body", "text-center");
    cardTitle.classList.add("card-title");
    cardDesc.classList.add("card-text");
    cardDesc.textContent = cocktail.strCategory;
    cardTitle.textContent = cocktail.strDrink;
    modalBtn.classList.add("btn", "btn-secondary");
    modalBtn.id = `btn${cocktail.idDrink}`;
    modalBtn.textContent = "Make It";
    modal.id = `modal${cocktail.idDrink}`;
    modal.classList.add("modal");
    modalContent.classList.add("modal-content");
    modalContent.style.width = "80%";
    modalHeader.classList.add("modal-header");
    modalClose.classList.add("close");
    modalClose.innerHTML = "&times;";
    modalHeaderTitle.innerHTML = `<i class="fas fa-cocktail"></i> ${cocktail.strDrink}`;
    modalbody.classList.add = "modal-body";
    modalbody.style.padding = "3rem";
    modalIngHeader.textContent = "Ingredients";
    modalIngredients.classList.add("ingredients-list");
    //Ingredients
    measureIng.forEach((item) => {
      if (item === 0) {
        return false;
      } else {
        const modalIngredientsLi = document.createElement("li");

        modalIngredientsLi.innerHTML = item.replace("null", "");
        modalIngredients.append(modalIngredientsLi);
      }
    });

    modalInstruct.innerHTML = `<h5>Instructions:</h5> ${cocktail.strInstructions}`;

    likeBtn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;<span>${likeBtnCount}</span>`;
    likeBtn.classList.add("btn");
    dislikeBtn.innerHTML = `<i class="fa fa-thumbs-down" aria-hidden="true"></i><span>${dislikeBtnCount}</span>`;
    dislikeBtn.classList.add("btn");

    //likebutton
    likeBtn.addEventListener("click", () => {
      likeBtn.style.color = "#ce9928";
      likeBtn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i> &nbsp;<span>${++likeBtnCount}</span>`;
    });

    //modal

    modalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    modalClose.onclick = () => {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    //append
    cardBody.append(cardTitle, cardDesc, modalBtn, likeBtn);
    card.append(cardImg, cardBody);
    cardBlock.append(card);
    cardContainer.append(cardBlock);
    modalHeader.append(modalHeaderTitle, modalClose);

    modalbody.append(modalIngHeader, modalIngredients, modalInstruct);
    modalContent.append(modalHeader, modalbody);
    modal.append(modalContent);
    modalEntry.append(modal);
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // card.classList.remove("hide");
    cardContainer.replaceChildren();
    console.log(searchInput.value);
    searchCocktails(searchInput.value);
    searchForm.reset();
  });
  //Search by Ingredient
  searchVodka.addEventListener("click", () => {
    cardContainer.replaceChildren();
    searchCocktails("vodka");
  });
  searchGin.addEventListener("click", () => {
    cardContainer.replaceChildren();
    searchCocktails("gin");
  });
  searchTequila.addEventListener("click", () => {
    cardContainer.replaceChildren();
    searchCocktails("tequila");
  });
  searchRum.addEventListener("click", () => {
    cardContainer.replaceChildren();
    searchCocktails("rum");
  });
  searchWhiskey.addEventListener("click", () => {
    cardContainer.replaceChildren();
    searchCocktails("whiskey");
  });
});
