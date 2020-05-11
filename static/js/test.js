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

let data = {
    
    waypoint : {
        wp1 : {
            "x": .236,
            "y": .569
        },
        wp2 : {
            "x": .569,
            "y": .785
        },
        wp3 : {
            "x": .265,
            "y": .457
        },
        wp4 : {
            "x": .258,
            "y": .975
        },
        wp5 : {
            "x": .391,
            "y": .106
        },
        wp6 : {
            "x": .786,
            "y": .105
        },
        wp7 : {
            "x": .698,
            "y": .810
        },
        wp8 : {
            "x": .587,
            "y": .875
        },
        wp9 : {
            "x": .200,
            "y": .698
        },
        wp10 : {
            "x": .345,
            "y": .420
        }
    },

    airway : {
        aw1 : {
            start: "wp9",
            end: "wp3"
        },
        aw2 : {
            start: "wp1",
            end: "wp7"
        },
        aw3 : {
            start: "wp7",
            end: "wp5"
        },
        aw4 : {
            start: "wp3",
            end: "wp4"
        },
        aw5 : {
            start: "wp7",
            end: "wp3"
        }
    },  
}


let wp_names = ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8', 'wp9', 'wp10'];
let aw_names = ['aw1', 'aw2', 'aw3', 'aw4', 'aw5'];
let ac_names = ['ac1', 'ac2', 'ac3', 'ac4', 'ac5', 'ac6', 'ac7', 'ac8', 'ac9', 'ac10'];


for (i=0; i<wp_names.length; i++ ) {
    let name = wp_names[i];
    // x = data.waypoint[name].x * PY2JS_SCALE;
    // y = data.waypoint[name].y * PY2JS_SCALE;
    let x = Math.random() * PY2JS_SCALE;
    let y = Math.random() * PY2JS_SCALE;
    waypoints[name] = new Waypoint(name, x, y);    
}

for (i=0; i<aw_names.length; i++) {
    let name = aw_names[i];
    let start_wp_name = data.airway[name].start;
    let end_wp_name = data.airway[name].end;
    airways[name] = new Airway(name, waypoints[start_wp_name], waypoints[end_wp_name]);
}

for (i=0; i<ac_names.length; i++) {
    let x = Math.random() * PY2JS_SCALE;
    let y = Math.random() * PY2JS_SCALE;
    let sign_x = Math.random() < 0.5 ? -1 : 1;
    let sign_y = Math.random() < 0.5 ? -1 : 1;
    let dir_x = sign_x * Math.random() * PY2JS_SCALE;
    let dir_y = sign_y * Math.random() * PY2JS_SCALE;
    dir_x = dir_x / (Math.sqrt(dir_x**2 + dir_y**2));
    dir_y = dir_y / (Math.sqrt(dir_x**2 + dir_y**2));
    let name = ac_names[i];
    aircrafts[name] = new Aircraft(name, x, y, dir_x, dir_y);
}