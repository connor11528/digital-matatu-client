'use strict';

app.service('Route', ['$http', 'ROUTE_BASE', '$rootScope', '$q', function($http, ROUTE_BASE, $rootScope, $q){

	return {
		// get all routes
		loadRoutes: function(){
			$http.jsonp('http://digitalmatatus.herokuapp.com/api/v1/routes?callback=JSON_CALLBACK', { cache: true })
				.then(function(data){
					$rootScope.routes = data.data
				})
		},
		// from route_id, get shape_id
		getShapeId: function(route_id){
			return $http.jsonp(ROUTE_BASE + 'routes/getShape/' + route_id + '?callback=JSON_CALLBACK')
		},
		getCoords: function(route_id){
			var dfd = $q.defer()

			this.getShapeId(route_id).then(function(data){
				var shape_id = data.data;
				$http.jsonp(ROUTE_BASE + 'shapes/' + shape_id + '?callback=JSON_CALLBACK').then(function(data){
					// get data based on the shape_id
					dfd.resolve(data)
				}, function(err){
					console.log('err: ' + err)
					dfd.reject('Could not get data from shape_id')
				})
			}, function(err){
				console.log(err)
				dfd.reject('Could not get shape_id')
			})

			return dfd.promise
		}
	}
}])

// 'http://digitalmatatus.herokuapp.com/api/v1/routes/getShape/' + route_id

// http://digitalmatatus.herokuapp.com/api/v1/shapes/' + shape_id,

// function drawRoute(data){
// 	var pointList = [];
// 	$.each(data, function(index, shape){
// 		var point = new L.LatLng(shape[1], shape[2]);
// 		pointList.push(point);
// 	})
// 	var polyLine = new L.Polyline(pointList, {
// 		color: 'red',
// 		weight: 4,
// 		opacity: 0.5,
// 		smoothFactor: 1
// 	}).addTo(map);
// }