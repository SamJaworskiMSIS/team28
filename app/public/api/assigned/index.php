<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT a.id, r.name, a.status, g.gameDate,g.gameField 
FROM referee r, assigned a, game g WHERE r.refID = a. refID AND a.gameID = g.gameID';
$vars = [];

// if (isset($_GET['guid'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM Patient WHERE patientGuid = ?';
//   $vars = [ $_GET['guid'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$students = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($students, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;