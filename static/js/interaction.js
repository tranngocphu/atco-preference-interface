/**
 * Function to navigate NEXT/BACK scenarios
 * @param {*} next next=1 or 0
 */
function navigate(next) {
    if (next) {
        if (index<n-1) {
            index += 1;
            remove_all();
            scenario = new Scenario(data[index]);
            $('#back-btn').prop('disabled', false);
            if (index==n-1) 
                $('#next-btn').prop('disabled', true);            
        }         
    } else {
        if (index>0) {
            index -= 1;
            remove_all();
            scenario = new Scenario(data[index]);
            $('#next-btn').prop('disabled', false);
            if (index==0) 
                $('#back-btn').prop('disabled', true);
        } 
    }     
}


/**
 * Function to remove all elements
 */
function remove_all() {    
    airway_layer.removeChildren();     
    waypoint_layer.removeChildren();  
    conflict_layer.removeChildren();  
    maneuver_layer.removeChildren();  
    aircraft_layer.removeChildren();  
    text_layer.removeChildren();
    scenario = null;      
}