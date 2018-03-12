var Character = require("../models/character"),
Container     = require("../models/container"),
Item          = require("../models/item");


module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/login');
  },
  checkUserCharacter: function(req, res, next){
    Character.findById(req.params.char_id, function(err, character){
      if(err || !character){
          console.log(err);
          req.flash('error', 'Sorry, that character does not exist!');
          res.redirect('/' + req.params.id);
      } else if(character.player.equals(req.user._id) || req.user.isAdmin){
          req.character = character;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/' + req.params.id);
      }
    });
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  },
}