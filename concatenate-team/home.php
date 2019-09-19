<?php

session_start();
if(!isset($_SESSION['username'])){
    header ('location:login.php');
}

?>


<html>
<head>
    <title> Home Page </title>
    <link rel="stylesheet" type="text/css" href="home.css">
</head>
<body>
    <a href="logout.php"> LOG OUT </a>    
    <div class= "container">
        <h1> Welcome to TEAM CONCATENATE'S homepage <?php echo $_SESSION['username']; ?>,<br> Enjoy your session! </h1>
    </div>
</body>

</html>