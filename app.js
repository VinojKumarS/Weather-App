    let temperatureDescription =document.querySelector(".temperature-description");
    let temperatureDegree =document.querySelector(".temperature-degree");
    let locationTimezone =document.querySelector(".location-timezone");
    let tempIcon = document.querySelector("#temp-icon");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span") ;
let iconFile; 
window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fb432b1c02b03d4b64d1edf087066a08`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { name } = data;
          const { feels_like, temp, temp_max, temp_min } = data.main;
          const { id, icon, main } = data.weather[0];
          temperatureDegree.textContent = temp;
           locationTimezone.textContent = name;
           temperatureDescription.textContent = main;
           let celsius = (temp-32)*(5/9);
           temperatureSection.addEventListener("click", () => {
             if(temperatureSpan.textContent ==="F"){
               temperatureSpan.textContent = "C";
               temperatureDegree.textContent=Math.floor(celsius);
             }else{
               temperatureSpan.textContent="F";
               temperatureDegree.textContent = temp;
             }
           });
          if (id<250){
            tempIcon.src = './icons/storm.svg' ;
          }
          else if (id<350){
            tempIcon.src = './icons/drizzle.svg' ;
          }
          else if (id<550){
            tempIcon.src = './icons/rain.svg' ;
          }
          else if (id<650){
            tempIcon.src = './icons/snow.svg' ;
          }
          else if (id<800){
            tempIcon.src = './icons/atmosphere.svg' ;
          }
          else if (id===800){
            tempIcon.src = './icons/sun.svg' ;
          }
          else if(id>800){
            tempIcon.src = './icons/clouds.svg' ;
          }
          console.log(
            Math.round(temp - 273),
            Math.round(temp_max - 273),
            Math.round(temp_min - 273)
          );
          console.log(name);
        });
    });
  }
});
