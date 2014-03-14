// Leaflet map stuff
var nairobi = [-1.282836, 36.829201]

var map = L.map('map').setView(nairobi, 12);

L.tileLayer('http://{s}.tile.cloudmade.com/2515f952e6c3418488627c3e24cd773b/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);


// GET all routes
$.ajax({
	type:'GET',
	dataType:'jsonp',
	url: 'http://digitalmatatus.herokuapp.com/api/v1/routes',
	success: function(data){
		var $routes = $('#routes');

		$.each(data, function(key, route){
			route['route_id'] = key;	// add route_id to route object
			
			$routes.append("<div class='btn btn-default input-block-level' id=" + route.route_id + '>' + route.short_name + ' - ' + route.description + '</div>');
		})
	}
}).success(function(){
	// on click, request data and draw route to map
	$('.input-block-level').on('click', function(){
		var shape_id;
		var route_id = $(this).attr('id');

		// get shape_id
		$.ajax({
			type:'GET',
			dataType:'jsonp',
			url: 'http://digitalmatatus.herokuapp.com/api/v1/routes/getShape/' + route_id
		}).success(function(data){
			
			// draw route once we have shape_id
			shape_id = data;

			$.ajax({
				type:'GET',
				dataType:'jsonp',
				url: 'http://digitalmatatus.herokuapp.com/api/v1/shapes/' + shape_id,
				success: drawRoute
			});
		})
	})
})

function drawRoute(data){
	var pointList = [];
	$.each(data, function(index, shape){
		var point = new L.LatLng(shape[1], shape[2]);
		pointList.push(point);
	})
	var polyLine = new L.Polyline(pointList, {
		color: 'red',
		weight: 4,
		opacity: 0.5,
		smoothFactor: 1
	}).addTo(map);
}