var express = require("express"),
router      = express.Router(),
passport    = require("passport"),
User        = require("../models/user");


//ROOT
router.get("/", function(req, res) {
    res.render("landing");
});

//REGISTER
router.get("/register", function(req, res) {
    res.render("register");
});

router.post('/register', function(req, res) {
    var newUser = User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});
  
//LOGIN
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/" + req.user.id);
});

//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
});

module.exports = router;