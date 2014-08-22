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

var o = {};

Object.observe(o, function(changes) {
  changes.forEach(function(change) {
    //console.log(change.type, change.name, change.oldValue);
    checkLength();
  });
});


function firePHP(postData){
	var http = new XMLHttpRequest();
		http.onreadystatechange=function(){
		if (http.readyState == 4 && http.status == 200){
			o.response = http.responseText;
			}
		}
		http.open("POST", "process.php", true);
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send(postData);
}


function checkLength(){
	if (Object.keys(o).length === 0){
	console.log("this object doesnt have any properties");
	}
	else {
	console.log("this object has " + Object.keys(o).length + " properties");
	for (var name in o){
		var letMeIn = o[name].substring(o[name].indexOf("=")+1,o[name].length);
		if (letMeIn == "false"){
			var h = document.getElementById("output");
			h.appendChild(document.createTextNode("You've entered incorrect credentials there buddy"));
			h.style.display = "block";
		}
		else if (letMeIn == "true"){
			var h = document.getElementById("output");
			h.appendChild(document.createTextNode("Welcome!"));
			h.style.display = "block";
		}
	}
	}

}




document.getElementById("debug").addEventListener("click", printDebug);

function printDebug(){


if (resp === undefined){
		console.log("nothing to return");
	}
	else{
		var returnedKey = resp.substring(0,resp.indexOf("="));	
		var returnedVal = resp.substring(resp.indexOf("=")+1,resp.length);
		console.log(resp);
		if (returnedKey == "correct" && returnedVal == "true"){
			var h = document.getElementById("output");
			h.appendChild(document.createTextNode("Welcome!"));
			h.style.display = "block";
		}

		else if (returnedKey == "correct" && returnedVal == "false"){
			var h = document.getElementById("output");
			h.appendChild(document.createTextNode("You've entered incorrect credentials there buddy"));
			h.style.display = "block";
		}

}


}








