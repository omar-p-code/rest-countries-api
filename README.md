# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![screenshot](./Screenshot-1.jpg)
![screenshot](./Screenshot-2.jpg)
![screenshot](./Screenshot-3.jpg)
![screenshot](./Screenshot-4.jpg)
![screenshot](./Screenshot-5.jpg)
![screenshot](./Screenshot-6.jpg)

### Links

- Solution URL: [solution URL](https://www.frontendmentor.io/solutions/responsive-rest-countries-api-using-pugjs-sass-jqury-MVw7uDJBfJ)
- Live Site URL: [live site URL ](https://omar-p-code.github.io/rest-countries-api/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [pugJS](https://pugjs.org/) - Js Template Engine
- [Sass](https://sass-lang.com/) - Css Preprocessor
- [JQuery](https://jquery.com/) - Js Lib
- [font awesome](https://fontawesome.com/) - For Icons

### What I learned

Rducing The Code Complexity And Writing Better JS Docs


```js
/**
 * Render a chunk of data
 * @param {Array} data - The array of country data
 * @param {number} from - The starting index for rendering
 * @returns {void}
 * @description This function creates a chunk of country cards and appends them to the countries container. It also adds a "More" button if there are more countries to display.
 * The function takes the data array and the starting index as parameters. It iterates over the data array and calls the renderDataChunk function for each country.
 */
function renderChunk(data ,from) {
   let i = from + 20;
   console.log(i, from)
   data.forEach((country, index) => {
      renderDataChunk(data, country, index, from, i)
   });
}

/**
/**
 * Render a chunk of data
 * @param {Array} data - The array of country data
 * @param {number} from - The starting index for rendering
 * @returns {void}
 * @description This function creates a chunk of country cards and appends them to the countries container. It also adds a "More" button if there are more countries to display.
 * The function takes the data array and the starting index as parameters. It iterates over the data array and calls the renderDataChunk function for each country.
 */
function renderChunk(data ,from) {
   let i = from + 20;
   console.log(i, from)
   data.forEach((country, index) => {
      renderDataChunk(data, country, index, from, i)
   });
}

/**
 * Render a chunk of data
 * @param {Array} data - The array of country data
 * @param {Object} country - The country data object
 * @param {number} index - The index of the country in the data array
 * @param {number} from - The starting index for rendering
 * @param {number} i - The ending index for rendering
 * @returns {void}
 * @description This function creates a country card and appends it to the countries container. If the index is equal to the length of the data array, it adds a "More" button.
 * If the index is equal to the current index, it adds the country card to the container.
 */
function renderDataChunk(data, country, index, from, i) {
   const coutryCard = $(`<div class="country" data-index='${index}'></div>`);
   if (index >= from && index < i) {
      addDataToCard(country, coutryCard);
   }

   if (index !== data.length && index == i) {
      countries.after('<div class="more">More</div>');
      countries.next().on('click', moreBtn);
   }
}
```

## Author

- Website - [Omar Matar](https://omar-p-code.github.io/my_portfolio/public/index.html)
- Frontend Mentor - [@omar-p-code](https://www.frontendmentor.io/profile/omar-p-code)