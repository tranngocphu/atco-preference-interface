/**
 * Function to navigate NEXT/BACK scenarios
 * @param {*} next next=1 or 0
 */
function navigate(next) {
    if ( !$('#user').val() ) {
        alert("Please enter Your Name to continue.");
        return
    }

    if ( !$('#exercise').val() ) { 
        alert("You must choose an exercise to continue.");
        return
    }

    if (next) {
        if (index<n-1) {
            index += 1;
            remove_all();
            scenario = new Scenario(data[index]);       
        } else {
            alert("Data saved! Also end of exercise reached. Thank you!");
        }        
    } else {
        if (index>0) {
            index -= 1;
            remove_all();
            scenario = new Scenario(data[index]);
        } else {
            alert("Data saved! And you're at the first scenario of this exercise."); 
        } 
    }
    $('#current-index').html(`${index+1}/${n}`);
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



/**
 * Function to show data 
 */
function show_data(data) {
    $('#data').html(JSON.stringify(data));
}


/**
 * Function to request exercise data from the server
 * @param {*} name 
 */
function request_exercise(name) {
    remove_all();
    data = null;
    n = null;
    index = -1;    
    $.get( "/handlers/load.php", {exercise: $('#exercise').val()} )
        .done(function( response ) {
            response = JSON.parse(response);
            if ( response.status ) {
                $('#status').html(response.msg);
                data = JSON.parse(response.data);
                n = data.length;
                $('#current-index').html(`/${n}`);
            }                
            else
                alert(response) 
        })
}