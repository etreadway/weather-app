var API_KEY = config.API_KEY;
var userLocation = ''
var inputObj = document.getElementById('input')
var buttonObj = document.getElementById('button')
var dangerObj = document.getElementById('danger')
var dangerObjClose = document.getElementById('close')



// search button functionality
buttonObj.addEventListener('click', function() {
    userLocation = document.getElementById('input').value;
    fetch('http://api.openweathermap.org/data/2.5/weather?zip='+userLocation+'&units=imperial&appid='+API_KEY)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        placeInfoOnPage(data)
        
    })
    .catch(error => fetch('http://api.openweathermap.org/data/2.5/weather?q='+userLocation+'&units=imperial&appid='+API_KEY)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                placeInfoOnPage(data)
            })
            .catch(error => dangerObj.style.display = 'block')
        )
})

// alert danger close button
dangerObjClose.addEventListener('click', function(){
    dangerObj.style.display = 'none'
})

function placeInfoOnPage(data) {
    document.getElementById('weather').innerHTML = data.weather['0'].description
    document.getElementById('temperature').innerHTML = Math.round(data.main.temp) + '&#8457'
    document.getElementById('temperature').innerHTML = Math.round(data.main.feels_like) + '&#8457'
    document.getElementById('city').innerHTML = data.name
    document.getElementById('weather-icon').src = 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png'

}