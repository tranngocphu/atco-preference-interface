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
    save_resolution();
    if (next) {
        if (index<n-1) {
            index += 1;            
        } else {
            alert("Data saved! Also end of exercise reached. Thank you!");
            return
        }        
    } else {
        if (index>0) {
            index -= 1;
        } else {
            alert("Data saved! And you're at the first scenario of this exercise."); 
            return
        } 
    }
    remove_all();
    scenario = new Scenario(data[index]);
    $('#current-index').html(`${index+1}/${n}`);
}


/**
 * Function to remove all elements
 */
function remove_all() {
    sector_primary_layer.removeChildren();    
    sector_secondary_layer.removeChildren();
    airway_layer.removeChildren();     
    waypoint_layer.removeChildren();  
    conflict_layer.removeChildren();  
    maneuver_layer.removeChildren();  
    aircraft_layer.removeChildren();  
    text_layer.removeChildren();
    scenario = null;      
}


/**
 * Function to init global resolutions var upon loading data
 * @param {*} data 
 * @param {*} n 
 */
function init_global_resolutions(data, n) {    
    resolutions = Array(n);
    for (let i=0; i<n; i++) {
        resolution = {};
        let names = Object.keys(data[i].aircrafts);
        for (let j=0; j<names.length; j++) {
            let name = names[j];
            resolution[name] = { "turn_angle" : null, "dct" : null, "last_position": null };
        }
        resolutions[i] = resolution;
    }
}


/**
 * Function to request exercise data from the server
 * @param {*} name 
 */
function request_exercise(name) {
    $('#next-btn').prop('disabled', true);
    $('#back-btn').prop('disabled', true);
    remove_all();
    data = null;
    n = null;
    index = -1;    
    $.get( "/handlers/load.php", {exercise: $('#exercise').val()} )
        .done(function( response ) {
            response = JSON.parse(response);
            if ( response.status ) {
                $('#status').html(`${$('#exercise').val()} loaded.`);
                data = JSON.parse(response.data);
                n = data.length;
                init_global_resolutions(data, n);
                $('#current-index').html(`/${n}`);
                $('#next-btn').prop('disabled', false);
                $('#back-btn').prop('disabled', false);
            }                
            else
                alert(response) 
        })
}



/**
 * Function to send resolution to server and save
 */
function save_resolution() {
    if (index<0 | index>n-1)
        return
    let names = Object.keys(scenario.aircrafts);
    for (let i=0; i<names.length; i++) {
        let name = names[i];
        // save resolution into original data var
        data[index].aircrafts[name]['resolution'] = scenario.aircrafts[name].resolution;
        // save resolution to global resolutions var
        resolutions[index][name] = scenario.aircrafts[name].resolution;
    }
    let save_data = {
        "action" : "save",
        "scenario_index" : index,
        "exercise" : $('#exercise').val(),
        "name" : $('#user').val(),
        "scenario_data" : JSON.stringify(data[index]),
        // "resolution_data" : JSON.stringify(data[index].aircrafts),
        "resolution_data" : JSON.stringify(resolutions[index]),
    };
    $.post('/handlers/save.php', save_data)
        .done(function(response) {
            response = JSON.parse(response);
            if (response.status) {
                save_count += 1;
                $('#status').html(`Records saved: ${save_count}.`);
            } else {
                alert("Data couldn't be saved properly. Please contact us!");
            }
        })
}


$('#waypoint-cb').on('change', function(){
    waypoint_layer.visible = $('#waypoint-cb').prop('checked');
})
$('#airway-cb').on('change', function(){
    airway_layer.visible = $('#airway-cb').prop('checked');
})
