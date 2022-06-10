var formEl = document.querySelector('#location-form')
var CinputEl = document.querySelector("#location")
var Cname=document.querySelector('#city-name')
var container=document.querySelector('#info')


//get city's name
var getcityname = function (event) {
    event.preventDefault();
    var location = CinputEl.value.trim();

    if (location) {
        getcitylocation(location);
        CinputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

var getcitylocation = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=3395e1384a27870e4cca8c5f991a8415";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log (data)
                    display(data.weather[0].icon,data.main.temp, data.main.humidity, data.wind.speed,"UV Index", city)
                    var Clat = data.coord.lat;
                    var Clon = data.coord.lon;
                    console.log(Clat, Clon);
                })
            }
            else {
                alert('Is it a city?')
            }
        })
        .catch(function(error){
            alert('Something is wrong here')
        })
};

var Winfo=document.createElement('div')
    Winfo.classList.add('card-body')
console.log (Winfo);

var display= function(data1, data2, data3, data4, data5,searchTerm){
    
    Cname.textContent=searchTerm.toUpperCase();

    Winfo.innerHTML='';

    //data1 value
    var condition=document.createElement('img');
    condition.src="https://openweathermap.org/img/wn/"+data1+"@4x.png"
    Winfo.appendChild(condition)
    
    //data2 value
    var temp=document.createElement("p")
    temp.textContent="Tempareture: "+data2+ " °Fareintheit"
    Winfo.append(temp);

    //data3 value
    var humidity=document.createElement('p')
    humidity.textContent="Humidity: "+data3+ "%"
    Winfo.append(humidity);

    //data4 value
    var wind=document.createElement('p')
    wind.textContent="Wind Speed"+data4+ "mph"
    Winfo.append(wind);

    //data5 value
    var UVi=document.createElement('p')
    UVi.textContent=data5+":IDK"
    Winfo.append(UVi);

    
    container.append(Winfo);
    
}

formEl.addEventListener("submit", getcityname);