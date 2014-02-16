// match stage_ids to latitude, longitude
function match_stages(stage_ids, dataObj){
	var waypoints = [];
	var stages = dataObj.stages;
	$.each(stage_ids, function(index, stage_id){
		var latLng = {};
		
		
		$.each(stages, function (index, stageObj){
			var id = stageObj.id;
			
			if (stageObj.id === stage_id){
				latLng = {};
				latLng.lat = stageObj.lat;
				latLng.lon = stageObj.lon;
				waypoints.push(latLng);
			}
		});		
	});
	
	// return array of lat, lng objects
	return waypoints;
}
