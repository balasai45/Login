const express = require('express')
const app = express()
const port = 4001
const body_parser = require('body-parser')
const path = require('path')
const dbconnection = require('./dbconnection/dbconnection.js');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

let dbCon;


app.use(express.json())
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.session())    //allow passport to use "express-session"
app.use(passport.initialize()) // init passport on every route call


passport.use(new LocalStrategy(
    {
        usernameField: 'email', // map username to custom field, we call it email in our form
        passwordField: 'password',
     },
    async function(email, password, done) {
        try{
            console.log(email,password,"Username","password=>>>>>>>>")

            if(email && password){
             let data =   await dbCon.findOne({"email":email})
             console.log(data,"praful")
              if(!data){
                done(null,false)
              }else if(data.password !== password){
                done(null,false)
              }
              else{
                done(null,{email,password})
              }
            }
            
            
        }catch(e){
            done(e,"message")
        }

        return done(null,{email,password})
    }
  ));
  

passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user.email)


} )


passport.deserializeUser((id, done) => {
        console.log("---------> Deserialize Id")
        console.log(id)

        done (null, {"id":id} )      
})


// middleswares in nodejs
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");

//apis for the url path

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, "public", "login.html"));
})




app.post("/formdata",async function (req, res) {
    console.log(req.body);
    const contact = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
    };
    try {
        await dbCon.insertOne(contact);
        await dbCon.findOne()
        console.log("Addded contact=>>>>>>>>")
        res.redirect('/thankyou')

    } catch (e) {
        console.log(e, "Insert error")
    }

});


app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname,"public","registerForm.html"))
})


app.get('/mainpage', function(req,res){
    res.sendFile(path.join(__dirname,"public","signup_success.html"))
})

app.get('/404', function(req,res){
    res.sendFile(path.join(__dirname,"public","404.html"))
})

app.post('/login',passport.authenticate('local',{failureRedirect:'/404',successMessage:"User loged In"}),
function (req, res) {
    // console.log(req.body,"Body=>>>>>>>>>>")
    res.redirect("/mainpage")
})


app.listen(port, async () => {
    dbCon = await dbconnection()
    console.log("Listening to the server")
})