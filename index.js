var searchbutton = document.getElementById("search")

function currentWeather(){

  var city = document.querySelector('.form-control').value
  console.log(city)


  var url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c127f37b11a1d9bfa4118867b07f57a7`

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
}

searchbutton.addEventListener('click', currentWeather)