<?php 

$exercise_dir = '../data/scenarios/';
$exercise = $_GET['exercise'];
$exercise_path = $exercise_dir . $exercise;

if ( file_exists($exercise_path) ) {
    $exercise_data = file_get_contents($exercise_path);
    $result = array(
        "status" => true,
        "msg" => "You requested exercise " . $exercise,
        "data" => $exercise_data
    );
} else {
    $result = array(
        "status" => false,
        "msg" => "Requested exercise (" . $exercise . ") does not exist.",        
    );
}
exit(json_encode($result));

?>