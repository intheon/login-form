<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'hiya';

$connection = mysqli_connect($host, $username, $password, $database);

// check which function to execute

if ($_POST['type'] == "existing"){
	existingUser();
}
if ($_POST['type'] == "new"){
	newUserCheck();
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
			echo "correct=true";
		}
		else {
			echo "correct=false";
		}
	}

}

function newUserCheck(){		// obviously want to check if this username already exists.
	if (isset($_POST['username'])){
		$username = mysql_real_escape_string($_POST['username']);
		global $connection;

		$query = mysqli_query($connection,"SELECT tbl_username FROM login WHERE tbl_username='$username'");

 		if (mysqli_num_rows($query) != 0){
      		echo "username=exists";
  		}

  		else{
    		addNewUser();
  		}
	}
}


function addNewUser(){
	global $connection;
	$php_timestamp = time();
	$php_timestamp_date = date("d F Y", $php_timestamp);
	$username = mysql_real_escape_string($_POST['username']);
	$password = mysql_real_escape_string($_POST['password']);
	$firstname = mysql_real_escape_string($_POST['firstname']);
	$lastname = mysql_real_escape_string($_POST['lastname']);
	$email = $_POST['email'];
	$dateCreated = $php_timestamp_date;

	$sql = mysqli_query($connection,"INSERT INTO login (
									tbl_username,
									tbl_password,
									tbl_firstname,
									tbl_lastname,
									tbl_email,
									tbl_dateCreated) 
									VALUES (
									'$username',
									'$password',
									'$firstname',
									'$lastname',
									'$email',
									'$dateCreated')"
									);
	echo "username=created";
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