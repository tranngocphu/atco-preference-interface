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
        <div class="row h-100">
            
            <div class="col-2 my-auto text-center">
                <div>
                    <button type="button" id="back-btn" class="btn-lg" onclick="navigate(0);">SAVE<br><span class="nav-btn-text">&#171;</span></button>
                </div>
            </div>           
            
            <div class="col-8 my-auto text-center">   
                <div>Scenario index: <span id="current-index"></span></div>             
                <canvas id="airspace" width="900" height="900"></canvas>                 
            </div>            
            
            <div class="col-2 my-auto text-center">
                <div >
                    <button type="button" id="next-btn" class="btn-lg" onclick="navigate(1);">SAVE<br><span class="nav-btn-text">&#xbb;</span></button>
                </div>
            </div>  

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
    <script type="text/javascript" src="static/js/sample-data.js"></script>
    <script type="text/javascript" src="static/js/dom.js"></script>
    <script type="text/javascript" src="static/js/interaction.js"></script>
    <script type="text/javascript" src="static/js/main.js"></script>
</body>
</html>