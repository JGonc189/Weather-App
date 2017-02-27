var API_KEY = "c1524ea03b69c7ad78555ca26d3ac4b8";
var celsius = false;
var weatherData;

// toggle from Farenheight to Celsius & round the number
function displayTemp(fTemp, c) {
	// Check for Celsius 
	if(c) return Math.round((fTemp - 32) * (5/9)) + " C";	
	// Farenheight
	return Math.round(fTemp) + " F";
}

// render the data

function render(weatherData, celsius){

	var currentLocation = weatherData.name;
	var currentWeather = weatherData.weather[0].description;
	var currentTemp = displayTemp(weatherData.main.temp, celsius);
	var highTemp = displayTemp(weatherData.main.temp_max, celsius);
	var lowTemp = displayTemp(weatherData.main.temp_min, celsius);
	var humidity = weatherData.main.humidity; 
	var icon = weatherData.weather[0].icon;

	// add to document
										
	$('#currentLocation').html(currentLocation); 
	$('#currentTemp').html(currentTemp);
	$('#currentWeather').html(currentWeather);
	$('#humidity').html(humidity);
	$('#high-low').html(highTemp + " / " + lowTemp);

	// prepend img tag onto document
						
	var weatherImage = "http://openweathermap.org/img/w/" + icon + ".png";
	$('#currentTemp').prepend('<img src=' + weatherImage + '>');
}

$(function(){
	// We want to get the Lattitude and Longitude for our user
	var location;

	$.getJSON('http://ipinfo.io', function(data){
  		
  		location = data.loc.split(",");
  		console.log(location);

  		// Call to Weather API
  		
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
					+ location[0] + '&lon=' + location[1] + '&APPID=' + API_KEY, function(apiData){
			weatherData = apiData;
			console.log("Recieved Data ,", weatherData);


			render(weatherData, celsius);
						
			$('#toggle').click(function(){
				celsius = !celsius;
				render(weatherData, celsius);
			});
		});  		
	});
});
