var express = require("express"),
Character   = require("../models/character"),
Item        = require("../models/item"),
middleware  = require("../middleware"),
router      = express.Router({mergeParams: true});
var { isLoggedIn, checkUserCharacter, isAdmin } = middleware;

//NEW ITEM
router.get("/item/new", isLoggedIn, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            res.render("character/items/new", {character: character});
        }
    });
});

//CREATE ITEM
router.post("/item", isLoggedIn, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            Item.create(req.body.item, function(err, item) {
                if(err) {
                    console.log(err);
                } else{
                    item.owner = req.params.char_id;
                    item.save();
                    character.inventory.push(item._id);
                    character.save();
                    res.redirect("/" + req.params.id + "/character/" + character._id);
                }
            });
        }
    });
});

//EDIT ITEM FORM
router.get("/item/:item_id/edit", isLoggedIn, function(req, res) {
    Character.findById(req.params.char_id, function(err, character) {
        if(err) {
            console.log(err);
        } else {
            Item.findById(req.params.item_id, function(err, item) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("character/items/edit", {item: item, character: character});
                }
            });
        }
    });
});

//UPDATE ITEM
router.put("/item/:item_id", isLoggedIn, function(req, res){
    Item.findByIdAndUpdate(req.params.item_id, req.body.item, function(err, item) {
        if(err) {
            console.log(err);
        } else{
            res.redirect("/" + req.params.id + "/character/" + req.params.char_id);
        }
    });
});

//DESTROY ITEM
router.delete("/item/:item_id", isLoggedIn, function(req,res) {
    Item.findByIdAndRemove(req.params.item_id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/" + req.params.id + "/character/" + req.params.char_id);
        }
    });
});

module.exports = router;