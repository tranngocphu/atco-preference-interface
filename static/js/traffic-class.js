/*
 * File: class.js
 * File Path: /home/phu/projects/atco-preference-interface/static/js/class.js
 * Project: js
 * File Created: Thursday, 23rd April 2020 5:47:55 pm
 * Author: Phu N. Tran (phutran@ntu.edu.sg, tr.ngocphu@gmail.com)
 * Affiliation:
 * 	Air Traffic Management Research Institute,
	65 Nanyang Drive, Nanyang Technological University,
	North Spine, Block N3.2-B3M-10, 637460 Singapore
 * -----
 * Last Modified: Friday, 24th April 2020 12:38:43 am
 * Modified By: Phu N. Tran
 * -----
 */

/** 
 * WAYPOINT CLASS
 */

class Waypoint {

	constructor(name, x, y) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.position = [x,y];
		this.symbol = new WaypointSymbol(x, y);
		this.airways = [];
	}

	add_airway(airway) {
		this.airways.push(airway);
	}
	
}


/** 
 * AIRWAY CLASS
 */

class Airway {	
	/**
	 * 
	 * @param {string} name name of the airway
	 * @param {WaypointObject} start_wp start waypoint
	 * @param {WaypointObject} end_wp end waypoint
	 */
	constructor(name, start_wp, end_wp) {
		this.name = name;		
		this.waypoints = [start_wp, start_wp]; // segments array, each segment is a waypoint
		this.start = start_wp.position;
		this.end   = end_wp.position;
		this.line  = new AirwayLine(start_wp.position, end_wp.position);
		start_wp.add_airway(this);
		end_wp.add_airway(this);
	}	
}


/** 
 * AIRCRAFT CLASS
 */

class Aircraft {

	constructor(name, x, y, dir_x, dir_y) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.dir_x = dir_x;
		this.dir_y = dir_y;
	}

}
