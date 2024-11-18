
function updateTime(cityId, timezone) {
    const timeElement = document.getElementById(`${cityId}-time`);
    const dateElement = document.getElementById(`${cityId}-date`);
    const now = moment().tz(timezone);

    timeElement.textContent = now.format("h:mm:ss A");
    dateElement.textContent = now.format("MMMM Do YYYY");

    
    setTimeout(() => updateTime(cityId, timezone), 1000);
}

function addCity(cityName, timezone) {
    const container = document.querySelector(".container");

    const existingCity = document.querySelector(`#${cityName.replace(/\s+/g, "")}-container`);
    if (existingCity) {
        alert(`${cityName} is already displayed.`);
        return;
    }

    
    const cityContainer = document.createElement("div");
    cityContainer.classList.add("city");
    cityContainer.id = `${cityName.replace(/\s+/g, "")}-container`;

    cityContainer.innerHTML = `
        <div>
            <h2>${cityName}</h2>
            <div class="date" id="${cityName.replace(/\s+/g, "")}-date">Loading date...</div>
        </div>
        <div class="time" id="${cityName.replace(/\s+/g, "")}-time">Loading time...</div>
    `;

    container.insertBefore(cityContainer, container.children[2]);

    updateTime(cityName.replace(/\s+/g, ""), timezone);
}


updateTime("capeTown", "Africa/Johannesburg");
updateTime("eastLondon", "Africa/Johannesburg");


document.getElementById("city").addEventListener("change", function () {
    const selectedCity = this.value;
    const cityName = this.options[this.selectedIndex].text;

    if (selectedCity) {
        addCity(cityName, selectedCity);
    }
});