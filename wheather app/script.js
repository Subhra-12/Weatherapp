
const api = {
    key: "97103a7cf6025f5466690d8af399326b",
    base: "https://api.openweathermap.org/data/2.5/"
}//For connecting with Openweathermap api

const con = document.querySelector('.main-container')
const search = document.querySelector(".search");//returns first element and store it in search
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);//action fire

function getInput (event) {
    event.preventDefault();//used for cancels the event if it is cancelable
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);//print on console value of search
    }
}

function getData () {
	/*it is used to request to the server and load the information in the webpages.
	 The request can be of any APIs that returns the data of the format JSON or XML.
	 This method returns a promise.*/
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {														
            return response.json();
        }).then(displayData);

}



 function displayData(response){
 	//console.log(response);
 	//if city not found or error found
 	if (response.cod === "404"){
 		const error = document.querySelector(".error");
 		error.textContent = "please enter  a valid city";
 		search.value = "";

 	} else {
 		//print searched city weather data 
 		const city = document.querySelector(".city");
 		city.innerText = `${response.name}, ${response.sys.country}`;


 		const today = new Date();//date class object for retrive date details with months and days.
 		const date = document.querySelector(".date");
 		date.innerText = dateFunction(today);


 	    const temp = document.querySelector(".temp");
 	    temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

 	    const weather = document.querySelector(".weather");
 	    weather.innerText = `Weather: ${response.weather[0].main}`;

 	    const humidity = document.querySelector(".humidity");
 	    humidity.innerHTML = `Humidity: ${Math.round(response.main.humidity)} <span>%</span>`;

 	    const tempRange = document.querySelector(".temp-range");
 	    tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

 	    const visibility = document.querySelector(".visibility");
 	    visibility.innerHTML = `Visibility: ${Math.floor(response.visibility/1000)}<span>km</span> `;

 	    const pressure = document.querySelector(".pressure");
 	    pressure.innerHTML = `Pressure: ${Math.floor(response.main.pressure)}<span>hPa</span> `;

 	    const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";


 	}

 	
 }


 function dateFunction (d){
 	  let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day}, ${date} ${month} ${year}`;
 }


 /*function showData(){
    city;
 	getInput();

 };*/
//Trying to create infinite scroll.
 window.addEventListener('scroll', () => {
 	const {scrollHeight, scrollTop, clientHeight} = document.documentElement;

 	if(scrollTop + clientHeight >= scrollHeight){
 		console.log('i am at bottom');
 		//showData();
 	}
 })