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
	/**
	 * 
	 * @param {*} name 
	 * @param {*} x 
	 * @param {*} y 
	 */
	constructor(name, x, y) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.position = [x,y];
		this.symbol = new WaypointSymbol(name, x, y);
		this.airways = [];
		this.symbol.onMouseEnter = function(event) {			
			this.scale(2,2);			
			Waypoint.mouse_enter(event, this.name);		
			if (is_vectoring) {
				ac.annotation.content = DCT_TEXT;
				ac.update_dct(this.name);				
			}	
		}
		this.symbol.onMouseLeave = function(event) {			
			this.scale(0.5, 0.5);
			Waypoint.mouse_leave(event, this.name);	
			if (is_vectoring) {
				ac.update_dct();				
			}		
		}
		this.symbol.onMouseMove = function(event) {
			Waypoint.mouse_move(event, this.name);
		}
	}

	add_airway(airway) {
		this.airways.push(airway);
	}

	/** STATIC METHODS */
	static mouse_enter(event, name) {		

	}
	
	static mouse_leave(event, name) {		

	}
	
	static mouse_move(event, name) {		
		if (is_vectoring) {
			ac.annotation.content = DCT_TEXT;
		}
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
		this.segments = [start_wp, start_wp]; // segments array, each segment is a waypoint
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
	/**
	 * 
	 * @param {*} name 
	 * @param {*} x 
	 * @param {*} y 
	 * @param {*} dir_x 
	 * @param {*} dir_y 
	 */
	constructor(name, x, y, dir_x, dir_y) {
		this.name = name;
		this.speed = CONSTANT_SPEED;
		this.x = x;
		this.y = y;
		this.dir_x = dir_x;
		this.dir_y = dir_y;
		this.symbol = new AircraftLocationSymbol(name, x, y);
		let projection_x = x + dir_x * AIRCRAFT_PROJECTION_LENGTH;
		let projection_y = y + dir_y * AIRCRAFT_PROJECTION_LENGTH;
		this.projection = new AircraftProjectionLine(name, [x,y], [projection_x, projection_y]);
		this.angle = this.projection.angle();
		this.vectoring = new AircraftVectoringLine(name, [x,y], [projection_x, projection_y]);
		this.annotation = new AircraftVectoringText();		
		this.in_conflict = false;
		this.conflict_markers = {};
		this.cpa_connectors = {};
		this.resolution = { "turn_angle" : 0, "dct" : null };
		/** Event */
		this.symbol.onMouseDown = function(event) {
			Aircraft.mouse_down(this.name);			
		}
		this.symbol.onMouseUp = function(event) {
			Aircraft.mouse_up(this.name);
		}
		this.symbol.onMouseDrag = function(event) {
			Aircraft.mouse_drag(this.name, event);
		}
		this.vectoring.onMouseDrag = function(event) {
			Aircraft.mouse_drag(this.name, event);
		}
		this.symbol.onDoubleClick = function(event) {
			Aircraft.double_click(this.name, event);
		}
		this.vectoring.onDoubleClick = function(event) {
			Aircraft.double_click(this.name, event);
		}
	}


	/**
	 * Resolution update
	 */
	reset_resolution() {
		this.resolution = { "turn_angle" : 0, "dct" : null };		
	}

	update_angle(angle) {
		this.resolution.turn_angle = angle;				
	}

	update_dct(waypoint_name=null) {
		this.resolution.dct = waypoint_name;		
	}



	/**
	 * Change color of aircraft symbol depending on conflict situation
	 * @param {Boolean} conflict indicates if there's a conflict
	 */
	alert(conflict, cpa_x, cpa_y, intruder_name) {		
		if (conflict) {	
			if ( intruder_name in this.conflict_markers ) {				
				this.conflict_markers[intruder_name].position = [cpa_x, cpa_y];
				this.cpa_connectors[intruder_name].segments = [this.symbol.position, [cpa_x, cpa_y]];
			} else {
				this.conflict_markers[intruder_name] = new AircraftCPAMarker(cpa_x, cpa_y);
				this.cpa_connectors[intruder_name] = new AircraftCPAConnector(this.symbol.position, [cpa_x, cpa_y]);
			}
			this.conflict_markers[intruder_name].visible = INDICATOR;	
			this.cpa_connectors[intruder_name].visible = INDICATOR;
		}
		else if ( intruder_name in this.conflict_markers ) {				
			this.conflict_markers[intruder_name].remove();
			this.cpa_connectors[intruder_name].remove();
			delete this.conflict_markers[intruder_name];
			delete this.cpa_connectors[intruder_name];
		}
		let intruder_count = Object.keys(this.conflict_markers).length;
		this.symbol.fillColor = (INDICATOR & intruder_count > 0) ? AIRCRAFT_SYMBOL_ALERT_COLOR : AIRCRAFT_SYMBOL_COLOR; 
	}



	/**
	 * Detect conflict between this aircraft and another one
	 * @param {*} ac the aircraft to be detected with this aircraft
	 * @param {Boolean} mode mode=false detection using this projection, or mode=true using this vectoring
	 */
	is_conflict(ac, mode=false) {			
		let conflict, cpa_closure, cpa_point_0, cpa_point_1;
		let p0 = math.matrix(this.symbol.position.coords());		
		let p1 = math.matrix(ac.symbol.position.coords());
		let v0 = mode ? math.matrix(this.vectoring.getTangentAt(0).coords()) : math.matrix(this.projection.getTangentAt(0).coords());
		let v1 = mode ?   math.matrix(ac.vectoring.getTangentAt(0).coords()) :   math.matrix(ac.projection.getTangentAt(0).coords());
		let w0 = math.subtract(p0, p1);
		let dv = math.subtract(math.multiply(v0, this.speed), math.multiply(v1, ac.speed));
		let time2cpa = -(math.dot(w0, dv)) / (math.norm(dv) * math.norm(dv));			
		if (time2cpa > 0) {			
			cpa_point_0 = math.add(p0, math.multiply(v0, this.speed * time2cpa));
			cpa_point_1 = math.add(p1, math.multiply(v1,   ac.speed * time2cpa));								
			cpa_closure = math.distance(cpa_point_0, cpa_point_1);
		} else {			
			cpa_closure = math.norm(w0);
			cpa_point_0 = p0;
			cpa_point_1 = p1;
		}		
		conflict = cpa_closure < SEPARATION_MINIMA ? true : false;
		this.alert(conflict, math.subset(cpa_point_0, math.index(0)), math.subset(cpa_point_0, math.index(1)), ac.name);
		ac.alert(conflict, math.subset(cpa_point_1, math.index(0)), math.subset(cpa_point_1, math.index(1)), this.name);
	}


	/** STATIC METHODS */
	static mouse_down(name) {
		console.log(name);
		is_vectoring = true; // enter vectoring mode on mouse down an aircraft
		// if (ac) {
		// 	// if there's an ac previously selected, clear the selected ac data
		// 	ac.vectoring.visible = false; // show vectoring maneuver line
		// 	ac.annotation.visible = false; // show annotation				
		// 	ac = null;
		// }
		ac = scenario.aircrafts[name];
		ac.vectoring.visible = true; // show vectoring maneuver line
		ac.annotation.visible = true; // show annotation				
	}

	static mouse_drag(name, event) {		
		let turn_angle = Math.round(event.point.subtract(ac.projection.firstSegment.point).angle - ac.angle);
		turn_angle = turn_angle < 0 ? 360 + turn_angle : turn_angle;
		turn_angle = turn_angle <= 180 ? turn_angle : turn_angle - 360;		
		if ( -90 < turn_angle & turn_angle < 90 ) {
			ac.update_angle(turn_angle);
			is_vectoring = true;
			let normal = ac.vectoring.getNormalAt(ac.vectoring.length/2).multiply(30);
			let prefix = turn_angle < 0 ? 'L' : 'R';	
			prefix = turn_angle == 0 ? '' : prefix;			
			ac.vectoring.lastSegment.point = event.point; // update maneuver line										
			ac.annotation.point = ac.vectoring.getPointAt(ac.vectoring.length/2).add(normal);
			ac.annotation.content = prefix + Math.abs(Math.round(turn_angle)) + '°';
			scenario.detect_conflict(true);
		} else {
			is_vectoring = false;
		}		
	}

	static mouse_up(name) {		
		is_vectoring = false; // exit vectoring mode on mouse up an aircraft		
	}

	static double_click(name, event) {
		ac = scenario.aircrafts[name];
		ac.vectoring.segments = ac.projection.segments;
		ac.vectoring.visible = false;
		ac.annotation.visible = false;
		ac.reset_resolution();
		scenario.detect_conflict(true);
	}
}



/** 
 * SCENARIO CLASS
 */
class Scenario {
	/**
	 * 
	 * @param {Object} data Data generated by Python code
	 */
	constructor(data) {
		this.waypoints = {};
		this.airways = {};
		this.aircrafts = {};
		this.read_waypoint(data.waypoints);
		this.read_airway(data.airways);
		this.read_aircraft(data.aircrafts);
		this.detect_conflict(false);
	}

	read_waypoint(data) {
		let names = Object.keys(data);
		for (let i=0; i<names.length; i++) {
			let name = names[i];
			this.waypoints[name] = new Waypoint(name, data[name].x, data[name].y);
		}		
	}

	read_airway(data) {
		let names = Object.keys(data);
		for (let i=0; i<names.length; i++) {
			let name = names[i];
			this.airways[name] = new Airway(
				name, 
				this.waypoints[data[name].start],
				this.waypoints[data[name].end]
			);
		}
	}

	read_aircraft(data) {
		let names = Object.keys(data);
		for (let i=0; i<names.length; i++) {
			let name = names[i];
			this.aircrafts[name] = new Aircraft(
				name, 
				data[name].x, 
				data[name].y, 
				data[name].dir_x, 
				data[name].dir_y
			);
		}	
	}


	/**
	 * 
	 * @param {Boolean} mode mode=false using projection; mode=true using vectoring
	 */
	detect_conflict(mode) {
		let names = Object.keys(this.aircrafts);
		for (let i=0; i<names.length-1; i++) {
			for (let j=i+1; j<names.length; j++) {
				this.aircrafts[names[i]].is_conflict(this.aircrafts[names[j]], mode);
			}
		}
	}

}