var searchbutton = document.getElementById("search")

function currentWeather(){

  var city = document.querySelector('.form-control').value
  console.log(city)


  var url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=c127f37b11a1d9bfa4118867b07f57a7`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      document.querySelector('.city-container').children[0].textContent = data.name
      document.querySelector('#icon').setAttribute('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
      document.querySelector('#daily').children[1].innerHTML = 'Tempurature: ' + data.main.temp + '&#8457'
      document.querySelector('#daily').children[2].textContent = 'Humidity: ' + data.main.humidity
      document.querySelector('#daily').children[3].textContent = 'Wind Speed: ' + data.wind.speed
    });

  var fiveday = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=c127f37b11a1d9bfa4118867b07f57a7`

  fetch(fiveday)
    .then(response => response.json())
    .then(data => {
      var sevendays = data.list.filter(el => el.dt_txt.includes("12:00:00"))
      sevendays.forEach(el => {
        // console.log(el)
        var wrapper= document.createElement('div');
        wrapper.innerHTML = `<div class="card" style="width: 9rem;">
          <div class="card-body">
              <b class="card-title">${timeConverter(el.dt)}</b>
              <img src=${"http://openweathermap.org/img/w/" + el.weather[0].icon + ".png"}>
              <p>Temp: ${el.main.temp}&#8457</p>
              <p>Humidity: ${el.main.humidity}</p>
          </div>
        </div>`

        document.querySelector('#fiveday').appendChild(wrapper)
      })
    })
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

searchbutton.addEventListener('click', currentWeather)