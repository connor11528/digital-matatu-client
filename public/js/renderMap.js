// render map to DOM after ajax request completes
//=================================================

$(document).bind('ajaxStop', function(){
	var $routeInfo = $('#route-info');
	var url = window.location.href;
	var routeName = getName(url);
	
	// find matching route object
	$.each(window.busRoutes, function(index, route){
		if (route.name === routeName){
			// output route info to DOM
			var output = Mustache.render('<dl class="dl-horizontal">'
				+ '<dt>Descriptor</dt>'
				+ '<dd>{{descriptor}}</dd>'
				+ '<dt>Name</dt>'
				+ '<dd>{{name}}</dd>'
				+ '<dt>Start</dt>'
				+ '<dd>{{start.lat}}, {{start.lon}}</dd>'
				+ '<dt>End</dt>'
				+ '<dd>{{end.lat}}, {{end.lon}}</dd>'
				+ '</dl>', route);
			$routeInfo.hide().fadeIn(500).append(output);
			
			// make map for route
			makeMap(route);
		}
	});
});

// get value from first url key
function getName(url){
	var firstUrlParam = window.location.search.substring(1);	// tricky shit
	var name = firstUrlParam.split('=')[1];
	return name;
}
