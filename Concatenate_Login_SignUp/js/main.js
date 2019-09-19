
function getDetails(){
	let user = document.getElementById('username');
	let pass = document.getElementById('password');

	let correctMail = "one";
	let correctpass="123";

	const error = document.createElement("p");          
	error.innerText = "wrong Username or Password"; 
	error.style.color = 'red';
	error.className = 'error_msg';            
	
		

	if((user.value == correctMail) && (pass.value == correctpass)) {
		window.location = "./sucess.html";
	} else {
		document.querySelector('.error_msg').appendChild(error);
	}

}
