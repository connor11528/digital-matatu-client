'use strict';

angular.module('digitalMatatuClientApp').controller('MainCtrl', ['$scope', '$rootScope', 'Route', function ($scope, $rootScope, Route) {
    $scope.matchingRoutes = []

    // find route id from the route 'short_name'
    $scope.findMatches = function(routeNum){
        var allRoutes = $rootScope.routes;
        $scope.matchingRoutes = []
        $scope.notFound = null

        angular.forEach(allRoutes, function(route, route_id){
            var toDraw = {}
            if(route.short_name === routeNum){
                var id = { route_id: route_id }
                // route user wants to draw
                angular.extend(toDraw, route, id)

                $scope.matchingRoutes.push(toDraw)
            }
        })

        if($scope.matchingRoutes.length === 0){
            $scope.notFound = 'No routes match ' + routeNum
        }
    };

    $scope.drawRoute = function(route_id){
        console.log(route_id)
        // draw the route on the map
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