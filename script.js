var API_KEY = process.env.API_KEY;
var userLocation = ''
var inputObj = document.getElementById('input')
var buttonObj = document.getElementById('button')
var dangerObj = document.getElementById('danger')
var dangerObjClose = document.getElementById('close')
var cardContainer = document.getElementById('card-container')





// search button functionality
buttonObj.addEventListener('click', newSearch)

// press enter to search
inputObj.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        newSearch()
    }
});

function newSearch() {
    userLocation = document.getElementById('input').value;
    userLocation = userLocation.split(' ').join('+')
    // zip-code
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + userLocation + '&units=imperial&appid=' + API_KEY)
        .then(response => response.json())
        .then(data => {
            makeNewCard(data)

        })
        // city name
        .catch(error => fetch('http://api.openweathermap.org/data/2.5/weather?q=' + userLocation + '&units=imperial&appid=' + API_KEY)
            .then(response => response.json())
            .then(data => {
                makeNewCard(data)
            })
            .catch(error => dangerObj.style.display = 'block')
        )
}

// make a new card and append it to the search results
function makeNewCard(data) {
    var newCard = document.createElement('div')
    newCard.className = 'card'
    newCard.style = 'width: 18rem;'

    var newImg = document.createElement('img')
    newImg.className = 'card-img-top'
    newImg.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    newCard.append(newImg)

    var cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    var cardTitle = document.createElement('h1')
    cardTitle.className = 'card-title'
    cardTitle.innerHTML = Math.round(data.main.temp) + '&#8457'

    var cardText = document.createElement('div')
    cardText.classList = 'card-text'
    cardText.innerHTML = '<strong>' + data.name + '</strong>'

    var weather = document.createElement('div')
    weather.innerHTML = data.weather['0'].description

    cardBody.append(cardTitle)
    cardBody.append(cardText)
    cardBody.append(weather)

    newCard.append(cardBody)
    cardContainer.append(newCard)
}

// alert danger close button
dangerObjClose.addEventListener('click', function () {
    dangerObj.style.display = 'none'
})