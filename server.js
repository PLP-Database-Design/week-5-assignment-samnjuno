// import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// cors and ejs

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


// test the connection
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
})


// this is not important for the assignment
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// retrieve all patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT first_name, last_name FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error 
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        // res.status(200).render('data', { data })
        res.status(200).send(data)
    })
})

//  retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders= "SELECT first_name, last_name, provider_specialty FROM providers" 
        db.query(getProviders,(err, data) => {
        if (err) return res.status(500).send(data);
        res.json(results);
    });
});

// patients by first name
app.get('/patients/filter', (req, res) => {
    const firstName = req.query.first_name; // Expecting a query parameter
    connection.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results);
    });
});
// retrieve providers by specialty
app.get('/providers/filter', (req, res) => {
    const specialty = req.query.specialty; // Expecting a query parameter
    connection.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results);
    });
});


// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})