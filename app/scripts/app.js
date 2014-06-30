'use strict';

var app = angular.module('digitalMatatuClientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'leaflet-directive'
]);

app.constant('ROUTE_BASE', "http://digitalmatatus.herokuapp.com/api/v1/")

// load routes data
app.run(['Route', function(Route){
	Route.loadRoutes()
}])