var API_KEY = config.API_KEY;
var zipCode = ''
var inputObj = document.getElementById('input')
var buttonObj = document.getElementById('button')

buttonObj.addEventListener('click', function() {
    zipCode = inputObj.value;
    fetch('http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&units=imperial&appid='+API_KEY)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('zip-code').innerHTML = zipCode
        document.getElementById('temperature').innerHTML = Math.round(data.main.temp)
        document.getElementById("city").innerHTML = data.name
    })
})


