<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'dataman';

$connection = mysqli_connect($host, $username, $password, $database);

// check which function to execute

if ($_POST['type'] == "existing"){
	existingUser();
}
if ($_POST['type'] == "new"){
	newUser();
}

function existingUser(){

	if (isset($_POST['username']) && isset($_POST['password'])){

		global $connection;

		$eUsername = $_POST['username'];
		$ePassword = $_POST['password'];

		$result = mysqli_query($connection,"SELECT tbl_username,tbl_password FROM login");

		while($row = mysqli_fetch_array($result)) {
		$uid = $row['tbl_username'];
		$pw = $row['tbl_password'];
		}

		if ($uid == $eUsername && $pw == $ePassword) {
			echo "shit works yo";
		}
		else {
			echo "incorrect credentials asshat";
		}
	}

}

function newUser(){

		echo "wow";

}


// manipulate values in db

//if (isset($_POST['reset'])){

	//$reset = $_POST['reset'];

	//if ($reset){
		
	//	$resetSql = "UPDATE weeknumbers SET weeknumber = 0 WHERE id = 1";
	//	mysqli_query($connection,$resetSql);

	//}
//}

// retreive from db

//$result = mysqli_query($connection,"SELECT * FROM weeknumbers");

//while($row = mysqli_fetch_array($result)) {
//  echo $row['weeknumber'];
//}

mysqli_close($connection);

?>