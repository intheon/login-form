<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'dataman';

$connection = mysqli_connect($host, $username, $password, $database);

// manipulate values in db

if (isset($_POST['reset'])){

	$reset = $_POST['reset'];

	if ($reset){
		
		$resetSql = "UPDATE weeknumbers SET weeknumber = 0 WHERE id = 1";
		mysqli_query($connection,$resetSql);

	}

}

// retreive from db

$result = mysqli_query($connection,"SELECT * FROM weeknumbers");

while($row = mysqli_fetch_array($result)) {
  echo $row['weeknumber'];
}

mysqli_close($connection);

?>