
 async function weatherApIFetch(Location,unit){
    try{
const respone = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(Location)}?unitGroup=${unit}&include=current&key=AVKCCPVFKY7EJSH4MVGE763BS&contentType=json`
        );
const data = await respone.json();

        const weatherInfo = {
            location: data.resolvedAddress,
            temperature: data.currentConditions.temp,
            feelsLike: data.currentConditions.feelslike,
            humidity: data.currentConditions.humidity,
            conditions: data.currentConditions.conditions,
            description: data.description,
            windSpeed: data.currentConditions.windspeed,
            windDirection: data.currentConditions.winddir,
            pressure: data.currentConditions.pressure,
            visibility: data.currentConditions.visibility,
            cloudCover: data.currentConditions.cloudcover,
            icon: data.currentConditions.icon
        };
return weatherInfo;
    } catch(error){
        alert(error.message)
    }
}


// console.log(weatherApIFetch(`agaro`))
let cityName;
const form =document.querySelector(`form`);
const city = document.querySelector(`.location-name`)
const temperature = document.querySelector(`.temperature`)
const condition = document.querySelector(`.weather-condition`)
const humidity = document.querySelector(`#humidity`)
const wind = document.querySelector(`#wind`)
const visiblity =document.querySelector("#visibility");
let currentunit ="metric";
const unitChangeBtn = document.querySelector(`.unit-btn`)

unitChangeBtn.addEventListener(`click`,async ()=>{
currentunit = toggleScale(currentunit)
loading.classList.remove("hidden");
    const infoReturned =  await weatherApIFetch(cityName,currentunit);
        console.log(infoReturned);
        city.textContent=  infoReturned.location;
        temperature.textContent=  infoReturned.temperature + (currentunit=="metric"?  "°C":"°F");
        condition.textContent=  infoReturned.conditions;
        humidity.textContent= infoReturned.humidity + `%`;
        wind.textContent= infoReturned.windSpeed;
        visiblity.textContent= infoReturned.visibility;
    loading.classList.add(`hidden`)

})

form.addEventListener(`submit`,async (event)=>{
    event.preventDefault();
    let data = new FormData(form)
      cityName = data.get("city-name");
      loading.classList.remove("hidden");
      const infoReturned =  await weatherApIFetch(cityName,currentunit);
        console.log(infoReturned);
        city.textContent=  infoReturned.location;
        temperature.textContent=  infoReturned.temperature+(currentunit=="metric"?  "°C":"°F");
        condition.textContent=  infoReturned.conditions;
        humidity.textContent= infoReturned.humidity + `%`;
        wind.textContent= infoReturned.windSpeed;
        visiblity.textContent= infoReturned.visibility;
        loading.classList.add(`hidden`)


    form.reset()
})
function toggleScale(unit){
    return unit=="metric"? "us" : "metric"
}

//////////////////////////////////////////////////////////
const loading = document.querySelector(`.loading`)
