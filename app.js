const showFilters = document.querySelector('.show-filters');
const filters = document.querySelector('.filters');

showFilters.addEventListener('click', function(){
filters.classList.toggle('active');
});

// API

fetch('https://restcountries.eu/rest/v2/all')
.then(res => res.json())
.then(data => console.log(data))