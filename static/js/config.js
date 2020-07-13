'use strict';

/*
 * File: config.js
 * File Path: /home/phu/projects/atco-preference-interface/static/js/config.js
 * Project: js
 * File Created: Thursday, 23rd April 2020 10:13:03 pm
 * Author: Phu N. Tran (phutran@ntu.edu.sg, tr.ngocphu@gmail.com)
 * Affiliation:
 * 	Air Traffic Management Research Institute,
	65 Nanyang Drive, Nanyang Technological University,
	North Spine, Block N3.2-B3M-10, 637460 Singapore
 * -----
 * Last Modified: Sunday, 3rd May 2020 4:15:50 pm
 * Modified By: Phu N. Tran
 * -----
 */

const DEBUG = true;


/** GLOBAL CONSTANTS  */
const PAPER_SIZE = 900;
const PAPER_WIDTH  = PAPER_SIZE;
const PAPER_HEIGHT = PAPER_SIZE;
const CENTER = [PAPER_WIDTH/2, PAPER_HEIGHT/2];
const BG_COLOR = "#292929";
const PY2JS_SCALE = PAPER_SIZE; 

/** GRAPHIC SETTINGS  */
const WAYPOINT_SYMBOL_URL = 'static/img/waypoint.png';
const WAYPOINT_SYMBOL_NORMAL = 0.1;
const WAYPOINT_SYMBOL_LARGE = 0.2;

const AIRWAY_LINE_WIDTH = 0.5;
const AIRWAY_LINE_COLOR = '#873f00';

const SECTOR_BOUNDARY_WIDTH = 0.7;
const SECTOR_BOUNDARY_PRIMARY_COLOR = '#ffbb00';
const SECTOR_BOUNDARY_SECONDARY_COLOR = '#ff66f0';

const AIRCRAFT_SYMBOL_SIZE = 7;
const AIRCRAFT_SYMBOL_COLOR = '#ffffff';
const AIRCRAFT_SYMBOL_ALERT_COLOR = '#15ff00';

const AIRCRAFT_TRAIL_WIDTH = 3;
const AIRCRAFT_TRAIL_LENGTH = 20;
const AIRCRAFT_TRAIL_COLOR = '#d9d9d9';
const AIRCRAFT_TRAIL_DASH = [3,3];

const AIRCRAFT_CPA_ALERT_SIZE = 5;
const AIRCRAFT_CPA_ALERT_COLOR = 'red';
const AIRCRAFT_CPA_CONNECTOR_WIDTH = 0.8;
const AIRCRAFT_CPA_CONNECTOR_DASH = [10,3];
const AIRCRAFT_CPA_CONNECTOR_COLOR = '#bd007e';

const AIRCRAFT_PROJECTION_LENGTH = 40;
const AIRCRAFT_PROJECTION_WIDTH = 1.5;
const AIRCRAFT_PROJECTION_COLOR = '#ffffff';

const AIRCRAFT_VECTORING_COLOR = 'yellow';
const AIRCRAFT_VECTORING_WIDTH = 4;

const TEXT_COLOR = 'yellow';
const TEXT_SIZE = 18;


/** SCALING AND CONVERSION */
const AIRSPACE_SIZE = 100; // in NM unit
const NM2POINT = PAPER_SIZE / AIRSPACE_SIZE;  // convert nautical miles to drawing points
const POINT2NM = AIRSPACE_SIZE / PAPER_SIZE;  // convert drawing points to nautical miles
const KTS2POINTSEC = NM2POINT*3600;           // convert knots to point/second

/** ATC SETTINGS */
let INDICATOR = true;
const DCT_TEXT = "DCT this Waypoint";
const CONSTANT_SPEED = 500*KTS2POINTSEC;      // default constant speed in points per second
const SEPARATION_MINIMA = 5*NM2POINT;         // separation standard in points
let EMPTY_RESOLUTION = { 
    "turn_angle" : null, 
    "dct" : null, 
    "last_position": null 
};



/*************************************************/

// Paper setup
let canvas = document.getElementById('airspace');
canvas.width = PAPER_WIDTH;
canvas.height = PAPER_HEIGHT;
view.Size = [PAPER_WIDTH, PAPER_HEIGHT];

// Define all layers
let background_layer = new Layer();
let airway_layer     = new Layer();
let sector_secondary_layer = new Layer();
let sector_primary_layer   = new Layer();
let waypoint_layer   = new Layer();
let graphic_layer    = new Layer();
let conflict_layer   = new Layer();
let maneuver_layer   = new Layer();
let text_layer       = new Layer();
let aircraft_layer   = new Layer();

// Add a rectangle as a bg layer
background_layer.activate();
let bg = new Path.Rectangle({
    point: [0, 0],
    size: [PAPER_WIDTH, PAPER_HEIGHT],
    fillColor: BG_COLOR,
    strokeWidth: 0,
    visible: true
});


// GLOBAL STATE VARIABLES
let data = null; // the data object storing all scenarios loaded
let n = null; // the total number of scenarios loaded
let index = -1; // index of the current scenario in the data array
let scenario = null; // the scenario being shown to the user
let resolutions; // global resolutions for history view 
let ac = null; // the last selected AC by mouse click
let is_vectoring = false;  // indicating if the user is vectoring an aircraft
let save_count = 0;