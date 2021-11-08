<?php
  
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
    name, 
    gameDate, 
    gameField, 
    status
from referee, game, assigned;';
$vars = [];

if (isset($_GET['referee'])) {
    // This is an example of a parameterized query
    $sql = 'SELECT * FROM referee WHERE refId = ?';
  
    //NOT THIS WAY
    // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];
  
    $vars = [ $_GET['referee'] ];
  }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$report = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "Referee Name, Game Date, Status,Location\r\n";
  
    foreach($report as $o) {
      echo "\"".$o['name'] . "\","
          .$o['gameDate'] . ","
          .$o['status'] . ","
          .$o['gameField'] . "\r\n";
    }
  
  } else {
    // Step 3: Convert to JSON
    $json = json_encode($report, JSON_PRETTY_PRINT);
  
    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
  }
  ?>