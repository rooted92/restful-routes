const express = require('express');
const app = express();
const path = require('path');

// urlencoded says, anytime a request comes in with urlencoded data, go ahead and parse it for me. Like from a form.
app.use(express.urlencoded({ extended: true }));
// json() is a method that is going to parse any incoming JSON data.
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    {
        id: 1,
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: 2,
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 3,
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: 4,
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
    comments.push({ username, comment });
    // res.redirect will send the user back to the comments page after they submit a comment.
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === parseInt(id));
    res.render('comments/show', { comment });
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