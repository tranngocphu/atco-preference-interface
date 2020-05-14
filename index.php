<?php 
$exercise_dir = 'data/scenarios/';
$exercises = scandir($exercise_dir);
$exercises = array_slice($exercises, 2);
$selections = array();
foreach ($exercises as $ex) {
    $selections[$ex] = str_replace(".json", "", $ex);
}
?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>ATCO Preference Interface</title>
    <meta name="author" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="static/vendor/bootstrap.css">
    <link rel="stylesheet" href="static/css/style.css">

</head>

<body>
    <div class="container-fluid">         
    
        <div class="row">
<<<<<<< HEAD
            <div class="col-4">
=======
            <div class="col-5">
>>>>>>> e58740ea3b9bf6c9746ef6279ada3124ac6c407c
                <span>Name:</span>
                <input type="text" id="user" name="user" size="12"></input>
                <span>Exercise:</span>
                <select id="exercise" onchange="request_exercise(this.value);">
                    <option value=""></option>
                    <?php foreach ($selections as $key=>$val) : ?>
                    <option value="<?= $key ?>"><?= $val ?></option>
                    <?php endforeach; ?>
                </select>
            </div>            
<<<<<<< HEAD
            <div class="col-5">
=======
            <div class="col-4">
>>>>>>> e58740ea3b9bf6c9746ef6279ada3124ac6c407c
                <span>Scenario index: <span id="current-index"></span></span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Status: <span id="status"></span></span>
            </div>
            <div class="col-3">
                <input type="checkbox" id="waypoint-cb" name="" value="" checked>Waypoints
                &nbsp;
                <input type="checkbox" id="airway-cb" name="" value="" checked>Airways
            </div>
            
        </div>         
        <div class="row h-100">

            <div class="col-1 my-auto text-center">                           
                <div>                    
                    <button type="button" id="back-btn" class="btn-lg" onclick="navigate(0);" disabled><span class="nav-btn-text">BACK<br>&#xAB;<br>SAVE</span></button>
                </div>                
            </div>

            <div class="col-10 text-center">                  
                <canvas id="airspace" width="900" height="900"></canvas>                
            </div>            
            
            <div class="col-1 my-auto text-center">
                <div >
                    <button type="button" id="next-btn" class="btn-lg" onclick="navigate(1);" disabled><span class="nav-btn-text">NEXT<br>&#xbb;<br>SAVE</span></button>
                </div>
            </div>  

        </div>

        <div id="data">            
        </div>

    </div>

    <script type="text/javascript" src="static/vendor/jquery.min.js"></script> 
    <script type="text/javascript" src="static/vendor/bootstrap.js"></script>
    <script type="text/javascript" src="static/vendor/math.js"></script>       
    <script type="text/javascript" src="static/vendor/paper-full.js"></script>
    <script type="text/javascript">
        paper.install(window);
        paper.setup('airspace');
    </script>    
    <script type="text/javascript" src="static/js/config.js"></script>    
    <script type="text/javascript" src="static/js/graphic-class.js"></script>
    <script type="text/javascript" src="static/js/traffic-class.js"></script>        
    <script type="text/javascript" src="static/js/dom.js"></script>
    <script type="text/javascript" src="static/js/interaction.js"></script>    
</body>
</html>