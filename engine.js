function showElement(v){
	var elToShow = document.getElementById(v);
	elToShow.style.display = "block";

	if (v == "newUser" || v == "existUser"){
		document.getElementById("btnNew").style.display = "none";
		document.getElementById("btnExist").style.display = "none";
	}
}

var fieldNames = ["username=","password=","firstname=","lastname=","email="];
var result;

function getInput(){
	var arr = [];
	var postData = "";

	// gets the arguments passed to it
	for (i = 0; i < arguments.length; i++){
		arr.push(arguments[i]);
	}

	// constructs a query string to POST to PHP
	function cycleThroughArgs(){
		for (i = 0; i < arr.length - 1; i++){
			if (i < 1 ){
				postData = fieldNames[i] + arr[i + 1];
			}
			else {
				postData += "&" + fieldNames[i] + arr[i + 1];
			}
		}
	}

	if (arr[0] == 'existing'){
		cycleThroughArgs();
		postData += "&type=existing";
	}

	if (arr[0] == 'new'){
		cycleThroughArgs();
		postData += "&type=new";
	}

	// fires it over
	firePHP(postData);
	//console.log(postData);
}

var resp;

function firePHP(postData){
	var http = new XMLHttpRequest();
		http.onreadystatechange=function(){
		if (http.readyState == 4 && http.status == 200){
				resp = http.responseText
				return resp;
			}
		}
		http.open("POST", "process.php", true);
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send(postData);
}


if (resp === undefined){
		console.log("nothing to return");
	}
	else{
		var returnedKey = resp.substring(0,resp.indexOf("="));	
		var returnedVal = resp.substring(resp.indexOf("=")+1,resp.length);

		if (returnedKey == "incorrect" && returnedVal == "true"){
			var h = document.getElementById("output");
			h.appendChild(document.createTextNode("You've entered incorrect credentials there buddy"));
			h.style.display = "block";
		}

}


document.getElementById("debug").addEventListener("click", printDebug);

function printDebug(){

}








