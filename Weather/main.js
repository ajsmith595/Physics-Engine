$(document).ready(function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos){
            
            var lat = pos.coords.latitude;
            var long = pos.coords.longitude;
            $('#coords').html(lat + "LAT ~ " + long + "LONG");
            $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, function(data){
                $('#location').html(data.name);
                $('#weather').html(data.weather[0].main);
                var desc = data.weather[0].description;
                desc = desc[0].toUpperCase() + desc.substr(1, desc.length - 1);
                $('#weather-desc').html(desc);
                $('#temp').html(data.main.temp + "&deg;C");
                
            });
        }, function(err){
            $('#coords').html("Mission failed, we'll get 'em next time");
        });
    }
    else{
        $('#coords').html("Mission failed, we'll get 'em next time");
    }
});