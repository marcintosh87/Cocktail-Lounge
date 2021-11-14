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

  function searchCocktails(query = "rum") {
    fetch(`${searchURL}${query}
`)
      .then((res) => res.json())
      .then((cocktail) => {
        //   let {
        //     drinks: [{ strDrink, strDrinkThumb, strIBA }],
        //   } = cocktail;
        //   console.log(cocktail.drinks);
        console.log(cocktail.drinks);
        cocktail.drinks.forEach(renderCard);
      });
  }

  function renderCard(cocktail) {
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
    modalContent.style.width = "50%";

    modalHeader.classList.add("modal-header");
    modalClose.classList.add("close");
    modalClose.innerHTML = "&times;";
    modalHeaderTitle.textContent = cocktail.strDrink;
    modalbody.classList.add = "modal-body";
    modalbody.style.padding = "3rem";
    modalInstruct.textContent = `Instructions: ${cocktail.strInstructions}`;

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

    modalBtn.addEventListener("click", () => (modal.style.display = "block"));

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

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
    modalbody.append(modalInstruct);
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
  searchCocktails();
});
