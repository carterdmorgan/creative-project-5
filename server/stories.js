const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    content: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Story = mongoose.model('Story', storySchema);

// upload story
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    const story = new Story({
        user: req.user,
        title: req.body.title,
        content: req.body.content,
    });
    console.log("req\n" + req)
    try {
        await story.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my story
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return story
    try {
        let stories = await Story.find({
            user: req.user
        }).sort({
            created: -1
        });
        return res.send(stories);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all story
router.get("/all", async (req, res) => {
    try {
        let stories = await Story.find().sort({
            created: -1
        }).populate('user');
        return res.send(stories);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get single story
router.get("/:storyId", async (req, res) => {
    // return story
    try {
        let stories = await Story.find({
            _id: req.params.storyId
        }).populate('user');
        return res.send(stories);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Story,
    routes: router,
}