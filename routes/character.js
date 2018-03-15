var express = require("express"),
Character   = require("../models/character"),
User        = require("../models/user"),
middleware  = require("../middleware"),
router      = express.Router({mergeParams: true});
var { isLoggedIn, checkUserCharacter, isAdmin } = middleware;


//CHAR INDEX
router.get("/", isLoggedIn, function(req, res) {
    if(req.user) {
        User.findById(req.params.id).populate("characters").exec(function(err, user) {
            if(err) {
                console.log(err);
            } else {
                res.render("character/index", {user: user});
            }
        });
    } else {
        res.redirect("/");
    }
});


//NEW CHAR FORM
router.get("/character/new", isLoggedIn, function(req, res) {
    if(req.user) {
        res.render("character/new");
    } else {
        res.redirect("/");
    }
});

//CREATE NEW CHAR
router.post("/", isLoggedIn, function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            Character.create(req.body.character, function(err, character){
                if(err) {
                    console.log(err);
                } else {
                    character.player = req.user.id;
                    character.save();
                    user.characters.push(character.id);
                    user.save();
                    res.redirect("/user/" + req.params.id);
                }
            });
        }
    });
});

//EDIT CHAR
router.get("/character/:char_id/edit", isLoggedIn, checkUserCharacter, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            res.render("character/edit", {character: character});
        }
    });
});

//UPDATE CHAR
router.put("/character/:char_id", isLoggedIn, checkUserCharacter, function(req, res) {
    Character.findByIdAndUpdate(req.params.char_id, {$set:{name: req.body.character.name}}, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/user/" + req.params.id);
        }
    });
});

//SHOW CHAR
router.get("/character/:char_id", isLoggedIn, checkUserCharacter, function(req, res) {
    Character.findById(req.params.char_id).populate("containers").populate("inventory").exec(function(err, character) {
        if(err) {
            console.log(err);
        } else {
            res.render("character/show", {character: character});
        }
    });
});

//DESTROY CHAR
router.delete("/character/:char_id", isLoggedIn, checkUserCharacter, function(req, res) {
    Character.findByIdAndRemove(req.params.char_id, function(err) {
        if(err) {
            console.log(err);
        } else {
            User.findByIdAndUpdate(req.params.id,{$pull: {characters: req.params.char_id}}, function(err, user) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect("/user/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;