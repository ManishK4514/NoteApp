const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { auth } = require("../middlewares/auth")
const { NoteModel } = require('../models/NoteModel')

const noteRouter = express.Router();
noteRouter.use(auth)

noteRouter.get("/", async (req, res) => {
    let token = req.headers.authorization

    // console.log(token);
    
    jwt.verify(token, "Manish", async(err, decode) => {
        try {
            const notes = await NoteModel.find({user:decode.userId})
            res.send(notes)
        }
        catch(error) {
            res.status(500).send(error)
        }
    });    
    
})

noteRouter.post("/save", async (req, res) => {
    let token = req.headers.authorization
    console.log(token);
    try {
        const note = new NoteModel (req.body)
        console.log(note);
        await note.save()
        res.status(201).send({note, message: "Note Saved..."})
    }
    catch(error) {
        res.status(500).send(error)
    }   
})


noteRouter.patch("/update", async (req, res) => {
    let {id} = req.headers

    console.log(id);

    try {
        await NoteModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(201).send({message: "Note Updated..."})
    }
    catch(error) {
        res.status(500).send(error)
    }   
    
})

noteRouter.delete("/delete", async (req, res) => {
    let {id} = req.headers

    try {
        await NoteModel.findByIdAndDelete({_id: id})
        res.status(201).send({message: "Note Deleted..."})
    }
    catch(error) {
        res.status(500).send(error)
    }   
    
})

module.exports = { noteRouter }