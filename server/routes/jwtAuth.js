const router = require("express").Router();

const pool = require("../db")

const bcrypt = require("bcrypt")


const jwtGenerator= require('../utils/jwtGenerator')

const validInfo = require('../middleware/valid')


const authorization = require("../middleware/authorization")


router.post("/adminlogin",async (req,res) =>{
    if(req.body.email === "admin@gmail.com" && req.body.password === "7777"){
        res.json("ok");
    }
    else{
        res.json("admin credentials incorrect")
    }
})

router.post("/register",validInfo, async (req,res) => {
    try{
        //1. destucture the req.body (name,email,password)
        
        const {name,email,password} = req.body;
        
        //2. check if user exist (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

       

        if(user.rows.length !== 0){
            return res.status(401).json("user already exists")  //401 user unauthenticated
        }
        //3.Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password,salt)
        //4. enter the new user inside our database

        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",[name,email,bcryptPassword])
        
        
        //5. generation our jwt token
        const user_id = newUser.rows[0].user_id;
        const token = jwtGenerator(user_id);
        
        res.json({token})
       
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


//login route

router.post("/login",validInfo,async (req,res) =>{
    try{
        //1. destructure the req.body


        const {email,password} = req.body;
        
        //2. check if user exist (if user exist then throw error)
        
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if(user.rows.length  === 0){
            return res.status(401).json("Password or email is inavalid")
        }
        //3. check incoming password same as db password

        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("password or email is incorrect")
        }
        //4.give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id)

        res.json({token})

    } catch (err) {
    
        console.error(err.message);
        res.status(500).send("Server error");
    }



})

router.get("/is-verify",authorization,async (req,res)=>{
    try {
        
        res.json(true);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;


