<?php
// $env = parse_ini_file('.env');
// $header = $env["HEADER"];
$env = parse_ini_file('.env');


$hostname = $env["HOSTNAME"];
$username = $env["USERNAME"];
$password = $env["PASSWORD"];
$database = $env["DATABASE"];

$mySQL = new mysqli($hostname, $username, $password, $database);
if (!$mySQL) {
  die("Could not connect to the MySQL server: " . mysqli_connect_error());

  
}

?>