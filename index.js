//let locationSel = document.getElementById('locationSelector').value;
//let timeSel = document.getElementById('timeSel').value;

//set eventListeners:
let timeSelect = document.getElementById('timeSelector')
timeSelect.addEventListener('change', e => {
    getPoints(locSelect.value);
})
let locSelect = document.getElementById('locationSelector');
locSelect.addEventListener('change', e => {
    getPoints(e.target.value);
})

//start code
getPoints('30.2075,-97.7725')



//start functions
function getUserLocation() {
    const successCallback = (position) => {
        let concatinatePos = (position.coords.latitude).toFixed(4).toString() + ',' + (position.coords.longitude).toFixed(4).toString();
        console.log(concatinatePos)
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
            console.log(timeSelect.value);
            switch (timeSelect.value) {
                case 'daily': getWeather(dataObj.properties.forecast);
                break;
                case 'hourly': getWeather(dataObj.properties.forecastHourly);
                break;
                default: console.log('error');
                break;
        }
            //getWeather(dataObj.properties.forecast)
            //console.log(dataObj);
        });

}

function getWeather(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => { return data.properties.periods});
}

function correctInput(input) {
    let temp = input.split(',');
    let x = (parseFloat(temp[0]).toFixed(4)).toString();
    let y = (parseFloat(temp[1]).toFixed(4)).toString();
    return (x + ',' + y).replace(/\s+/g, '');
}

function popDaily(dailyArr) {
    console.log(dailyArr);
}

function popHourly(hourlyArr) {
    console.log(hourlyArr);
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