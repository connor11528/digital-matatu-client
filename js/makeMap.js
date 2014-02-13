function makeMap(){
	// http://maps.googleapis.com/maps/api/directions/output?parameters
	// http://maps.googleapis.com/maps/api/directions/json?origin=40.64974840,-73.94998180&destination=40.65084299999999,-73.9495750&sensor=false
	// http://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA|via:Lexington,MA&sensor=false
	
	var directionsService = new google.maps.DirectionsService();
	var map = $('#mapLocation');
	
	function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom: 6,
    center: chicago
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
          location:checkboxArray[i].value,
          stopover:true});
    }
  }

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  
	$.ajax({
		type: 'GET',
		url:
		data:
		success:
	});
}
