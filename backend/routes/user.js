const router = require("express").Router();
const User = require("../models/userModel");

router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/register").post((req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(() => res.json("Registered Successfully"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;