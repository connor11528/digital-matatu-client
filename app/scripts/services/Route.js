'use strict';

app.service('Route', ['$http', 'ROUTE_BASE', '$rootScope', function($http, ROUTE_BASE, $rootScope){

	return {
		// get all routes
		init: function(){
			$http.jsonp('http://digitalmatatus.herokuapp.com/api/v1/routes?callback=JSON_CALLBACK', { cache: true })
				.then(function(data){
					$rootScope.routes = data.data
				})
		}
	}
}])