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
        //console.log(tempArr);
        let target = tempArr[0];
        let testImg = document.getElementById('head');
        let img = document.createElement('img');
        let imgSrc = target.icon.split(',')[0];
        img.src=imgSrc;
        testImg.append(img);
        //console.log(tempArr[0]);
/*
        for(element in tempArr) {
            //console.log('iterator = ' + iter);
            time = tempArr[iter].startTime;
            time = time.slice(11,16);
            temp = tempArr[iter].temperature + 'F';
            finalArr.set(time, temp);
            ++iter;
        }

        // TEST COMMENT 
        
        */
        
        //console.log(time);
        //console.log(temp);
        console.log(finalArr);
    });