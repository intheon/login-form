var fieldNames = ["username=","password=","firstname=","lastname=","email="];
var result;
var o = {};

function showElement(v){
	var elToShow = document.getElementById(v);
	elToShow.style.display = "block";
	if (v == "newUser" || v == "existUser"){
		document.getElementById("btnNew").style.display = "none";
		document.getElementById("btnExist").style.display = "none";
	}
}

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

//this is magic -- it does something when a var is CRUD'ed
Object.observe(o, function() {
    errorReporting();
}); 

//AJAX baby!
function firePHP(postData){
	var http = new XMLHttpRequest();
		http.onreadystatechange=function(){
		if (http.readyState == 4 && http.status == 200){
			o.response = http.responseText;
			//console.log(http.responseText);
			}
		}
		http.open("POST", "process.php", true);
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send(postData);
}

function errorReporting(){
	//console.log("this object has " + Object.keys(o).length + " properties");
	//useful, gives you an integer on how many properties an object has.
	console.log(o);

	for (var name in o){
		// im basically storing url strings in an object as this is what i want php to pass me
		// i then slice these based on the key/value and branch off from there!
		var objectKey = o[name].substring(0,o[name].indexOf("="));
		var objectValue = o[name].substring(o[name].indexOf("=")+1,o[name].length);

		if (objectKey == "exists"){
			var h = document.getElementById("output");
			h.appendChild(document.createTextNode("This user already exists"));
			h.style.display = "block";
		}

		if (objectKey == "correct"){
			if (objectValue == "false"){
				var h = document.getElementById("output");
				h.appendChild(document.createTextNode("You've entered incorrect credentials there buddy"));
				h.style.display = "block";
			}
			else if (objectValue == "true"){
				window.location = "http://intheon.xyz/hope/";
			}
		}

}}




