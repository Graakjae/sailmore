<?php
// $env = parse_ini_file('.env');
// $header = $env["HEADER"];
// $env = parse_ini_file('.env');


// $hostname = $env["HOSTNAME"];
// $username = $env["USERNAME"];
// $password = $env["PASSWORD"];
// $database = $env["DATABASE"];

// $mySQL = new mysqli($hostname, $username, $password, $database);
// if (!$mySQL) {
//   die("Could not connect to the MySQL server: " . mysqli_connect_error());

  
// }

$server = "mysql111.unoeuro.com";
$username = "mikkelhau_dk";
$password = "Vkm86etg";
$database = "mikkelhau_dk_db";
$mySQL = new mysqli($server, $username, $password, $database);
if(!$mySQL) {
die("Could not connect to the MySQL server: " . mysqli_connect_error());
}

?>