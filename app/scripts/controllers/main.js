'use strict';

angular.module('digitalMatatuClientApp').controller('MainCtrl', ['$scope', 'Route', function ($scope, Route) {

	$scope.answer = ''

	$scope.drawRoute = function(){

	}
	
	// map setup
	angular.extend($scope, {
	    nairobi: {
	        lat: -1.298815,
	        lng: 36.790717,
	        zoom: 13
	    },
		layers: {
            baselayers: {
            	googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                },
                googleTerrain: {
                    name: 'Google Terrain',
                    layerType: 'TERRAIN',
                    type: 'google'
                },
                googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                }
            }
        }
	});


}]);
    