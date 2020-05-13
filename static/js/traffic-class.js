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
		}
		this.symbol.onMouseLeave = function(event) {			
			this.scale(0.5, 0.5);
			Waypoint.mouse_leave(event, this.name);			
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
		if (is_vectoring) {
			ac.annotation.content = DCT_TEXT;
		}
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
	}


	/**
	 * Change color of aircraft symbol depending on conflict situation
	 * @param {Boolean} conflict indicates if there's a conflict
	 */
	alert(conflict, cpa_x, cpa_y, intruder_name) {		
		if (conflict) {			
			this.conflict_markers[intruder_name] = new AircraftCPAMarker(cpa_x, cpa_y);
		}
		else {
			if ( intruder_name in this.conflict_markers ) {
				this.conflict_markers[intruder_name].remove();
				delete this.conflict_markers[intruder_name];
			}
		}
		let intruder_count = Object.keys(this.conflict_markers).length;
		this.symbol.fillColor = intruder_count > 0 ? AIRCRAFT_SYMBOL_ALERT_COLOR : AIRCRAFT_SYMBOL_COLOR; 
	}



	/**
	 * Detect conflict between this aircraft and another one
	 * @param {*} ac the aircraft to be detected with this aircraft
	 * @param {Boolean} mode mode=false detection using this projection, or mode=true using this vectoring
	 */
	is_conflict(ac, mode=false) {			
		let conflict, cpa_closure, cpa_point_0, cpa_point_1;
		let p0 = math.matrix(this.symbol.position.coords());
		let v0 = mode ? math.matrix(this.vectoring.getTangentAt(0).coords()) : math.matrix(this.projection.getTangentAt(0).coords());
		let p1 = math.matrix(ac.symbol.position.coords());
		let v1 = math.matrix(ac.projection.getTangentAt(0).coords());
		console.log(p0, v0, p1, v1);
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
		console.log(SEPARATION_MINIMA, cpa_closure);
		conflict = cpa_closure < SEPARATION_MINIMA ? true : false;
		this.alert(conflict, math.subset(cpa_point_0, math.index(0)), math.subset(cpa_point_0, math.index(1)), ac.name);
		ac.alert(conflict, math.subset(cpa_point_1, math.index(0)), math.subset(cpa_point_1, math.index(1)), this.name);
	}


	/** STATIC METHODS */
	static mouse_down(name) {
		console.log(name);
		is_vectoring = true; // enter vectoring mode on mouse down an aircraft
		if (ac) {
			ac.vectoring.visible = false; // show vectoring maneuver line
			ac.annotation.visible = false; // show annotation				
		}
		ac = aircrafts[name];
		ac.vectoring.visible = true; // show vectoring maneuver line
		ac.annotation.visible = true; // show annotation				
	}
	
	static mouse_up(name) {		
		is_vectoring = false; // exit vectoring mode on mouse up an aircraft
	}

	static mouse_drag(name, event) {		
		let turn_angle = Math.round(event.point.subtract(ac.projection.firstSegment.point).angle - ac.angle);
		turn_angle = turn_angle < 0 ? 360 + turn_angle : turn_angle;
		turn_angle = turn_angle <= 180 ? turn_angle : turn_angle - 360;
		if ( -90 < turn_angle & turn_angle < 90 ) {
			is_vectoring = true;
			let normal = ac.vectoring.getNormalAt(ac.vectoring.length/2).multiply(30);
			let prefix = turn_angle < 0 ? 'Turn left ' : 'Turn right ';	
			prefix = turn_angle == 0 ? '' : prefix;			
			ac.vectoring.lastSegment.point = event.point; // update maneuver line										
			ac.annotation.point = ac.vectoring.lastSegment.point.add(normal);					
			ac.annotation.content = prefix + Math.abs(Math.round(turn_angle)) + '°';			
		} else {
			is_vectoring = false;
		}
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

	}
}