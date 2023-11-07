const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { UserReview, LoginCred } = require('../model');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.json("hello")
})


router.get("/getreviews/:movieId", async (req, res) => {
    try {
        const reviews = await UserReview.find({ "id": req.params.movieId });
        res.send(reviews);
    } catch (err) {
        console.log(err);
    }
});

router.post("/review", async (req, res) => {
    console.log(req.body)
    id = req.body.id;
    review = req.body.review;

    const usereview = new UserReview({ id, review });
    try {
        await usereview.save();
        res.status(200).json("review submited");
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/register", async (req, res) => {
    console.log(req.body)
    let email = req.body.email
    
    let getEmail = await LoginCred.findOne({ email: email });
   
    if (getEmail) {
        res.status(400).send({
            message : "User already Exists"
        })
        return
    }
    else {
        password = req.body.password
        salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new LoginCred({
            email: email,
            password: hashedPassword
        })
        try{
        let user = await newUser.save();
        let {_id} = await user.toJSON()
        const token = jwt.sign( {_id:_id},"secret")
        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:24*60*60*1000
        }).status(200).json({
            status : 200 ,
            message:"success",

        })
        
        }
        catch(err)
        {
            res.status(400).send(err)
        }
    }
})

router.post("/login", async (req, res) => {
    console.log("login hit")
    let userData = req.body;
    console.log("body", userData)

    try {
        const user = await LoginCred.findOne({ email: userData.email });
        console.log("database", user)
        if (!user) {
            res.status(401).send("invalid email")
        }
        else {
            if (userData.password === user.password) {
                res.status(200).send(user)
            }
            else {
                res.status(401).send("invalid password")
            }
        }
    }
    catch (err) {
        res.status(500).send(err);
    }


})

module.exports = router