// User Information App - Web Server
const express = require('express'); //express is function data type
const app = express(); //app is an object
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('views', './src/views'); //specifies in wich folder views are located; views are pug files that specify how something should look like.
app.set('view engine', 'pug');


// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.
app.get('/', function(req, res) { //routes are always in the form of: app.get/app.post/app.put/app.delete.
    fs.readFile('./users.json', 'utf-8', function(err, data) { //data.txt is a text file //fs.readFile is a function inside an object. 
        if (err) {
            throw err;
        }

        var user = JSON.parse(data); //parsing the data in json file; translating the code into a real javascript object.
        res.render('index', { //index is a pug file; res.render is rendering the pug file.
            users: user
        }); 
    });
});

// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is your search bar.
app.get('/search', function(req, res) {
    res.render('search');
})


// - route 3: takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.
app.post('/search', function(req, res) {
    fs.readFile('./users.json', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }

        var input = req.body.name;
        var user = JSON.parse(data);

        for (var i = 0; i < user.length; i++) {
            if (input === user[i].firstname) {
                var firstname = user[i].firstname;
                var lastname = user[i].lastname;
                var email = user[i].email;
            } else if (input === user[i].lastname) {
                var firstname = user[i].firstname;
                var lastname = user[i].lastname;
                var email = user[i].email;
            }
        }
        
        res.render("find", {
            first: firstname,
            last: lastname,
            email: email
        });
    });
});

//AJAX part
app.post('/suggestion', function (req, res) { //this part gives suggestions.
    var input = req.body.input; //get the input key of the body (in search.pug file)

    fs.readFile('./users.json', function (err, data) {
        users = JSON.parse(data);

        var suggestion = []; //need an array to find matching users.
        users.forEach(function(user) { //look through the users list.
            if(user.firstname.startsWith(input) || user.lastname.startsWith(input)) { //check whether there is a match with the starting letter. 
                suggestion.push(user); //push the matching suggestion.
            }
        });

        res.send(suggestion); //send the suggestion.
    });
});


/// Part 2
// Create two more routes:
// - route 4: renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.
app.get('/register', function(req, res) {
    res.render('form');
});


// - route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).
app.post('/register', function(req, res) {
    console.log(req.body);
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err) {
            throw err;
        }

        var user = JSON.parse(data);

        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;

        var newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        };
        user.push(newUser)

        fs.writeFile('./users.json', JSON.stringify(user));
        res.redirect('/')
    });
});



// http://localhost:3000
var listener = app.listen(3000, function() {
    console.log('Server has started at: ' + listener.address().port);
});