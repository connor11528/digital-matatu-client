var $routes = $('#routes').hide();

// on load
$(function(){
	var $loading = $('#loading');
	
	// loading spinner with ridiculous amount of options
    var opts = {
            lines: 10, // The number of lines to draw
            length: 100, // The length of each line
            width: 50, // The line thickness
            radius: 20, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 25, // Top position relative to parent in px
            left: 25 // Left position relative to parent in px
        };
        
	var target = document.getElementById('loading');
	var spinner = new Spinner(opts).spin(target);
	
	// show while waiting for ajax
    $(document).bind('ajaxStart', function(){
        $loading.show();
    }).bind('ajaxStop', function(){
		// fade out spinner, fade in <ul>
        $loading.fadeOut('slow');
        $routes.fadeIn(400);  
        console.log($routes);
    });
    
	// get data
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

// callback function to display routes
function displayData(data){
	var dataObj = $.parseJSON(data),
		busRoutes = [],
		routes = dataObj.routes;	// array of objects
	
	// loop over each route object	
	$.each(routes, function(index, route){
		
		// find waypoints
		var waypoints = match_stages(route.stage_ids, dataObj);
		
		var routeObj = {
			'descriptor': route.descriptor,
			'name': route.name,
			'color': route.color,
			'waypoints': waypoints,
			'start': waypoints[0],
			'end': waypoints[waypoints.length - 1]
		};

		// add to array
		busRoutes.push(routeObj);
		
		// add to DOM
		var output = Mustache.render(
			'<tr>'
			+ '<td>'
				+ '<a href="route.html">{{descriptor}}</a>'
			+ '</td>'
			+ '<td>{{name}}</td>'
			+ '<td>{{start.lat}}, {{start.lon}}</td>'
			+ '<td>{{end.lat}}, {{end.lon}}</td>'
			+ '<td>{{color}}</td>' 
			+ '<td>'
				+ '{{#waypoints}} { {{lat}}, {{lon}} },  {{/waypoints}}'
			+ '</td>'
			+ '</tr>', routeObj);
		
		$routes.append(output);
	});
	
	console.log(busRoutes);		// array of 35 route objects
}


// changes mustache delimeters
//~ {{=<% %>=}}
//~ {{Look at the curlies!}}
//~ <%={{ }}=%>
