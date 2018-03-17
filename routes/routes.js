const bcrypt = require("bcrypt");

function routes(router, database) {
    const db = database.db("mean-blog");
    const collectionUsers = db.collection("users");

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