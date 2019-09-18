window.onload = () => {
	(function () {

		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	
		//checking if indexDB is not supported by the browser
		if (!window.indexedDB) {
			console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
		}
		else{
			console.log('support')
		}
		const DB_NAME = 'users';
		const DB_VERSION = 1; // Use a long long for this value (don't use a float)
		const DB_STORE_NAME = 'usersdata';
	  
		var db;
	  
		function openDb() {
		  console.log("openDb ...");
		  var req = indexedDB.open(DB_NAME);
		  req.onsuccess = function (evt) {
		  // Equal to: db = req.result;
			  db = this.result;
			  console.log("openDb DONE");
		  };
		  req.onerror = function (evt) {
			  console.error("openDb:", evt.target.errorCode);
		  };
		//   req.onupgradeneeded = function (evt) {
		// 	  console.log("openDb.onupgradeneeded");
		// 	  var store = evt.currentTarget.result.createObjectStore(
		// 		  DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
	
		// 	  store.createIndex("name", "name", { unique: false });
		// 	  store.createIndex("email", "email", { unique: true });
		// 	  store.createIndex("username", "username", { unique: true });
		//   };
		}
	  
	
		/**
		 * @param {string} store_name
		 * @param {string} mode either "readonly" or "readwrite"
		 */
		function getObjectStore(store_name, mode) {
			var tx = db.transaction(store_name, mode);
			return tx.objectStore(store_name);
		}
	
		/**
		 * @param {string} name
		 * @param {string} username
		 * @param {string} password
		 * @param {string} confirmpassword
		 * @param {string} email
		 *
		 * 
		 */
	
		function getUser(data) {
			console.log("addUser arguments:");
			var store = getObjectStore(DB_STORE_NAME, 'readonly');
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			let check = re.test(String(data).toLowerCase())
			var req;
			// req = store.index('username')
			console.log(check)
			try {
				req = check ? store.index('email') : store.index('username')
			} catch (e) {
				throw e;
			}
			if(check){
				req.get(data).onsuccess = function (evt) {
					console.log(evt.target)
					if (typeof evt.target.result === 'undefined') {
						displayActionFailure('Incorrect email or password');
					}
					else if ((evt.target.result.email === data || evt.target.result.username === data )&& evt.target.result.password === localStorage.getItem("password") ) {
						console.log(evt.target.result.email);
						displayActionSuccess('Login Successful');
						document.querySelector('form').reset();
						setTimeout(function() {
							window.location = "./home.html";
						}, 200);
						
					}
				}; 
			}
			else {
				req.get(data).onsuccess = function (evt) {
					console.log(evt.target)
					if (typeof evt.target.result === 'undefined') {
						displayActionFailure('Incorrect email or password');
					}
					else if ((evt.target.result.email === data || evt.target.result.username === data )&& evt.target.result.password === localStorage.getItem("password") ) {
						console.log(evt.target.result.email);
						displayActionSuccess('Login Successful');
						document.querySelector('form').reset();
						setTimeout(function() {
							window.location = "./home.html";
						}, 200);
						
					}
				};
			}
			req.onerror = function(evt) {
				console.error("getCustomer error", this.error);
				displayActionFailure('Incorrect email or password');
			};
		}
	
		function displayActionSuccess(msg) {
			msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
			document.querySelector('#msg').innerHTML = '<span style="color: green">' `${msg}`'</span>';
		}
		function displayActionFailure(msg) {
			msg = typeof msg != 'undefined' ? "Sign Up Failured: " + msg : "Failure";
			document.querySelector('#msg').innerHTML = '<span style="color: red">' + msg + '</span>';
		}
	
		function addEventListeners() {
			console.log("addEventListeners");
			document.querySelector('#signin').addEventListener('click', (event) => {
				event.preventDefault();
				let username = document.querySelector('#username').value;
				let password = document.querySelector('#password').value;
				localStorage.setItem("password", `${password}`);
				console.log("add ...");
				if (!username || !password ) {
					displayActionFailure("Required field(s) missing");
					return;
				}
				getUser(username);
			})
		}
		openDb();
		addEventListeners();
	  
	  })(); // Immediately-Invoked Function Expression (IIFE)
}

// function getDetails(){
// 	let user = document.getElementById('username');
// 	let pass = document.getElementById('password');

// 	let correctuser="barbie";
// 	let correctpass="123";

// 	if((user.value == correctuser) && (pass.value == correctpass)) {
// 		window.location = "./home.html";
// 	} else {
// 		alert("Incorect Username or Password!");
// 	}
	
// }


document.querySelector('#signup').addEventListener('click', () => window.location = "./signup.html")

