/*
 * File: graphic-class.js
 * File Path: /home/phu/projects/atco-preference-interface/static/js/graphic-class.js
 * Project: js
 * File Created: Thursday, 23rd April 2020 11:58:02 pm
 * Author: Phu N. Tran (phutran@ntu.edu.sg, tr.ngocphu@gmail.com)
 * Affiliation:
 * 	Air Traffic Management Research Institute,
	65 Nanyang Drive, Nanyang Technological University,
	North Spine, Block N3.2-B3M-10, 637460 Singapore
 * -----
 * Last Modified: Friday, 24th April 2020 12:43:51 am
 * Modified By: Phu N. Tran
 * -----
 */



 /** Add a method returning JS array of x,y for a Paperjs Point */

Point.prototype.coords = function() {
    return [this.x, this.y]
}



/**
 *  Define the graphic symbol of a waypoint.
 *  This extends the Raster class of Paperjs. * 
 */
class WaypointSymbol extends Raster {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(name, x, y) {
        waypoint_layer.activate();
        super({
            source: WAYPOINT_SYMBOL_URL,
            position: [x,y]
        })
        this.scale(WAYPOINT_SYMBOL_NORMAL);
        this.name = name;
    }
}

/**
 * Define the graphic line of an airway segment
 * This extends the Path class of Paperjs.
 */
class AirwayLine extends Path.Line {
    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    constructor(start, end) {
        airway_layer.activate();
        super({
            from: start,
            to: end,
            strokeColor: AIRWAY_LINE_COLOR,
            strokeWidth: AIRWAY_LINE_WIDTH
        })
    }
}

/**
 * Define the graphic symbol of an aircraft
 * This extends the Path.Circle of Paperjs
 */
class AircraftLocationSymbol extends Path.Circle {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(name, x, y) {
        aircraft_layer.activate();
        super({
            center: [x, y],
            radius: AIRCRAFT_SYMBOL_SIZE,
            strokeWidth: 0,
            fillColor: AIRCRAFT_SYMBOL_COLOR,            
        });
        this.name = name;        
    }
}

/**
 * Define the graphic symbol of an aircraft path projection
 * This extends the Path.Line of Paperjs
 */
class AircraftProjectionLine extends Path.Line {
    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    constructor(name, start, end) {
        aircraft_layer.activate();
        super({
            from: start,
            to: end,
            strokeColor: AIRCRAFT_PROJECTION_COLOR,
            strokeWidth: AIRCRAFT_PROJECTION_WIDTH,
        });        
        this.name = name;
        this.angle = function() {
            let diff = this.lastSegment.point.subtract(this.firstSegment.point);
            return diff.angle                     
        }
    }    
}


/**
 * Define the graphic symbol of an aircraft vectoring maneuver
 * This extends the Path.Line of Paperjs
 */
class AircraftVectoringLine extends Path.Line {
    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    constructor(name, start, end) {
        maneuver_layer.activate();
        super({
            from: start,
            to: end,
            strokeColor: AIRCRAFT_VECTORING_COLOR,
            strokeWidth: AIRCRAFT_VECTORING_WIDTH    
        })
        this.name = name;
        this.visible = false;
        this.angle = function() {
            let diff = this.lastSegment.point.subtract(this.firstSegment.point);
            return diff.angle                    
        }
    }
}


/**
 * Define the graphical text of maneuver information
 * This extends the Path.Line of Paperjs
 */
class AircraftVectoringText extends PointText {
    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    constructor() {
        text_layer.activate();
        super({
            point: [0,0],
            content: '',
            fillColor: TEXT_COLOR,
            fontFamily: 'sans-serif',
            fontSize: TEXT_SIZE            
        })        
    }
}


/**
 * Define the graphical indicator of CPA location
 * This extends the Path.Circle of Paperjs
 */
class AircraftCPAMarker extends Path.Circle {
    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    constructor(x, y) {
        conflict_layer.activate();
        super({
            center: [x, y],
            radius: AIRCRAFT_CPA_ALERT_SIZE,
            strokeWidth: 0,
            fillColor: AIRCRAFT_CPA_ALERT_COLOR,
        })
        this.visible = true;
    }
}