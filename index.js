//set eventListeners:
let locSelect = document.getElementById('locationSelector');
locSelect.addEventListener('change', e => {
    getPoints(e.target.value);
})

//start code
getPoints(locSelect.value);



//start functions
function getUserLocation() {
    const successCallback = (position) => {
        let concatinatePos = (position.coords.latitude).toFixed(4).toString() + ',' + (position.coords.longitude).toFixed(4).toString();
        //console.log(concatinatePos)
        return concatinatePos;
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
                    popDaily(data.properties.periods);
                });
                    //getWeather(dataObj.properties.forecast)
                    //console.log(dataObj);
            });

}

function getWeather(url) {

}

function correctInput(input) {
    let temp = input.split(',');
    let x = (parseFloat(temp[0]).toFixed(4)).toString();
    let y = (parseFloat(temp[1]).toFixed(4)).toString();
    return (x + ',' + y).replace(/\s+/g, '');
}

function popDaily(dailyArr) {
    //console.log(dailyArr);
    let weatherArray = [];
    dailyArr.forEach(time => {
        let x = {
            name: time.name,
            icon: time.icon,
            temp: time.temperature,
            unit: time.temperatureUnit,
            windSpeed: time.windSpeed,
            dir: time.windDirection
        }
        weatherArray.push(x);
    })
    console.log(weatherArray);
}














/*
const finalArr = new Map();
let url = 'https://api.weather.gov/gridpoints/LWX/30,77/forecast/hourly';
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(x => {
        const dataHead = x;
        const tempArr = dataHead.properties.periods;

        let iter, time, temp;
        iter = 0;
        console.log(tempArr);
        let target = tempArr[0];
        //let testImg = document.getElementById('head');
        //let img = document.createElement('img');
        let imgSrc = target.icon.split(',')[0];
        //img.src = imgSrc;
        //testImg.append(img);
        //console.log(tempArr[0]);

        for(element in tempArr) {
            //console.log('iterator = ' + iter);
            time = tempArr[iter].startTime;
            time = time.slice(11,16);
            temp = tempArr[iter].temperature + 'F';
            finalArr.set(time, temp);
            ++iter;
        }

        // TEST COMMENT 
        
        
        //console.log(time);
        //console.log(temp);
        console.log(finalArr);
    });

    */