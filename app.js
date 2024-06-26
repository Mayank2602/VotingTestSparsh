//jshint esversion: 6
const express = require('express');
require('dotenv').config();
app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
const PORT = process.env.PORT || 3000
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/votes"

app.use(express.json());
app.use(
    cors({
      origin: "*", // client origin
    })
  );
  
const mongoose = require('mongoose');
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to database");
});
mongoose.connection.on('error', () => {
    console.log(err);
});
require('./models/user');
require('./models/poll');


app.use(require('./routes/signup'));
app.use(require('./routes/signin'));
app.use(require('./routes/createPoll'));
app.use(require('./routes/discover'));
app.use(require('./routes/mypolls'));
app.use(require('./routes/pollroute'));
app.use(require('./routes/votehandler'));
app.use(require('./routes/deletepoll'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log("Server up on port " + PORT);
});
