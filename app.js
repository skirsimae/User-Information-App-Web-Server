// User Information App - Web Server

// Create a Node.js application that is the beginning of a user management system. Your users are all saved in a "users.json" file, and you can currently do the following:
// - search for users
// - add new new users to your users file.

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.

// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is your search bar.
// - route 3: takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.

// Part 2
// Create two more routes:
// - route 4: renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.
// - route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).

const express = require('express'); //express is function data type
const fs = require ('fs');
const app = express ( ); //app is an objec
const bodyParser = require('body-parser');

// app.use('/search', bodyParser)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.urlencoded());


app.set('views', './src/views' ); //set -set settings ; specifying in wich folder views need to be located in. views = are the pug files, that specifies how something should look. Html and css combined. 
app.set('view engine', 'pug' );


//Part 0. Route 1:
app.get('/', function (req, res) { //same as: app.get('/', function(req, res) //routes are always in the form of app.get/app.get/app.put/app.delete
	fs.readFile('./users.json', function (err, data) { //data.txt is a text file //fs.readFile is a function inside an object. read line 25!
		if(err) {
			throw err;
		}

		var user = JSON.parse(data); //parsing the data in json file and sending it to. The data in JSON file is a string and it will translate to real javascript object.
//		console.log(user); it will console log the data. 


		res.render('index', {users: user}); //index is called index.pug ;res.render is rendering html pug; if there is no error displays it to the webpage. stuff:data is object; 
	});
});


//Part 1. Route 2:

app.get('/search', function(req,res) {
	// console.log('req.guery is: ', req.query)
	res.render('search');
})


//Part 1. Route 3:
app.post('/search', function(req,res) {
	// console.log(req.body.search)

	fs.readFile('./users.json', 'utf-8', function(err, data) {
    	if (err) {
        	throw err;
 		}

 	var input = req.body.name;

 	var user = JSON.parse(data); 

	for (var i = 0; i < user.length; i++) {
		if (input === user[i].firstname) {
			var userName = user[i].firstname;
			var userLastname = user[i].lastname;
			var userEmail = user[i].email;
		}

		else if (input === user[i].lastname) {
			var userName = user[i].firstname; 
			var userLastname = user[i].lastname; 
			var userEmail = user[i].email;
		}
	}

		res.render("find", {first: userName, last: userLastname, email: userEmail});
	});


});



//Part 2. Route 4:
app.get('/form', function(req,res) {
		res.render('form');
	})



// http://localhost:3000
	var listener = app.listen(3000, function () {
    	console.log('Server has started at: ' + listener.address().port);
	});
