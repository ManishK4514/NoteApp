const express = require("express");
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.send("All the User...");
})

userRouter.post("/register", async(req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err) return res.status(500).send(err)

        try {
            let user = new UserModel({name, email, password: hash });
            await user.save();

            // Generate a token
            const token = jwt.sign({ userId: user._id }, 'Manish');

            // Send the token in the response
            res.status(201).send({ message: "User Created...", token });
        }
        catch(error) {
            res.status(500).send(error)
        }  
    })
})

userRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;

    let option = {
        expiresIn:"50m"
    }
    
    try {
        let data = await UserModel.find({ email });
        
        if(data.length > 0) {
            let token = jwt.sign({ userId: data[0]._id}, "Manish", option);
            bcrypt.compare(password, data[0].password, function (err, result) {
                if(err) return res.status(500).send(err)

                if(result) {
                    res.status(201).send({message: "User logged in Successfully...", token: token})
                }
                else res.status(500).send({message: "Incorrect Password..."})
            })
        }
        else res.status(500).send({message: "User does not exist..."})
    }
    catch(error) {
        res.status(500).send(error)
    }  
})

module.exports = { userRouter }
