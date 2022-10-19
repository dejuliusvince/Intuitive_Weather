//step 1 :define all your html static selectors
let cityEl = document.querySelector("#city")
let cityFormEl = document.querySelector("#city-form")
let cityHeaderEl = document.querySelector("#city-header")
let tempEl = document.querySelector("#temp")
let windEl = document.querySelector("#wind")
let humidityEl = document.querySelector("#humidity")
let uviEl = document.querySelector("#uvi")

let card1HeaderEl = document.querySelector("#card1-header")
let card1TempEl = document.querySelector("#card1-temp")
let card1WindEl = document.querySelector("#card1-wind")
let card1HumidityEl = document.querySelector("#card1-humidity")

let card2HeaderEl = document.querySelector("#card2-header")
let card2TempEl = document.querySelector("#card2-temp")
let card2WindEl = document.querySelector("#card2-wind")
let card2HumidityEl = document.querySelector("#card2-humidity")

let api = "43307f36c133c1b4d80feb3644b2ab3e"
//step2: make an addEventListener on Submit and create displayDashboard - it shows current weather and last five day


function displayWeather(event) {
    event.preventDefault()
    var cityName = cityEl.value
    var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`

    fetch(urlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {

            console.log(currentData)
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${api}&units=imperial
            `
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveData) {
                    console.log(fiveData)
                    let currentDate = moment.unix(currentData.dt).format("MM/DD/YYYY")
                    let iconImage = document.createElement("img")
                    iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
                    cityHeaderEl.innerHTML = currentData.name + " " + currentDate
                    cityHeaderEl.appendChild(iconImage)

                    tempEl.textContent = currentData.main.temp
                    windEl.textContent = currentData.wind.speed + " mph"
                    humidityEl.textContent = currentData.main.humidity
                    uviEl.textContent = fiveData.daily[0].uvi

                    let card1Icon = document.createElement("img")
                    card1Icon.setAttribute("src", `http://openweathermap.org/img/wn/${fiveData.daily[1].weather[0].icon}@2x.png`)
                    card1HeaderEl.textContent = moment.unix(fiveData.daily[1].dt).format("MM/DD/YYYY")
                    card1HeaderEl.appendChild(card1Icon)
                    card1TempEl.textContent = fiveData.daily[1].temp.day
                    card1WindEl.textContent = fiveData.daily[1].wind_speed + " mph"
                    card1HumidityEl.textContent = fiveData.daily[1].humidity + "%"


                    let card2Icon = document.createElement("img")
                    card2Icon.setAttribute("src", `http://openweathermap.org/img/wn/${fiveData.daily[2].weather[0].icon}@2x.png`)
                    card2HeaderEl.textContent = moment.unix(fiveData.daily[2].dt).format("MM/DD/YYYY")
                    card2HeaderEl.appendChild(card2Icon)
                    card2TempEl.textContent = fiveData.daily[2].temp.day
                    card2WindEl.textContent = fiveData.daily[2].wind_speed + " mph"
                    card2HumidityEl.textContent = fiveData.daily[2].humidity + "%"






                })
                
                    

                })
        
}




cityFormEl.addEventListener("submit", displayWeather)






