var API_KEY = config.API_KEY;
var zipCode = ''
var inputObj = document.getElementById('input')
var buttonObj = document.getElementById('button')
var dangerObj = document.getElementById('danger')
var dangerObjClose = document.getElementById('close')


// search button functionality
buttonObj.addEventListener('click', function() {
    zipCode = inputObj.value;
    fetch('http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&units=imperial&appid='+API_KEY)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('weather').innerHTML = data.weather['0'].description
        document.getElementById('temperature').innerHTML = Math.round(data.main.temp)
        document.getElementById("city").innerHTML = data.name
    })
    //
    .catch(error => dangerObj.style.display = 'block')
})

// alert danger close button
dangerObjClose.addEventListener('click', function(){
    dangerObj.style.display = 'none'
})

