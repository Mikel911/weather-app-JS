let inp = document.querySelector('.header__inp-search')
let select = document.querySelector('.header__selector-country')
let selectTown = document.querySelector('.header__selector-city')
const out = document.querySelector('.content')
let wrapper = document.querySelector('.wrapper')


let option = {
    apiUrl: 'api.openweathermap.org/data/2.5/weather',
    apiKey: 'f693d9e07e9a915e81487092d37bf063',
}

window.addEventListener('load', function () {
    let container = document.querySelector('.container');
    container.style.left = '50%';
    container.style.opacity = 1;
    container.style.scale = 1;
});

function setCity(town) {
    inp.value = ''
    fetch(`https://${option.apiUrl}?q=${town}&appid=${option.apiKey}`)
        .then(data => data.json())
        .then(data => {
            showCart(data)
            console.log(data);
        })
        .catch(err => console.log(err))
}

function setCountry() {
    fetch(`./js/city.list.min.json`)
        .then(dataCountry => dataCountry.json())
        .then(dataCountry => {
            addCountry(dataCountry)
            Select(dataCountry)
        })
        .catch(err => console.log(err))
}

class ClassCreateUser {
    constructor(data) {
        this.data = data
        this.temp = data.main.temp
        this.name = data.name
        this.icon = data.weather[0].icon
        this.temp_max = data.main.temp_max
    }
    ClassCreate() {
        let degr = Math.floor(this.temp - 273);
        let className = degr > 0 ? 'hot' : 'ice';
        let plus = degr > 0 ? '+' : ''

        let div = document.createElement('div')
        div.classList.add('cart')

        let citi = document.createElement('h2')
        citi.classList.add('cart__title')
        citi.innerText = this.name

        let temp = document.createElement('p')
        temp.classList.add('cart__degr')
        temp.classList.add(`${className}`)
        temp.innerText = `${plus + degr}°`

        let img = document.createElement('img')
        img.classList.add('cart__img')
        img.src = `https://openweathermap.org/img/wn/${this.icon}@2x.png`
        if (this.icon === "01d") {
            wrapper.style.backgroundImage = 'url(https://e0.pxfuel.com/wallpapers/935/788/desktop-wallpaper-sunny-day-bright-sunny-day.jpg)';
        } else if (this.icon === "02d") {
            wrapper.style.backgroundImage = 'url(https://rare-gallery.com/thumbs/585704-background-blue.jpg)';
        } else if (this.icon === "03d") {
            wrapper.style.backgroundImage = 'url(https://images.pexels.com/photos/1384898/pexels-photo-1384898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
        } else if (this.icon === "04d") {
            wrapper.style.backgroundImage = 'url(https://wallpapers.com/images/high/weather-pictures-9v3n98xj0fyib3sh.webp)';
        } else if (this.icon === "01n") {
            wrapper.style.backgroundImage = 'url(https://c0.wallpaperflare.com/preview/237/482/531/milky-way-night-sky-blue.jpg)';
        } else if (this.icon === "02n") {
            wrapper.style.backgroundImage = 'url(https://images.hdqwalls.com/wallpapers/night-road-blue-weather-forest-stars-4k-54.jpg)';
        } else if (this.icon === "03n") {
            wrapper.style.backgroundImage = 'url(https://c4.wallpaperflare.com/wallpaper/175/524/956/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-preview.jpg)';
        } else if (this.icon === "04n") {
            wrapper.style.backgroundImage = 'url(https://c4.wallpaperflare.com/wallpaper/620/269/155/moonlight-stars-night-clouds-sky-hd-wallpaper-preview.jpg)';
        } else if (this.icon === "10n") {
            wrapper.style.backgroundImage = 'url(https://wallpapercave.com/wp/wp7714748.jpg)';
        } else if (this.icon === "10d") {
            wrapper.style.backgroundImage = 'url(https://wallpapercrafter.com/th800/213791-rain-rainfall-storm-umbrella-free-freedom-rainy-da.jpg)';
        } else if (this.icon === "11d" || this.icon === "11n") {
            wrapper.style.backgroundImage = 'url(https://free4kwallpapers.com/uploads/originals/2018/08/25/thunderstorm.-wallpaper_.jpg)';
        } else if (this.icon === "50d") {
            wrapper.style.backgroundImage = 'url(https://rare-gallery.com/thumbs/587894-wanderlust-deep.jpg)';
        }




        let button = document.createElement('button')
        button.classList.add('cart__btn')
        button.innerText = 'Read more'

        button.addEventListener('click', () => {
            if (!button.clicked) {
                addInfo(this.data);
                button.clicked = true;
            } else {
                showCart(this.data)
            }
        })
        div.append(citi, img, temp, button)

        return div
    }
}

class NewClassCreateUser extends ClassCreateUser {
    constructor(data) {
        super(data)
        this.timeZone = data.timezone
        this.temp = data.main.temp
        this.name = data.name
        this.icon = data.weather[0].icon
        this.feels_like = data.main.feels_like
        this.temp_min = data.main.temp_min
        this.temp_max = data.main.temp_max
        this.humidity = data.main.humidity
        this.pressure = data.main.pressure
        this.sunrise = data.sys.sunrise
        this.sunset = data.sys.sunset
        this.deg = data.wind.deg
        this.gust = data.wind.gust
        this.speed = data.wind.speed
    }
    ClassCreate() {
        super.ClassCreate()
        let degr = Math.floor(this.temp - 273);
        let feels_like = Math.floor(this.feels_like - 273);
        let temp_min = Math.floor(this.temp_min - 273);
        let temp_max = Math.floor(this.temp_max - 273);
        let plus = (feels_like > 0 || temp_min > 0 || temp_max > 0 || degr > 0) > 0 ? '+' : ''
        let pressure = document.createElement('p')
        let sunrise = document.createElement('p')
        let sunset = document.createElement('p')
        let deg = document.createElement('p')
        let gust = document.createElement('p')
        let speed = document.createElement('p')
        let divMore = document.createElement('div')
        let feelsLike = document.createElement('p')
        let tempMin = document.createElement('p')
        let tempMax = document.createElement('p')
        let humidity = document.createElement('p')

        const dateSunrise = new Date(this.sunrise * 1000);
        const dateSunset = new Date(this.sunset * 1000);

        divMore.classList.add('more')
        pressure.innerText = `${ifData(this.pressure)} мм. рт. ст.`
        sunrise.innerText = `Sunrise - ${ifData(sunTime(dateSunrise, this.timeZone))}`
        sunset.innerText = `Sunset - ${ifData(sunTime(dateSunset, this.timeZone))}`

        let degDiv = document.createElement('div')
        degDiv.classList.add('deg-div')

        let arrow = document.createElement('p')
        arrow.classList.add('deg-arrow')
        arrow.innerText = "↑"
        arrow.style.transform = `rotate(${this.deg}deg)`;
        deg.innerHTML = `Wind direction - ${ifData(this.deg)}°`

        degDiv.append(deg, arrow)

        gust.innerText = `Gusts of wind to ${ifData(this.gust)} m/s`
        speed.innerText = `Wind speed - ${ifData(this.speed)} m/s`
        feelsLike.classList.add('cart__feels-like')
        feelsLike.innerText = `Feels like: ${ifData(plus + feels_like)}°`
        tempMin.classList.add('cart__min-degr')
        tempMin.innerText = `Min Temp: ${ifData(plus + temp_min)}°`
        tempMax.classList.add('cart__max-degr')
        tempMax.innerText = `Max Temp: ${ifData(plus + temp_max)}°`
        humidity.classList.add('cart__humidity')
        humidity.innerText = `Humidity: ${ifData(this.humidity)}%`

        divMore.append(feelsLike, tempMin, tempMax, humidity, pressure, sunrise, sunset, degDiv, gust, speed)

        return divMore

    }
}

function ifData(item) {
    if (item) {
        return item
    } else {
        return `no data`
    }
}

function sunTime(item) {
    const timezoneOffset = '+00:00';
    let hours = item.getHours();
    let minutes = item.getMinutes();
    let seconds = item.getSeconds();
    let time = `${hours}:${minutes}:${seconds}`;
    [hours, minutes] = time.split(':');

    let hoursInt = parseInt(hours, 10);
    let minutesInt = parseInt(minutes, 10);
    let localHours = hoursInt + parseInt(timezoneOffset, 10);
    let localMinutes = minutesInt + parseInt(timezoneOffset, 10);


    return `${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}`;
}

function showCart(data) {
    out.innerHTML = ''
    let tok = new ClassCreateUser(data)
    let resul = tok.ClassCreate()

    out.append(resul)
}

function addInfo(data) {
    let ex = new NewClassCreateUser(data)
    let resulEx = ex.ClassCreate()

    out.append(resulEx)
}


function createOption(dataCountry) {
    let option = document.createElement('option')
    option.innerText = dataCountry
    option.value = dataCountry

    return option
}

function Select(item) {
    select.addEventListener('change', () => {
        selectTown.innerHTML = ''
        addTown(item)
    })
}

function addCountry(dataCountry) {
    let arr = []
    itemSort(dataCountry)
    dataCountry.map(item => {
        arr.push(item.country)
    })

    let optionArr = new Set(arr)

    optionArr.forEach(item => {
        select.append(createOption(item))
    })
}

function addTown(item) {
    let arr = []
    itemSort(item)
    item.map(item => {
        if (select.value === item.country) {
            arr.push(item.name)
        }
    })

    let optionArr = new Set(arr)

    optionArr.forEach(item => {
        selectTown.append(createOption(item))
    })
}

function itemSort(item) {
    return item.sort((a, b) => {
        if (a.country > b.country) {
            return 1;
        } else if (a.country < b.country) {
            return -1;
        } else {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            } else {
                return 0;
            }
        }
    });
}

selectTown.addEventListener('click', () => {
    if (!(selectTown.value === '')) {
        setCity(selectTown.value)
    }

})

inp.addEventListener('change', () => {
    if (inp.value === '') {
    } else {
        setCity(inp.value)
    }

})

// main animation




setCountry()