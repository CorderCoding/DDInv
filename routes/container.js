var express = require("express"),
Character   = require("../models/character"),
Container   = require("../models/container"),
middleware  = require("../middleware"),
router      = express.Router({mergeParams: true});
var { isLoggedIn, checkUserCharacter, isAdmin } = middleware;

//NEW CONTAINER
router.get("/container/new", isLoggedIn, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            res.render("character/containers/new", {character: character});
        }
    });
});

//CREATE CONTAINER
router.post("/container", isLoggedIn, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            Container.create(req.body.container, function(err, container) {
                if(err) {
                    console.log(err);
                } else{
                    container.owner = req.params.char_id;
                    container.save();
                    character.containers.push(container._id);
                    character.save();
                    res.redirect("/" + req.params.id + "/character/" + character._id);
                }
            });
        }
    });
});

//EDIT CONTAINER FORM
router.get("/container/:container_id/edit", isLoggedIn, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            Container.findById(req.params.container_id, function(err, container) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("character/containers/edit", {container: container, character: character});
                }
            });
        }
    });
});

//UPDATE CONTAINER
router.put("/container/:container_id", isLoggedIn, function(req, res){
    Container.findByIdAndUpdate(req.params.container_id, req.body.container, function(err, item) {
        if(err) {
            console.log(err);
        } else{
            res.redirect("/" + req.params.id + "/character/" + req.params.char_id);
        }
    });
});

//DESTROY CONTAINER
router.delete("/container/:container_id", isLoggedIn, function(req,res) {
    Container.findByIdAndRemove(req.params.container_id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/" + req.params.id + "/character/" + req.params.char_id);
        }
    });
});

module.exports = router;