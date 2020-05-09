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


/**
 *  Define the graphic symbol of a waypoint.
 *  This extends the Raster class of Paperjs. * 
 */
class WaypointSymbol extends Raster {
    constructor(x, y) {
        waypoint_layer.activate();
        super({
            source: WAYPOINT_SYMBOL_URL,
            position: [x,y]
        })
        this.scale(WAYPOINT_SYMBOL_SCALE)
    }
}

/**
 * Define the graphic line of an airway segment
 * This extends the Path class of Paperjs.
 */
class AirwayLine extends Path.Line {
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