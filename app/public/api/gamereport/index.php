<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
  gameDate,
  gameField,
  status
  FROM assigned 
  INNER JOIN game ON assigned.gameID = game.gameID
Where
assigned.status = "Declined"
AND
game.gameDate <= (SELECT CURDATE() as today FROM DUAL)';
$vars = [];

if (isset($_GET['Referee'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT 
  gameDate,
  gameField,
  status
  FROM assigned 
  INNER JOIN game ON assigned.gameID = game.gameID
Where
assigned.status = "Declined"
AND
game.gameDate <= (SELECT CURDATE() as today FROM DUAL)';

  //NOT THIS WAY
  // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];

  $vars = [ $_GET['Referee'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$gamestatus = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
header('Content-Type: text/csv');
echo "gameDate,location,status\r\n";

foreach($gamestatus as $a) {
  echo "\"".$a['gameDate'] . "\","
      .$a['gameField'] . ","
      .$a['status'] . "\r\n";
}

} else {
// Step 3: Convert to JSON
$json = json_encode($gamestatus, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
?>