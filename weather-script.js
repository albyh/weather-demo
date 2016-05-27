
$( document ).ready(function() {


//API CALL
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code} 

//{"_id":5746545,"name":"Portland","country":"US","coord":{"lon":-122.676208,"lat":45.523449}}
//{"_id":5856844,"name":"Kaanapali","country":"US","coord":{"lon":-156.69722,"lat":20.931669}}
//{"_id":4164143,"name":"Miami Beach","country":"US","coord":{"lon":-80.130051,"lat":25.790649}}
//{"_id":4887398,"name":"Chicago","country":"US","coord":{"lon":-87.650047,"lat":41.850029}}
//{"_id":5125771,"name":"Manhattan","country":"US","coord":{"lon":-73.966248,"lat":40.783428}}
//{"_id":5037649,"name":"Minneapolis","country":"US","coord":{"lon":-93.26384,"lat":44.979969}}

/*
    coord
        coord.lon City geo location, longitude
        coord.lat City geo location, latitude
    weather (more info Weather condition codes)
        weather.id Weather condition id
        weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
        weather.description Weather condition within the group
        weather.icon Weather icon id
    base Internal parameter
    main
        main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
        main.humidity Humidity, %
        main.temp_min Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        main.temp_max Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        main.sea_level Atmospheric pressure on the sea level, hPa
        main.grnd_level Atmospheric pressure on the ground level, hPa
    wind
        wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
        wind.deg Wind direction, degrees (meteorological)
    clouds
        clouds.all Cloudiness, %
    rain
        rain.3h Rain volume for the last 3 hours
    snow
        snow.3h Snow volume for the last 3 hours
    dt Time of data calculation, unix, UTC
    sys
        sys.type Internal parameter
        sys.id Internal parameter
        sys.message Internal parameter
        sys.country Country code (GB, JP etc.)
        sys.sunrise Sunrise time, unix, UTC
        sys.sunset Sunset time, unix, UTC
    id City ID
    name City name
    cod Internal parameter
*/
/*************************************************************************************************/
/*
$.ajax({
  method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&mode=json&units=imperial&APPID=93b03ba103c6cabec96f47a6f650769e',
  success: function(weather_data){
    console.log(weather_data)
  }
});

var to_be_run_on_server_response = function(weather_data){
  $('#container').append(weather_data.main.temp);
};

$.get('http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&mode=json&units=imperial')
.success(to_be_run_on_server_response);
*/

	var defaults = {
		labelTemp 		: "Current Temperature: ", 
		labelHigh 		: "High Temperature Today: ", 
		labelLow		: "Low Temperature Today: ",
		labelConditions : "Current Conditions: ", 
		labelWind		: "Wind Speed: ", 
		labelSunrise	: "Sunrise: ", 
		labelSunset		: "Sunset: ", 
		labelCity		: "Weather Data for: "
		};

	var cityData = [	{id : 5746545, city : 'Portland'	, divId : 'pdx'},
						{id : 4164143, city : 'Miami Beach' , divId : 'miami' },
						{id : 4887398, city : 'Chicago'		, divId : 'chicago' },
						{id : 5125771, city : 'Manhattan' 	, divId : 'manhattan' },
						{id : 5856844, city : 'Kaanapali'   , divId : 'kaanapali' },
						{id : 5037649, city : 'Minneapolis' , divId : 'minneapolis' }
					  ];

/**************E V E N T   L I S T E N E R S **************/
		
	addClickEvent = function(){

		$('li').off();

		$('li').on('click', function( event ){
			event.preventDefault();
			for (var i = 0; i < cityData.length; i++ ){
				//Only need to check the divId property not all properties (for...in)
				for (var i = 0 ; i < cityData.length ; i++ ){
					var key = 'divId';
					//console.log( "cityData[i][key] = "+cityData[i][key]+ " | '#'+this.id = "+'#'+this.id );
					if ( '#'+cityData[i][key] === '#'+this.id ){
						updateCity( cityData[i].id ); 
						highlightNav( cityData[i].divId );
						return;
					};
				};		

			};
		});
	};

/************************************************************/

	var populateCities = function() {
		cityData = cityData || [];
		var maxCities = Math.min( cityData.length , (7-1) ) //max 6 menu items
		for ( var i = 0 ; i < maxCities ; i++ ){
			$('<li />' , { 'id'   : cityData[i].divId }).appendTo( '#nav' ) ;
			$('<a />'  , { 'href' : '#',
						   'text' : cityData[i].city }).appendTo( '#'+cityData[i].divId ) ;
		};

		highlightNav( cityData[0].divId );

		//add event listener
		addClickEvent(); 

		//Refresh city data
		updateCity( cityData[0].id );
	}

	var clearWrapper = function(){
		$('.wrapper').remove();
	}

	var waitMsg = function() {
		$('<div />' , { 'id'   : 'waitWrapper' , 
						'class': 'wrapper' }).appendTo( '#data-container' ) ;	
		$('<div />' , { 'text' : 'Collecting Data... Please wait!' ,
					   'class' : 'data-title' }).appendTo( '#waitWrapper' )  ;
	}

	var updateCity = function( cityId ){ 
		var apiCity = cityId || cityData[0].id;
		var apiKey = '93b03ba103c6cabec96f47a6f650769e';
		var getUrl = 'http://api.openweathermap.org/data/2.5/weather?id='+apiCity+'&mode=json&units=imperial&APPID='+apiKey;
		displayCity( getUrl );
	};

	var highlightNav = function( target ) {
		$('li').removeClass( 'active' );
		$( '#'+target ).addClass( 'active' );
	}

	var displayCity = function( getUrl ){

		// Delete any existing city data
		clearWrapper();

		waitMsg();

		//$.getJSON( 'http://api.openweathermap.org/data/2.5/weather?id=5746545&mode=json&units=imperial&APPID=93b03ba103c6cabec96f47a6f650769e',
		$.getJSON( getUrl ,	function( data ){

			var sunrise = new Date( data.sys.sunrise * 1000 ), sunset = new Date( data.sys.sunset *1000 ); //THIS IS WRONG

			clearWrapper(); // delete wait msg

			//below should be a separate function
			
			$('<div />' , { 'id'   : data.id , 
							'class': 'wrapper' }).appendTo( '#data-container' ) ;

			$('#'+data.id).append( '<div class="data-title">'+defaults.labelCity +' '+ data.name + '</div>' );				

			if ( data.name === 'Minneapolis'){
				$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelConditions + 'Purple Rain.'+'</div>');				
			} else {
				if (data.weather[0].description){
					$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelConditions + data.weather[0].description+'</div>');				
				} else { 
					$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelConditions +'Not available at this time.</div>');	 
				}
			}
			$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelTemp + Math.round(data.main.temp) +"\u00B0"+'</div>');				
			$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelHigh +'<span id="hot">'+ Math.round(data.main.temp_max) +'</span>'+"\u00B0"+'</div>');				
			$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelLow +'<span id="cold">'+ Math.round(data.main.temp_min) +'</span>'+"\u00B0"+'</div>');				
			$('#'+data.id).append( '<div class=\'data\'>'+defaults.labelWind + Math.round(data.wind.speed) +' mph</div>');				
			//$('#'+data.name).append( '<div>'+defaults.labelSunrise + sunrise +'</div>');	
			//$('#'+data.name).append( '<div>'+defaults.labelSunset + sunset +'</div>');	
		});
	};

		populateCities();
});