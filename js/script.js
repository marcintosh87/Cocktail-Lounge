"use strict";
window.addEventListener("DOMContentLoaded", (event) => {
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
          drinks: [
            {
              strDrink,
              strDrinkThumb,
              strIBA,
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
              strIngredient6,
              strIngredient7,
              strIngredient8,
              strIngredient9,
              strIngredient10,
              strIngredient11,
              strIngredient12,
              strIngredient13,
              strIngredient14,
              strIngredient15,
            },
          ],
        } = cocktail;
        //dont touch
        cocktail.drinks.forEach(renderCard);
        //dont touch
        console.log(cocktail.drinks);
      });
  }

  function renderCard(cocktail) {
    const ing = [
      cocktail.strMeasure1 + cocktail.strIngredient1,
      cocktail.strMeasure2 + cocktail.strIngredient2,
      cocktail.strMeasure3 + cocktail.strIngredient3,
      cocktail.strMeasure4 + cocktail.strIngredient4,
      cocktail.strMeasure5 + cocktail.strIngredient5,
      cocktail.strMeasure6 + cocktail.strIngredient6,
      cocktail.strMeasure7 + cocktail.strIngredient7,
      cocktail.strMeasure8 + cocktail.strIngredient8,
      cocktail.strMeasure9 + cocktail.strIngredient9,
      cocktail.strMeasure10 + cocktail.strIngredient10,
      cocktail.strMeasure11 + cocktail.strIngredient11,
      cocktail.strMeasure12 + cocktail.strIngredient12,
      cocktail.strMeasure13 + cocktail.strIngredient13,
      cocktail.strMeasure14 + cocktail.strIngredient14,
      cocktail.strMeasure15 + cocktail.strIngredient15,
    ];

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
    // modalIngredientsLi.textContent = measure[0] + ing[0];
    ing.forEach((item) => {
      if (item == 0) {
        return "";
      } else {
        const modalIngredientsLi = document.createElement("li");
        modalIngredientsLi.innerHTML = item;
        modalIngredients.append(modalIngredientsLi);
      }
    });

    modalInstruct.innerHTML = `<h5>Instructions:</h5> ${cocktail.strInstructions}`;

    likeBtn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i><span>${likeBtnCount}</span>`;
    likeBtn.classList.add("btn");
    dislikeBtn.innerHTML = `<i class="fa fa-thumbs-down" aria-hidden="true"></i><span>${dislikeBtnCount}</span>`;
    dislikeBtn.classList.add("btn");

    //likebutton
    likeBtn.addEventListener("click", () => {
      likeBtn.style.color = "#ce9928";
      likeBtn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i><span>${++likeBtnCount}</span>`;
    });

    //modal

    modalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    modalClose.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
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
