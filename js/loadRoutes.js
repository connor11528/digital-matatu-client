// load routes and inject info into the DOM
$(function(){
	$.ajax({
		type: 'POST',
		url: 'http://flash-cast-hrd.appspot.com/api/sonar/sync', 
		data: {
			source: 5,
			auth: authToken
		}, 
		success: displayData
	});
	
	
});

function displayData(data){
	var $routes = $('#routes'),
		jsonObj = $.parseJSON(data),
		routes = jsonObj.routes;	// array of objects
		
	$.each(routes, function(index, route){
		
		var routeDescription = route.descriptor,
			routeNumber = route.name,
			routeColor = route.color;
		
		var routeCoords = $.parseJSON(route.geo).coordinates;
		coordString = '';
		$.each(routeCoords, function(index, coord){
			coordString += coord.coordinates[0] + '|via: ' + coord.coordinates[0]
			});
		
		$routes.append(
			'<tr>'
			+ '<td>' + routeDescription + '</td>'
			+ '<td>' + coordString + '</td>'
			+ '<td>' + routeNumber + '</td>' 
			+ '<td>' + routeColor + '</td>'
			+ '</tr>');
	});
	
	stages = jsonObj.stages;	// really big
	console.log(stages);
}
