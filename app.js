const express = require('express');
const app = express();

app.use(express.json());
let posts = []; // saving the posts in memory for simplicity


// Post class to create new blog posts
class Post{
    constructor({title, content, author, createdAt}){
        this.id = posts.length + 1; // auto-increment id
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
    }
}

// get api to fetch blog posr by id
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    
    if(posts.length === 0){
        return res.status(404).json({ error: "No blog posts available" });
    }

    if(typeof postId !== 'number' || isNaN(postId)){
        return res.status(400).json({ error: "Invalid post ID" });
    }
    
    if(posts.find(post => post.id !== postId) || postId <= 0){
        return res.status(404).json({ error: `Blog post with ID ${postId} not found` });
    }

    res.send(posts[postId - 1]); 
}); 
 
// post api to create a new blog post
app.post('/posts', (req, res) => {
    const date = new Date();
    const post = new Post({
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: date
    });
    posts.push(post);
    res.status(201).json({ message: "Blog post created successfully", post });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});