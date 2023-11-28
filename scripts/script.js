/*https://api.openweathermap.org/data/2.5/weather?q=india&appid=0433e29d2b8d3d870eb2f47425cce754&units=metric*/

const apiKey = "0433e29d2b8d3d870eb2f47425cce754";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";


 async function checkWeather(){
        let userInput = '';
        const errorMessage = document.querySelector('.error-message');
            errorMessage.style.display='none';
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click',async () => {
        userInput = Search();
        console.log(userInput);
        await getWeather(userInput);
        const Input=document.getElementById('searchInput');
        Input.value='';
    })
    const searchBox=document.getElementById('searchInput');
    searchBox.addEventListener('keydown',async (event) => {
        if(event.key==='Enter'){
            userInput = Search();
            console.log(userInput);
            await getWeather(userInput);
            const Input=document.getElementById('searchInput');
        Input.value='';
        }
    })
    
        
    async function getWeather(userInput){ 
        try {
            const errorMessage = document.querySelector('.error-message');
            errorMessage.style.display='none';
            const response = await fetch(apiURL + `&appid=${apiKey}&q=${userInput}`)
            var data = await response.json()
            console.log(data);
            const city = data.name;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const temperature = data.main.temp;
            let weather = "";
           data.weather.forEach(element => {
                weather = element.main;
                
            });
           const setWeather =document.getElementById('weatherIcon').setAttribute('src',`images/${weather}.png`);
            console.log(weather);
            document.getElementById('city').innerHTML=city;
            document.getElementById('humidity').innerHTML=`${humidity}%`
            document.getElementById('wind').innerHTML=`${windSpeed} Km/h`
            document.getElementById('temp').innerHTML=`${temperature}&deg;`
            
        } catch (error) {
            const errorMessage = document.querySelector('.error-message');
            errorMessage.style.display='block';
            console.error('Error fetching weather data:', error);
          
        }
       
    }

    
}
checkWeather()

function Search(){
    return  userInput=document.getElementById('searchInput').value;
}
