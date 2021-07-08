const KEY = 'aa3ee90c-ccc5-4f54-9ee6-b9b56935c3cd';

let nearestCity  = `https://api.airvisual.com/v2/nearest_city?key=${KEY}`

fFunc(nearestCity)
async function bFetch (){
    let variable;

    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;

    let newCity = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
    if(country != '' || state != '' || city != ''){
        variable = newCity;
    } else {
        variable = nearestCity;
    }
    console.log(city)
    fFunc(variable)
}

let btn = document.getElementById('inputs-inner-btn');
btn.addEventListener('click', bFetch);

async function fFunc(newCity){
    fetch(newCity)
    .then(response => {
        return response.json();
    })
    .then(json => {
        if(json.status == 'fail') {
            alert(`Sorry, but we haven't data about this place.`);
    }
        nearCity(json);
    })
}


    async function nearCity(json){
        let data = json.data;
        let dataWeather = data.current.weather;
        let dataPollution = data.current.pollution;

        let p1 = document.getElementById('location');
        let p2 = document.getElementById('temperature-num');
        let p3 = document.getElementById('humidity');
        let p4 = document.getElementById('day');
        let p5 = document.getElementById('quality')
        let img = document.getElementById('weatherImg')
        
        let dayWeek = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
        let dayy = new Date(dataWeather.ts);
        let dayOfWeek = dayy.getUTCDay();
        let gDay = dayWeek[dayOfWeek]

        let far = dataWeather.tp * 1.8 + 32; // °С into °F

        let wIcon = `img/temp-images/${dataWeather.ic}.png`;
        img.src = wIcon; 
        p1.innerText = data.country + ', ' + data.city;
        p2.innerText = dataWeather.tp + " / " + far.toFixed(1);
        p3.innerText = 'Humidity: ' + dataWeather.hu + '%';
        p4.innerText = gDay;
        let txt = '';
        if(dataPollution.aqius < 50){
            txt = 'Good';
        } else if (dataPollution.aqius > 50 < 100) {
            txt = 'Moderate';
        } else if (dataPollution.aqius > 100 < 150) {
            txt = 'Unhealthy for Sensitive Groups';
        } else if (dataPollution.aqius > 150 < 200) {
            txt = 'Unhealthy';
        } else if (dataPollution.aqius > 200 < 250) {
            txt = 'Very Unhealthy';
        } else {
            txt = 'Hazardous';
        }
        p5.innerText = " " + dataPollution.aqius + '% ' + txt + ' (Air Quality)';
    }
