
$( document ).ready(function() {

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

$.ajax({
  method: 'GET',
  dataType: 'json',
  url: 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&mode=json&units=imperial&APPID=93b03ba103c6cabec96f47a6f650769e',
  success: function( weather_object ){ displayWeatherJsonObject( weather_object ) }
  });


//var x; 
//.ajax({
//  method: 'GET',
//  dataType: 'json',
//  url: 'http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco&mode=json&units=imperial&APPID=93b03ba103c6cabec96f47a6f650769e',
//  success: function( weather_object ){ x = returnFunction( returnJSON ) }

var displayWeatherJsonObject = function( jsonObj ){
	var objPath = '', array = false; 
	$.each( jsonObj , function( key, val ){
		objPath = key ;
		if( typeof val === 'object' ){
			$('#data-container').append( 'vvvvvvvvvv ' +key +' vvvvvvvvv</p>')
			array = Array.isArray( val ) 
			$.each( val , function( key, val ){
				objPath = Array.isArray( key ) ? '.[' + key +']' : '.' + key ;
				//if (key2type){ key2 = key2type+'['+key+']'} else { key };
				if( typeof val === 'object' ){				
					objPath += Array.isArray( key ) ? '.[' + key +']' : '.' + key ;
					$('#data-container').append( 'vvvvvvvvvv ' +key +' vvvvvvvvv</p>')
					$.each( val , function( key, val ){
											objPath += '.' + key ;
						$('#data-container').append( objPath + ' : '+val+'</p>')
					});
					} else {					
						$('#data-container').append( objPath + ' : '+val+'</p>')
					};
				});
		}else{
			$('#data-container').append( '<p>' +key +' : '+val+'</p>')
		}
		key2type = '';
		objPath = '';
	});
	}

});