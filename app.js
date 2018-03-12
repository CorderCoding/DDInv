//SETTING UP REQUIRED MODULES
var expressSanitizer = require("express-sanitizer"),
methodOverride       = require("method-override"),
LocalStrategy        = require("passport-local"),
User                 = require("./models/user"),
flash                = require("connect-flash"),
passport             = require("passport"),
mongoose             = require("mongoose"),
express              = require("express"),
app                  = express();


//REQUIRED ROUTES
var indexRoutes        = require("./routes/index"),
charRoutes             = require("./routes/character"),
contRoutes             = require("./routes/container"),
itemRoutes             = require("./routes/item");

//EXPRESS SETUP
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//DATABASE CONNECT
mongoose.connect(process.env.DATABASEURL);

//AUTH SETUP
app.use(require('express-session')({ secret: 'M3mb3r83rr!3s', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//GLOBAL USER VARIABLE
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

//SETTING ROUTES
app.use("/", indexRoutes);
app.use("/:id", charRoutes);
app.use("/:id/character/:char_id", itemRoutes);
app.use("/:id/character/:char_id", contRoutes);


//START SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("========================================");
    console.log("        D&D INVENTORY APP RUNNING");
    console.log("========================================");
    console.log(Date().toString());
    console.log("========================================");
});