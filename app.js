// elements

const countriesEl = document.querySelector(".countries");
const filters = document.querySelectorAll(".filter");
const showFilters = document.querySelector(".filter-current");
const filtersEl = document.querySelector(".filters");
const input = document.querySelector(".search-input");
const filterSelected = document.querySelector(".filter-selected");

// getCountries

getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  displayCountries(countries);
  searchCountries();
  showDetails();
}

// displayCountries

function displayCountries(countries) {
  countriesEl.innerHTML = "";

  countries.forEach((country) => {
    countriesEl.innerHTML += `<article class="country">
    <div class="country-img">
    <img src="${country.flag}" alt="${country.name}">
    </div>
    <div class="country-about">
    <h2 class="country-name">${country.name}</h2>
    <div class="country-details">
    <p>Population: <span>${country.population}</span></p>
    <p class="country-region">Region: <span>${country.region}</span></p>
    <p>Capital: <span>${country.capital}</span></p>
    </div>
    </div>
    </article>`;
  });
}

// search

function searchCountries() {
  input.addEventListener("input", (e) => {
    const { value } = e.target;
    filterSelected.innerHTML = "Filter by Region";
    const countryName = document.querySelectorAll(".country-name");

    countryName.forEach((name) => {
      if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
        name.parentElement.parentElement.classList.remove("hide");
      } else {
        name.parentElement.parentElement.classList.add("hide");
      }
    });
  });
}

// show and hide filters

showFilters.addEventListener("click", () => {
  filtersEl.classList.toggle("active");
});

// filter countries

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const countryRegion = document.querySelectorAll(".country-region");
    filterSelected.innerHTML = filter.innerText;

    // remove active class
    filtersEl.classList.remove("active");

    countryRegion.forEach((region) => {
      if (region.innerText.includes(filterSelected.innerHTML)) {
        region.parentElement.parentElement.parentElement.classList.remove(
          "hide"
        );
      } else {
        region.parentElement.parentElement.parentElement.classList.add("hide");
      }
    });
  });
});

// Dark Mode & local storage

let darkMode = localStorage.getItem("darkMode");

const darkModeBtn = document.querySelector(".dark-mode");

const enableDarkMode = () => {
  document.body.classList.add("dark");
  // update local storage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark");
  // update local storage
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");

  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log(darkMode);
  } else {
    disableDarkMode();
    console.log(darkMode);
  }
});

// show country details

function showDetails() {
  const countryAll = document.querySelectorAll(".country");
  const overlayEl = document.querySelector(".overlay");

  countryAll.forEach((country) => {
    country.addEventListener("click", (e) => {
      const name = e.currentTarget.children[1].children[0].innerText;
      const overlayContainer = document.querySelector(".overlay-container");

      overlayEl.classList.add("show-overlay");

      // funciton
      singleCountry(name, overlayContainer);
    });
  });
  async function singleCountry(name, overlayContainer) {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    const country = await res.json();

    country.forEach((e) => {
      overlayContainer.innerHTML = `<div class="back">
    <button class="back-btn">
    <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 31.494 31.494"
    style="enable-background: new 0 0 31.494 31.494"
        xml:space="preserve"
        >
        <path
        style="fill: #1e201d"
        d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
        c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
        c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"
        />
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        </svg>
        
        <span class="back-text">Back</span>
        </button>
        </div>
        <div class="overlay-country">
        <div class="overlay-img">
        <img src="${e.flag}" alt="" />
        </div>
        <div class="overlay-details">
        <strong class="overlay-country-name">${e.name}</strong>
        <ul class="overlay-list">
        <li>Native Name: <span>${e.name}</span></li>
        <li>Population: <span class="population">${e.population}</span></li>
        <li>Region: <span>${e.region}</span></li>
        <li>Sub Region: <span>${e.subregion}</span></li>
        <li>Capital: <span>${e.capital}</span></li>
        <li>Top Level Domain: <span>${e.topLevelDomain}</span></li>
        <li>Currencies: <span>${e.currencies}</span></li>
        <li>Languages: <span>${e.languages}</span></li>
        </ul>
        <div class="overlay-border">
        <p>Border Countries:</p>
        <ul class="border-container">
        <li>Siema</li>
        <li>Siema</li>
        <li>Siema</li>
        </ul>
        </div>
        </div>
        </div>`;

      document.querySelector(".back-btn").addEventListener("click", () => {
        overlayEl.classList.remove("show-overlay");
        overlayContainer.innerHTML = "";
      });
    });
  }
}
