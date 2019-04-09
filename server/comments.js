const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");


const users = require("./users.js");
const User = users.model;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    username: String,
    text: String,
    storyId: String,
    date: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema);

// upload comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {   
    const comment = new Comment({
        user: req.user,
        username: req.user.name,
        text: req.body.text,
        storyId: req.body.storyId
    });

    try {
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/:storyId", async (req, res) => {
    // return commens for story
    try {
        let comments = await Comment.find({
            storyId: req.params.storyId
        }).sort({
            created: -1
        });
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: User,
    routes: router,
}