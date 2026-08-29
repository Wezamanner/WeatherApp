
 async function weatherApIFetch(Location){
    try{
const respone = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(Location)}?unitGroup=metric&include=current&key=AVKCCPVFKY7EJSH4MVGE763BS&contentType=json`
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

form.addEventListener(`submit`,async (event)=>{
    event.preventDefault();
    let data = new FormData(form)
      cityName = data.get("city-name");
    
      const infoReturned =  await weatherApIFetch(cityName);
        console.log(infoReturned);
        city.textContent=  infoReturned.location;
        temperature.textContent= await infoReturned.temperature+`°C`;
        condition.textContent= await infoReturned.conditions;
        humidity.textContent= await infoReturned.humidity + `%`;
        wind.textContent=await infoReturned.windSpeed;
        visiblity.textContent=await infoReturned.visibility;



    form.reset()
})
function toggleScale(scale){
    return !scale? "°C" : "°F"
}

//////////////////////////////////////////////////////////