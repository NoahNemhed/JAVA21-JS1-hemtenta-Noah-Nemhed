//Sparar ner submit knappen i en variabel för att kunna lägga in en eventListener som väntar på att användaren ska klicka.
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", searchWeather);

//När användaren har klickat på knappen så körs denna funktionen.
function searchWeather(){
//Kollar så att "cityName" input fieldet inte är tomt
    if(document.getElementById("cityName").value === ""){
        alert("You can't search blanc")
    }else{
// Ifall det inte är tomt så sparar jag ner användaren input i en variabel.   
    const city = document.getElementById("cityName").value

    
//Sparar ner API, URL till dagens väder prognos samt flera dagars väder prognos    
const API_KEY = "69daed935950427fbf6feb7708c14a5e"
const WeatherUrl = "https://api.weatherbit.io/v2.0/current?city=" + city + "&key=" + API_KEY + "&lang=sv" + "&response=json"   
const ForeCastUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&key=" + API_KEY + "&lang=sv" + "&response=json"

//Jag skickat en fetch till dagens väder url som jag sparade ner tidigare om fetchen lyckas så returnerar vi responsen.
//ananrs skriver vi ut ett error på sidan
fetch(WeatherUrl).then(
    function(response){
        console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            document.getElementById("error-message").textContent = 'Something went wrong. :('
        }
    })
        .then(function (text) {

            //Sparar ner alla värden i variablar ifrån apin's response
            var descriptionNode = text.data[0].weather.description
            var tempNode = Math.round(text.data[0].temp) + " °C"
            var windNode = Math.round(text.data[0].wind_spd) + " 💨"
            var humidityNode = text.data[0].rh + " %"

            var weatherIcon = new Image
            weatherIcon.src = "https://www.weatherbit.io/static/img/icons/"  + text.data[0].weather.icon + ".png"


            //Lägger in värdet från mina sparade variablar till html dokumentet genom att ta elementet ifrån dess ID
            document.getElementById("current-description").textContent = descriptionNode;
            document.getElementById("current-temp").textContent = tempNode;
            document.getElementById("current-wind").textContent = windNode;
            document.getElementById("current-humidity").textContent = humidityNode;
            document.getElementById("current-weather-img").src = weatherIcon.src       
        });

        //gör en ny fetch till flera dagars väder prognos
        fetch(ForeCastUrl).then(
            function(response){
                console.log(response);
                if(response.status>=200 && response.status<300){
                    return response.json();
                }
                else{
                    document.getElementById("error-message").textContent = 'Something went wrong. :('
                }
            })
            .then(function (text) {
                //Sparar ner antalet divs inuti forecast-weather som jag ska uppdatera med värden (hur många dagar från prognosen som ska visas)
                var totalDivs = document.getElementById("forecast-weather").children.length;

                    //Loopar igenom responset och sparar ner datumet och temperaturen samt rätt väder ikon.
                    for(var i = 0; i<text.data.length; i++){
                        var dateTime = text.data[i].datetime
                        var tempNode = Math.round(text.data[0].temp) + " °C"
            
                        var weatherIcon = new Image
                        var imgUrl = text.data[i].weather.icon
                        weatherIcon.src = "https://www.weatherbit.io/static/img/icons/"  + imgUrl + ".png"
                        //Loopar igenom alla divs i sectionen 'forecast-weather' för att uppdatera dess 'p' element 
                        //(finns säkert något mycket smidigare sett att göra detta på)
                        for(var j = 1; j<3; j++){
                               if(j=1){document.getElementById("forecast-weather").children[i].children[j].textContent = tempNode}
                               if(j=2){document.getElementById("forecast-weather").children[i].children[j].textContent = dateTime}
                        }
                        //Tar img taggen och uppdaterar src med ikon.
                        document.getElementById("forecast-weather").getElementsByTagName("img")[i].src = weatherIcon.src
                    
                    }

            });

    }
}