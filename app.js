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
    const countryName = document.querySelectorAll(".country-name");
    filterSelected.innerHTML = "Filter by Region";

    countryName.forEach((name) => {
      console.log(name.innerHTML);
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
