function showElement(v){
	var elToShow = document.getElementById(v);
	elToShow.style.display = "block";

	if (v == "newUser" || v == "existUser"){
		document.getElementById("btnNew").style.display = "none";
		document.getElementById("btnExist").style.display = "none";
	}
}

function getInput(){
	for (i = 0; i < arguments.length; i++){
		console.log(arguments[i]);
	}
}

function reset(){

	// send a reset flag
	// grab new val

	var http = new XMLHttpRequest();
	http.open("POST","process.php",false);
	http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	http.send("reset=true");

	var o = http.responseText;
	el.innerHTML = "";

	var output = document.createTextNode(o);
	el.appendChild(output);

}

