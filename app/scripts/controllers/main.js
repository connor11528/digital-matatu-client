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

        // no matches
        if($scope.matchingRoutes.length === 0){
            $scope.notFound = 'No routes match ' + routeNum
        }
    };

    $scope.drawRoute = function(route_id){

        var pathName = 'path' + route_id.toString();

        // draw the route on the map
        Route.getCoords(route_id).then(function(shape){

            // reformat coordinates array
            var pathPoints = []
            angular.forEach(shape.data, function(point){
                pathPoints.push({ lat: point[1], lng: point[2] })
            })

            // configure the path data
            var pathConfig = { allPaths: {} }
            pathConfig['allPaths'][pathName] = {
                color: '#008000',
                weight: 8,
                latlngs: pathPoints
            };
            angular.extend($scope, pathConfig)
            console.log($scope.allPaths)
        })
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