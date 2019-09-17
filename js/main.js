function getDetails(){
	let user = document.getElementById('username');
	let pass = document.getElementById('password');

	let correctuser="barbie";
	let correctpass="123";

	if((user.value == correctuser) && (pass.value == correctpass)) {
		window.location = "./home.html";
	} else {
		alert("Incorect Username or Password!");
	}
	
}

