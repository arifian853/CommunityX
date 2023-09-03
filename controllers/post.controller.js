const Posts = require('../models/postData.model')

exports.getPosts = async (req, res) => {
    try {
        const response = await Posts.find();
        res.json(response);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.sendPost = async (req, res) => { 
    const { whoCreated, title, content } = req.body

    const post = new Posts({
        whoCreated: whoCreated,
        title: title,
        content: content,
    })

    post.save()

    return res.status(201).json({
        message: 'Posted!',
    })
}