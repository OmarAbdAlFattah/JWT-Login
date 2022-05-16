const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pool = require("./config/database.js");
const { query } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const { Client } = require('pg');
const auth = require("./middleware/auth");

require("dotenv").config();


app.listen(5000, () => {
    console.log("app currently running on port 5000!");
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post("/signup", async(req, res) => {
    try {
        //await
        let { userID } = req.body;
        let { username } = req.body;
        let { userpassword } = req.body;
        const salt = await bcrypt.genSalt(8);
        var hashedPassword = await bcrypt.hash(req.body.userpassword, salt);
        if (!(username && userpassword)) {
            res.status(400).send("please enter username and password");
        }
        let token = jwt.sign({ id: userID }, process.env.API_KEY, { //create a .env file and add the key you want
            expiresIn: 86400 // 24 hours
        });
        let newUser = await pool.query("INSERT INTO USERS (username,userpassword) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);
        res.status(200).send({
            auth: true,
            token: token
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/login", async(req, res) => {
    try {
        const { username, userpassword } = req.body;

        if (!(username && userpassword)) {
            res.status(400).send("All inputs are required");
        }
        encryptedpassword = bcrypt.hashSync(userpassword, 8);
        const allUsers = await pool.query("SELECT * FROM USERS WHERE username = ($1)", [username]);
        const matchedUsernames = allUsers.rows;
        if (matchedUsernames.length > 0) {
            for (index = 0; index < matchedUsernames.length; index++) {
                if (username == matchedUsernames[0]["username"] && await bcrypt.compare(userpassword, matchedUsernames[0]["userpassword"])) {
                    console.log(username + " is matched!");
                    const token = jwt.sign({
                            userID: allUsers.rows[0]["userid"],
                            username
                        },
                        process.env.API_KEY, {
                            expiresIn: "1h"
                        }
                    )
                    await pool.query("UPDATE USERS SET token = ($1) WHERE username = ($2)", [token, username]);

                    res.status(200).send({
                        auth: true,
                        token: token
                    });
                    break;
                } else if (index == matchedUsernames.length - 1) {
                    res.status(400).send('invalid');
                }
            }
        } else {
            res.status(400).send('invalid credentials');
        }
    } catch (err) {
        console.log(err);
    }
});


app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome There! ");
});