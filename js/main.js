const mode = $('header .mode');
const countries = $('.countries');
const searchInput = $('.search-container input');
const filter = $('.search-container select');

fetchData();

mode.on('click', modeChange);

filter.on('change', function() {
   const region = $(this).val();
   let input = searchInput.val();
   if (region === 'all') {
      region = '';
   }
   fetchData(input, region);
});

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









function modeChange() {
   $('body').toggleClass('dark');
   if ($('body').hasClass('dark')) {
      mode.find('svg').removeClass('fa-regular').addClass('fa-solid');
   }else {
      mode.find('svg').removeClass('fa-solid').addClass('fa-regular');
   }
}

function fetchData(input = '', region = '') {
   countries.empty();
   fetch('../data.json')
   .then(data => data.json())
   .then(data => {
      data.forEach(country => {
         const coutryCard = $('<div class="country"></div>');
         if (input === '' && region === '') {
            coutryCard.append(`
               <img src="${country.flags.png}" loading='lazy' alt="${country.name} flag">
               <div class="info">
                  <h3 class='name'>${country.name}</h3>
                  <p><span>Population</span>: ${country.population}</p>
                  <p><span>Region</span>: ${country.region}</p>
                  <p><span>Capital</span>: ${country.capital}</p>
               </div>
            `);
            countries.append(coutryCard);
         }else {
            if ((country.name.toLowerCase().includes(input.toLowerCase())) && (region == '' || country.region.toLowerCase() === region.toLowerCase())) {
            coutryCard.append(`
               <img src="${country.flags.png}" loading='lazy' alt="${country.name} flag">
               <div class="info">
                  <h3 class='name'>${country.name}</h3>
                  <p><span>Population</span>: ${country.population}</p>
                  <p><span>Region</span>: ${country.region}</p>
                  <p><span>Capital</span>: ${country.capital}</p>
               </div>
            `);
            countries.append(coutryCard);
            }
      }
      })
   })
}