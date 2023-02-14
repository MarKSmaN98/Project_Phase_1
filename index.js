//set eventListeners:
let locSelect = document.getElementById('locationSelector');
locSelect.addEventListener('change', e => {
    getPoints(e.target.value);
})
let locBtn = document.getElementById('locBtn');
locBtn.addEventListener('click', e => {
    getUserLocation();
})
let formSub = document.getElementById('geoInput');
formSub.addEventListener('submit', e => {
    e.preventDefault();
    let userInput = correctInput(e.target.input.value);
    e.target.reset();
    getPoints(userInput);
})

let OverallWeatherData;

//start code
getPoints(locSelect.value);



//start functions
function getUserLocation() {
    const successCallback = (position) => {
        let concatinatePos = (position.coords.latitude).toFixed(4).toString() + ',' + (position.coords.longitude).toFixed(4).toString();
        //console.log(concatinatePos)
        getPoints(concatinatePos);
      };
      
    const errorCallback = (error) => {
        console.log(error);
      };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function getPoints(location) {
    let corLoc = correctInput(location);
    //console.log(corLoc);
    let url = `https://api.weather.gov/points/${corLoc}`;
    fetch(url)
        .then(res => res.json())
        .then(dataObj => {
            fetch(dataObj.properties.forecast)
                .then(res => res.json())
                .then(data => { 
                    //console.log(data);
                    renderCards(data.properties.periods);
                });
                    //getWeather(dataObj.properties.forecast)
                    //console.log(dataObj);
            });

}

function correctInput(input) {
    let temp = input.split(',');
    let x = (parseFloat(temp[0]).toFixed(4)).toString();
    let y = (parseFloat(temp[1]).toFixed(4)).toString();
    return (x + ',' + y).replace(/\s+/g, '');
}

const renderCards = (weatherArray) => {
    const cardContainer = document.getElementById('cardContainer')
    const mainCardContainer = document.getElementById('mainCardContainer')
    
    let target = cardContainer.querySelectorAll('div');
    target.forEach(element => {
        element.remove(); 
    });

    let targetTwo = mainCardContainer.querySelectorAll('div');
    targetTwo.forEach(element => {
        element.remove();
    });



    weatherArray.forEach(time => {    
        // console.log(time)
        const newCard = document.createElement('div');
        newCard.className = "card"
        newCard.innerHTML = ` 
        <h3 id = title>${time.name}</h3>
        <img id="testPic" class="weatherPic" src="${time.icon}" >
        <p id="shortForecast">${time.shortForecast}</p>
        <p id="temp">${time.temperature} ${time.temperatureUnit}</p>
        <p id="wind">${time.windSpeed} ${time.windDirection}</p>
        `
        
        cardContainer.append(newCard);

        newCard.addEventListener('click', e => {
           renderDetails(time)
        });        
    });

    weatherArray.slice(0,2).forEach(time => {
        // console.log(time)
        const newMainCard = document.createElement('div');
        newMainCard.className = 'mainCard';
        newMainCard.innerHTML = `
        <h3 id = title>${time.name}</h3>
        <img id="testPic" class="weatherPic" src="${time.icon}" >
        <p id="shortForecast">${time.shortForecast}</p>
        <p id="temp">${time.temperature} ${time.temperatureUnit}</p>
        <p id="wind">${time.windSpeed} ${time.windDirection}</p>
        `
        
        mainCardContainer.append(newMainCard);

        newMainCard.addEventListener('click', e => {
           renderDetails(time)
        });  
    })
    
}



const renderDetails = (weatherDataObject) => {
        const weatherDetailsContainer = document.getElementById('weatherDetails');
        if (time.probabilityOfPrecipitation.value == null) {
            time.probabilityOfPrecipitation.value = 0
        }
        weatherDetailsContainer.innerHTML = `
        <h4>Weather Details</h4>
        <p id="detailedforecast" class="detailSection">${weatherDataObject.detailedForecast}</p>
        <p id="probabilityOfPrecipitation" class="detailSection">${weatherDataObject.probabilityOfPrecipitation.value}% of rain</p>
        <p id="relativeHumidity" class="detailSection">Relative Humidity: ${weatherDataObject.relativeHumidity.value}%</p>
        <p id="dewpoint" class="detailSection">Dewpoint: ${weatherDataObject.dewpoint.value}</p>
        `
    }