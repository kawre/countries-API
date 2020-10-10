const showFilters = document.querySelector(".filter-current");
const filters = document.querySelector(".filters");

showFilters.addEventListener("click", function () {
  filters.classList.toggle("active");
});

// API

const countiresContainer = document.querySelector(".countries");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  countiresContainer.classList.remove("hide");
  preloader.classList.add("hide");
});

// getCountries

function getCountries() {
  let loader = `<img class="preloader" src="5.gif" alt="Loading" />`;
  document.querySelector(".countries").innerHTML = loader;
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      let countriesData = ``;
      data.forEach(function (country) {
        countriesData += `<article class="country">
            <div class="country-img">
            <img src="${country.flag}" alt="${country.name}">
            </div>
            <div class="country-about">
            <h2>${country.name}</h2>
            <div class="country-details">
            <p>Population: <span>${country.population}</span></p>
            <p>Region: <span>${country.region}</span></p>
            <p>Capital: <span>${country.capital}</span></p>
            </div>
            </div>
            </article>`;
        document.querySelector(".countries").innerHTML = countriesData;
      });
    });
}

getCountries();

// Dark Mode

document.querySelector(".dark-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
