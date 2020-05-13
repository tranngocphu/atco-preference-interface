/*
 * File: test.js
 * File Path: /home/phu/projects/atco-preference-interface/static/js/test.js
 * Project: js
 * File Created: Thursday, 23rd April 2020 9:13:20 pm
 * Author: Phu N. Tran (phutran@ntu.edu.sg, tr.ngocphu@gmail.com)
 * Affiliation:
 * 	Air Traffic Management Research Institute,
	65 Nanyang Drive, Nanyang Technological University,
	North Spine, Block N3.2-B3M-10, 637460 Singapore
 * -----
 * Last Modified: Thursday, 23rd April 2020 11:56:00 pm
 * Modified By: Phu N. Tran
 * -----
 */



function generate_data() {
    
    let wp_names = ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8', 'wp9', 'wp10'];
    let aw_names = ['aw1', 'aw2', 'aw3', 'aw4', 'aw5', 'aw6', 'aw7', 'aw8', 'aw9', 'aw10'];
    let ac_names = ['ac1', 'ac2', 'ac3', 'ac4', 'ac5', 'ac6', 'ac7', 'ac8', 'ac9', 'ac10'];        
    
    let scenarios = [];    
    
    for (k=0; k<10; k++) {
        // Scenarios loop (10 scenarios)
        let scenario = { waypoints : {}, airways : {}, aircrafts : {} };
    
        for (i=0; i<wp_names.length; i++ ) {
            let name = wp_names[i];    
            scenario.waypoints[name] = {
                x : Math.random() * PY2JS_SCALE,
                y : Math.random() * PY2JS_SCALE,
            }    
        }
        
        for (i=0; i<aw_names.length; i++) {
            let name = aw_names[i];        
            let m = Math.floor(Math.random() * Math.floor(wp_names.length));
            let n = Math.floor(Math.random() * Math.floor(wp_names.length));            
            scenario.airways[name] = {
                start : wp_names[m],
                end: wp_names[n]
            }
        }
        
        for (i=0; i<ac_names.length; i++) {
            let name = ac_names[i];
            let x = Math.random() * PY2JS_SCALE;
            let y = Math.random() * PY2JS_SCALE;
            let sign_x = Math.random() < 0.5 ? -1 : 1;
            let sign_y = Math.random() < 0.5 ? -1 : 1;
            let dir_x = sign_x * Math.random() * PY2JS_SCALE;
            let dir_y = sign_y * Math.random() * PY2JS_SCALE;
            dir_x = dir_x / (Math.sqrt(dir_x**2 + dir_y**2));
            dir_y = dir_y / (Math.sqrt(dir_x**2 + dir_y**2));
            scenario.aircrafts[name] = {
                x : x,
                y : y,
                dir_x : dir_x,
                dir_y : dir_y
            }
        }       
        scenarios.push(scenario);
    }
    return scenarios
}