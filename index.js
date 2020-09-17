
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
    appId: '924973',
    key: 'd7d3cfba04f21c254eec',
    secret: '0d5610c9230cdff92793',
    cluster: 'ap2',
    encrypted: true
});


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    var presenceData = {
        user_id: Math.random().toString(36).slice(2) + Date.now()
    }
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

//listen on the app
app.listen(3000, () => {
    return console.log('Server is up on 3000')
});
