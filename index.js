const finalArr = new Map();
let url = 'https://api.weather.gov/gridpoints/LWX/30,77/forecast/hourly';
let iterator = fetch(url);
iterator
    .then(response => {
        return response.json();
    })
    .then(x => {
        const dataHead = x;
        const tempArr = dataHead.properties.periods;

        let iter, time, temp;
        iter = 0;

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