const express = require("express")
const db = require("../data/database.js")

const router = express.Router()

router.get("/", function (req, res) {
    res.redirect("/posts")
})

router.get("/posts", async function (req, res) {
    const query = `SELECT posts.*, authors.name AS author_name FROM blog.posts 
        INNER JOIN blog.authors ON blog.posts.author_id = blog.authors.id
        `
    const [posts] = await db.query(query)

    res.render("posts-list", { posts: posts })
})

router.get("/new-post", async function (req, res) {
    const [authors] = await db.query("SELECT * FROM authors")

    res.render("create-post", { authors: authors })
})

router.post("/posts", async function (req, res) {
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ]
    await db.query("INSERT INTO posts (title, summary, body, author_id) VALUES (?)", [data])

    res.redirect("/posts")
})

router.get("/posts/:id", async function (req, res) {
    const postId = req.params.id

    const query = `SELECT posts.*, authors.name AS author_name FROM blog.posts 
        INNER JOIN blog.authors ON blog.posts.author_id = blog.authors.id
        `
    const [posts] = await db.query(query)

    for (const post of posts) {
        if (postId == post.id) {
            return res.render("post-detail", { post: post })
        }
    }

    res.status(404).render("404")
})

module.exports = router