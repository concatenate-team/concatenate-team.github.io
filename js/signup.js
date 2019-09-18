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
		  req.onupgradeneeded = function (evt) {
			  console.log("openDb.onupgradeneeded");
			  var store = evt.currentTarget.result.createObjectStore(
                  DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
              
              store.createIndex("username", "username", { unique: true });
			  store.createIndex("email", "email", { unique: true });
			  
		  };
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
		 * @param {string} lastname
		 * @param {string} password
		 * @param {string} confirmpassword
		 * @param {string} email
		 *
		 * 
		 */
		function addUser(name, username, email, password, confirmpassword) {
			console.log("addUser arguments:");
			var obj = { name: name, username: username, email: email, password: password, confirmpassword: confirmpassword};
			var store = getObjectStore(DB_STORE_NAME, 'readwrite');
			var req;
			console.log(obj)
			try {
				req = store.add(obj);
			} catch (e) {
				throw e;
			}
			req.onsuccess = function (evt) {
				console.log("Insertion in DB successful");
				document.querySelector('form').reset();
				displayActionSuccess();
				setTimeout(function() {
					window.location = "./home.html";
				}, 1000)
			};
			req.onerror = function(evt) {
				console.log(this.error);
				displayActionFailure('the email has been used please try another email');
			};  
		}
	
		function displayActionSuccess(msg) {
			msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
			document.querySelector('#msg').innerHTML = '<span style="color: green">' + 'Sign up ' + msg +'ful' + '</span>';
		}
		function displayActionFailure(msg) {
			msg = typeof msg != 'undefined' ? "Sign Up Failured: " + msg : "Failure";
			document.querySelector('#msg').innerHTML = '<span style="color: red">' + msg + '</span>';
		}
	
		function addEventListeners() {
			console.log("addEventListeners");
			document.querySelector('.signupbtn').addEventListener('click', (event) => {
				event.preventDefault();
				let name = document.querySelector('#name').value;
				let username = document.querySelector('#user_name').value;
				let email = document.querySelector('#email').value;
				let password = document.querySelector('#psw').value;
				let confirmpassword = document.querySelector('#psw-repeat').value;
				
				console.log("add ...");
			
				if (!name || !username || !password || !confirmpassword || !email) {
					displayActionFailure("Required field(s) missing");
					return;
				}
				console.log('somewhere');
				// adding data to the indexeddb
				addUser(name, username, email, password, confirmpassword);
			})
		}
		openDb();
		addEventListeners();
	  
	  })(); // Immediately-Invoked Function Expression (IIFE)
}