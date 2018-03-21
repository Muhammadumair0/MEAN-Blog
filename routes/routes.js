const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config();

function routes(router, database) {
    const db = database.db("mean-blog");
    const collectionUsers = db.collection("users");

    //for registering new user 

    router.post("/register", (req, res) => {
        const user = req.body;

        if (!user.email) {

            res.json({ sucess: false, message: "Enter a valid email" });

        }
        else if (!user.username) {

            res.json({ sucess: false, message: "Enter a valid username" });

        }

        else if (!user.password) {

            res.json({ sucess: false, message: "Enter right password" });

        } else {
            const users = {
                username: user.username,
                email: user.email,
                password: user.password
            };

            collectionUsers.findOne({ "username": users.username }, (err, results) => {
                if (results === null) {
                    collectionUsers.findOne({ "email": users.email }, (err, results) => {
                        if (results === null) {
                            users.password = bcrypt.hashSync(users.password, 10);
                            collectionUsers.insert(users);
                            res.json({ status: 200, message: "you are sucessfully Registered" });
                        } else {
                            res.json({ status: 401, message: "email has already be taken" });
                        }
                    });
                } else {
                    res.json({ status: 401, message: "Username already exists" });
                }
            });
        }
    });


    router.get("/checkemail/:email", (req, res) => {
        if (!req.params.email) {
            res.json({ status: 401, sucess: false, message: "Email not provided" });
        }
        else {
            collectionUsers.findOne({ "email": req.params.email }, (err, results) => {
                if (results === null) {
                    res.json({ status: 200, sucess: true, message: "email available to use" });
                } else {
                    res.json({ status: 401, sucess: false, message: "email not available" });
                }
            });
        }
    });

    router.get("/checkusername/:username", (req, res) => {

        if (!req.params.username) {
            res.json({ status: 401, sucess: false, message: "username not provided" });
        } else {
            collectionUsers.findOne({ "username": req.params.username }, (err, results) => {
                console.log("here is the results", results);
                if (results === null) {
                    res.json({ status: 200, sucess: true, message: "username available to use" });
                } else {
                    res.json({ status: 401, sucess: false, message: "Username not available" });
                }
            });
        }
    });



    //for logging user in

    router.post("/api/login", (req, res) => {
        if (!req.body.username) {
            res.json({ status: 401, message: "User is not available" });
        }
        else if (!req.body.password) {
            res.json({ status: 401, message: "Password was not provided" });
        } else {
            collectionUsers.findOne({ "username": req.body.username }, (err, results) => {
                if (results === null) {
                    res.json({ status: 401, message: "Username is wrong" });
                } else {
                    const passwordCheck = bcrypt.compareSync(req.body.password, results.password);
                    if (passwordCheck) {
                        const token = jwt.sign({ userId: results._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
                        res.json({ status: 200, message: "You are sucessfully logged In", token, "username": results.username });
                    } else {
                        res.json({ status: 401, message: "You have entered wrong passwrod" });
                    }
                }
            });
        }
    });

    //any route that comes after this middleware will run this middle ware and before routes will work without using this middleware
    router.use((req, res, next) => {
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            res.send({ status: 401, message: "No TOKEN provided" });
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.send({ status: 401, message: "Token not matched" });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get("/profile", (req, res) => {
        collectionUsers.findOne({ _id: ObjectId(req.decoded.userId) }, (err, results) => {
            console.log(results);
            if (results === null) {
                res.send({ status: 200, message: "You are not in our database" });
            } else {
                res.send({ status: 200, results });
            }
        })
    });


    return router;
}



module.exports = routes;

 // router.get("/register/user", (req, res) => {

    //     const db = database.db("mean-blog");
    //     const collectionUsers = db.collection("users");
    //     collectionUsers.findOne({ "username": req.body.username }, (err, results) => {
    //         if (results === null) {
    //             res.json(401, `username: ${req.body.username} is not registered!`);
    //         }
    //         else {

    //             if (!bcrypt.compareSync(req.body.password, results.password)) {
    //                 res.json(401, "You have entered wrong password");
    //             }
    //             else if (results["email"] !== req.body["email"]) {
    //                 res.json(401, "You email is wrong");
    //             } else {
    //                 res.json(200, `Everything is fine you are now Logged In`);

    //             }
    //         }
    //     });

    // });