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
 * Last Modified: Thursday, 23rd April 2020 10:39:33 pm
 * Modified By: Phu N. Tran
 * -----
 */


/** GLOBAL CONSTANTS */
const PAPER_SIZE = 900;
const PAPER_WIDTH  = PAPER_SIZE;
const PAPER_HEIGHT = PAPER_SIZE;
const BG_COLOR = "#292929";
 

/*************************************************/

// Paper setup
let canvas = document.getElementById('myCanvas');
canvas.width = PAPER_WIDTH;
canvas.height = PAPER_HEIGHT;
view.Size = [PAPER_WIDTH, PAPER_HEIGHT];


// Add a rectangle as a bg layer
let bg = new Path.Rectangle({
    point: [0, 0],
    size: [PAPER_WIDTH, PAPER_HEIGHT],
    fillColor: BG_COLOR,
    strokeColor: '',
    strokeWidth: 0,
    visible: true
});