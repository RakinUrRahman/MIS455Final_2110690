function startSearch() {
    var searchTerm = document.getElementById("searchBox").value.trim();
    var url = `https://restcountries.com/v3.1/name/${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
        .catch(error => {
            document.getElementById("displayArea").innerHTML = "<p>No results found or an error occurred.</p>";
        });
}

function displayData(data) {
    var displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Clear previous results

    data.forEach(country => {
        var name = country.name.common;
        var capital = country.capital ? country.capital[0] : "N/A";
        var flag = country.flags.svg;
        var currency = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
        var population = country.population.toLocaleString();
        var region = country.region;
        var languageList = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        var subregion = country.subregion || "N/A";
        var timezones = country.timezones ? country.timezones.join(", ") : "N/A";
        var startOfWeek = country.startOfWeek || "N/A";

        var card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${flag}" alt="Flag of ${name}">
            <h2>${name}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Subregion:</strong> ${subregion}</p>
            <p><strong>Timezones:</strong> ${timezones}</p>
            <p><strong>Start of Week:</strong> ${startOfWeek}</p>
            <p><strong>Languages:</strong> ${languageList}</p>


        `;

        displayArea.appendChild(card);
    });
}
