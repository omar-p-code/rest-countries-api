/**
 * This script fetches country data from a JSON file and displays it on a webpage.
 * It allows users to search for countries by name and filter them by region.
 * The script also includes a dark mode toggle feature.
 * It uses jQuery for DOM manipulation and event handling.
 * The script fetches data from a local JSON file and renders country cards based on the fetched data.
 */

const mode = $('header .mode');
const countries = $('.countries');
const searchInput = $('.search-container input');
const filter = $('.search-container select');

mode.on('click', modeChange);

if($('html').hasClass('details')) {
   const country = JSON.parse(localStorage.getItem('country'));
   const details = $('html.details');
   const countryDetails = details.find('.details .info .country-details');
   const countryMeta = details.find('.details .info .country-meta');
   const countryBorders = details.find('.details .info .country-borders .borders');
   const languages = []
   const currencies = []

   country.languages.forEach((language) => {
      languages.push(language.name);
   });

   country.currencies.forEach((currency) => {
      currencies.push(currency.name);
   });
   
   details.find('.details img').attr('src', country.flags.png);
   details.find('.info .name').empty().text(country.name);
   countryDetails.find('.native-name').empty().html(`<span>Native Name</span>: ${country.nativeName}`);
   countryDetails.find('.population').empty().html(`<span>Population</span>: ${country.population}`);
   countryDetails.find('.region').empty().html(`<span>Region</span>: ${country.region}`);
   countryDetails.find('.capital').empty().html(`<span>Capital</span>: ${country.capital}`);
   countryDetails.find('.sub-region').empty().html(`<span>Sub Region</span>: ${country.subregion}`);

   countryMeta.find('.top-level-domain').empty().html(`<span>Top Level Domain</span>: ${country.topLevelDomain.join(', ')}`);
   countryMeta.find('.currencies').empty().html(`<span>currencies</span>: ${currencies.join(', ')}`);
   countryMeta.find('.languages').empty().html(`<span>Languages</span>: ${languages.join(', ')}`);
   
   if (country.borders) {
      country.borders.forEach((border) => {
         countryBorders.append(`
            <span>${border}</span>
            `);
         });
      }
   $('.back').on('click', () => {
      location.href = './index.html';
   });
}else {

fetchOfData();

/**
 * Event handler for the filter change event.
 * It fetches data based on the selected region and search input value.
 * @returns {void}
 * @description This function listens for the change event on the filter select element.
 * When the user selects a region, it fetches data based on the selected region and search input value.
 * If the selected region is "all", it fetches all data.
 */
filter.on('change', function() {
   const input = searchInput.val();
   let region = $(this).val();
   if (region === 'all') {
      region = '';
   }
   fetchData(input, region);
});

/**
 * Event handler for the search input keyup and blur events.
 * It fetches data based on the input value and selected region.
 * @returns {void}
 * @description This function listens for the keyup and blur events on the search input field.
 * When the user presses Enter or the input field loses focus, it fetches data based on the input value and selected region.
 * If the Enter key is pressed or the input field loses focus, it retrieves the input value and selected region.
 */
searchInput.on('keyup blur', function(e) {
   if (e.key === 'Enter' || e.type === 'blur') {
      const input = $(this).val();
      let region = filter.val();
      if (region === 'all') {
      region = '';
      }
      fetchData(input, region);
   }
});

}



/**
 * Toggle dark mode on the body element and update the mode icon
 * @returns {void}
 * @description This function toggles the dark mode class on the body element and updates the mode icon accordingly.
 * It checks if the body has the dark class and updates the icon to solid or regular based on that.
 */
function modeChange() {
   $('body').toggleClass('dark');
   if ($('body').hasClass('dark')) {
      mode.find('svg').removeClass('fa-regular').addClass('fa-solid');
   }else {
      mode.find('svg').removeClass('fa-solid').addClass('fa-regular');
   }
}

/**
 * Fetch data from the API and render it
 * @param {string} input - The search input value
 * @param {string} region - The selected region
 * @returns {void}
 */
function fetchData(input = '', region = '') {
   countries.empty();
   countries.next().remove()
   fetch('data.json')
   .then(data => data.json())
   .then(data => {
      addCards(data, input, region);
   });
}

/**
 * Fetch A Chunk Of data from the API and render it
 * @param {number} from - The starting index for rendering
 * @returns {void}
 * @description This function fetches data from the API and renders it. It takes the starting index as a parameter.
 * It fetches the data from the API and calls the renderChunk function to create country cards.
 * If the "More" button is clicked, it fetches the next chunk of data.
 */
function fetchOfData(from=0) {
   if (countries.next().has('.more')) {
      countries.next().remove();
   }
   fetch('data.json')
   .then(data => data.json())
   .then(data => {
      renderChunk(data, from);
   });
}

/**
 * Add data to a country card
 * @param {Object} country - The country data object
 * @param {Object} countryCard - The country card element
 * @returns {void}
 * @description This function creates a country card and appends it to the countries container. It takes the country data and country card element as parameters.
 * It creates an image element for the country flag and a div element for the country information. The function also appends the country card to the countries container.
 */
function addDataToCard(country, countryCard) {
      countryCard.append(`
         <img src="${country.flags.png}" loading='lazy' alt="${country.name} flag">
         <div class="info">
            <h3 class='name'>${country.name}</h3>
            <p><span>Population</span>: ${country.population}</p>
            <p><span>Region</span>: ${country.region}</p>
            <p><span>Capital</span>: ${country.capital}</p>
         </div>
      `);
         countryCard.on('click', () => {
            countryDetails(country);
         });
      countries.append(countryCard);
}


/**
 * Add cards to the countries container
 * @param {Array} data - The array of country data
 * @param {string} input - The search input value
 * @param {string} region - The selected region
 * @returns {void}
 * @description This function creates country cards based on the provided data and appends them to the countries container. It also handles the search input and region filtering.
 * The function takes the data array, search input value, and selected region as parameters. It iterates over the data array and calls the addDataToCard function for each country.
 * If the input and region are empty, it fetches all data. Otherwise, it filters the countries based on the search input and selected region.
 */
function addCards(data, input, region) {
      if (input === '' && region === '') {
         fetchOfData();
      }else {
         data.forEach((country, index) => {
            const countryCard = $(`<div class="country" data-index='${index}'></div>`);
            searchMode(addDataToCard, country, countryCard, input, region)
         }
      )}
}

/**
 * Search mode function
 * @param {Function} func - The function to call if the condition is met
 * @param {Object} country - The country data object
 * @param {Object} countryCard - The country card element
 * @param {string} input - The search input value
 * @param {string} region - The selected region
 * @returns {void}
 * @description This function checks if the country name includes the input value and if the region matches the selected region. If both conditions are met, it calls the provided function with the country data and country card element.
 * It is used to filter the countries based on the search input and selected region.
 * @example
 * searchMode(addDataToCard, country, countryCard, 'Egypt', '');
 */
function searchMode(func, country, countryCard, input, region) {
      if ((country.name.toLowerCase().includes(input.toLowerCase())) && (region == '' || country.region.toLowerCase() === region.toLowerCase())) {
         func(country, countryCard);
      }
}

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

/**
 * Event handler for the "More" button click event.
 * It fetches the next chunk of data and appends it to the countries container.
 * @returns {void}
 */
function moreBtn() {
      console.log(countries.find('>:last-child').data('index'))
      fetchOfData(countries.find('>:last-child').data('index') + 1)
}

function countryDetails(country) {
   location.href = './detailed.html';
   localStorage.setItem('country', JSON.stringify(country));
}