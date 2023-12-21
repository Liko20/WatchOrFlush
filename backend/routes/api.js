const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { UserReview, LoginCred } = require('../model');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.json("hello")
})

router.get("/user", async (req, res) => {
    console.log("user hit")
    try {
        const cook = req.cookies["jwt"]
        
        if(cook==null){
            
            return res.status(401).send({
                message: "unauthenticated"
            })
        }
        else{
            const claims = jwt.verify(cook, "secret")
        if (!claims) {
            return res.status(401).send({
                message: "unauthenticated"
            })

        };
        const userf = await LoginCred.findOne({ _id: claims._id });
        const { password, ...data } = await userf.toJSON();
        return res.send(data)
        }

    } catch (err) {
        console.log(err)
        return res.status(401).send({
            message: "unauthenticated"
        });
    }

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
    let id = req.body.id;
    let review = req.body.review;
    let username=req.body.username;

    const usereview = new UserReview({ id, review ,username});
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
        return res.status(400).send({
            message: "User already Exists"
        })

    }
    else {
        let password = req.body.password
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new LoginCred({
            email: email,
            password: hashedPassword
        })
        try {
            let user = await newUser.save();
            const { _id } = await user.toJSON()
            const token = jwt.sign({ _id: _id }, "secret")
            return res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            }).status(200).json({
                status: 200,
                message: "success",
                username:email

            })

        }
        catch (err) {
            return res.status(400).send(err)
        }
    }
})
router.post("/logout", async (req, res) => {
    console.log("logout")
    res.cookie("jwt", "", { maxAge: 0 })

    return res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 0
    }).status(200).json({
        status: 200,
        message: "success",

    })
})

router.post("/login", async (req, res) => {
    console.log("login")
    let userData = req.body;

    try {
        const user = await LoginCred.findOne({ email: userData.email });
        console.log("database", user)
        if (!user) {
            return res.status(401).send("invalid email")
        }
        else {
            if (!(await bcrypt.compare(userData.password, user.password))) {
                return res.status(404).send({
                    message: "user not found"
                })
            } else {
                const { _id } = await user.toJSON()
                const token = jwt.sign({ _id: _id }, "secret")
                return res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                }).status(200).json({
                    status: 200,
                    message: "success",
                    username:userData.email

                })
            }
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }


})

module.exports = router