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
const AIRWAY_LINE_COLOR = '#8f8f8f';
const AIRCRAFT_SYMBOL_SIZE = 7;
const AIRCRAFT_SYMBOL_COLOR = '#ffffff';
const AIRCRAFT_PROJECTION_LENGTH = 40;
const AIRCRAFT_PROJECTION_WIDTH = 1.5;
const AIRCRAFT_PROJECTION_COLOR = '#ffffff';
const AIRCRAFT_VECTORING_COLOR = 'yellow';
const AIRCRAFT_VECTORING_WIDTH = 4;
const TEXT_COLOR = 'yellow';
const TEXT_SIZE = 18;


/*************************************************/

// Paper setup
let canvas = document.getElementById('myCanvas');
canvas.width = PAPER_WIDTH;
canvas.height = PAPER_HEIGHT;
view.Size = [PAPER_WIDTH, PAPER_HEIGHT];

// Define all layers
let background_layer = new Layer();
let waypoint_layer   = new Layer();
let airway_layer     = new Layer();
let aircraft_layer   = new Layer();
let maneuver_layer   = new Layer();
let graphic_layer    = new Layer();
let text_layer       = new Layer();

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
let is_vectoring = false;

let waypoints = [];
let airways   = [];
let aircrafts = [];

let ac = null; // the selected AC by mouse click