<?php

require_once 'database.php';

date_default_timezone_set('Asia/Singapore');


if ( $_POST['action'] == 'save') {

    $data = array(
        "name" => $_POST['name'],
        "exercise" => $_POST['exercise'],
        "scenario_index" => $_POST['scenario_index'],
        "scenario_data" => $_POST['scenario_data'],
        "resolution_data" => $_POST['resolution_data'],
        "datetime" => date('Y-m-d H:i:s'),    
    );
    
    $insert_result = $db->insert('conflict_resolution', $data);
    $result = array("status" => $insert_result);
    exit(json_encode($result));
}
?>