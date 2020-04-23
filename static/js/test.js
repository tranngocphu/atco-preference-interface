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
 * Last Modified: Thursday, 23rd April 2020 10:03:43 pm
 * Modified By: Phu N. Tran
 * -----
 */


var path = new Path()
path.strokeColor = 'black';
var start = new Point(100, 100);
path.moveTo(start);
path.lineTo(start.add([ 200, -50 ]));
view.draw();