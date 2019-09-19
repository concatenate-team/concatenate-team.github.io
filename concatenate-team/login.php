<html>
	<head>
		<title>Login Form-Team Concatenate</title>

		<link rel="stylesheet" type="text/css" href="css/style.css">
	</head>

	<body>
		<div class="loginbox">
			<img src="https://res.cloudinary.com/tsosky/image/upload/v1568629462/avatar-male_ri0w2m.png" class="avatar">
			<h1>Login Here</h1>
			<form action="authenticate.php" method="post">
				<p>Username</p>
				<input type="text" name="user" placeholder="Enter Username">
				<p>Password</p>
				<input type="password" name="password" placeholder="Enter your Password">
				<input type="submit" name=" " value="Login">
				<a href="#">Lost your password?</a><br>
				<a href="signup.php">Don't have an account?</a>


			</form>
		</div>

	</body>

</html>
