const express = require('express');
const app = express();
const path = require('path');
// We extracted the v4 method from uuid and aliased it to uuid. This is the same as writing const uuid = require('uuid').v4;
const { v4: uuid } = require('uuid');
// Method Override is a package that allows us to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require('method-override');

// urlencoded says, anytime a request comes in with urlencoded data, go ahead and parse it for me. Like from a form.
app.use(express.urlencoded({ extended: true }));
// json() is a method that is going to parse any incoming JSON data.
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    // We destructured username and comment from req.body, and then pushed them into the comments array.
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    // res.redirect will send the user back to the comments page after they submit a comment.
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    // Remember find gives you the first matching element in an array.
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

// A patch request will update one part of a resource, whereas a put request will replace the entire resource.
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newCommentText = req.body.comment;
    // We update the found comments' comment property to be the new comment text.
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    // Remember we are passing in 'comment' as a parameter in the URL
    res.render('comments/edit', { comment: foundComment });
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // We filter out the comment that we want to delete.
    // We are reassigning the comments array to be all of the comments except for the one with the id that we passed in.
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    res.send('POST /tacos response');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});