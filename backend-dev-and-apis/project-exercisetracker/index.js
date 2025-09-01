const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// {versionKey: false} help to remove _v key in my documents.
// user model !
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
}, { versionKey: false });

// exercise model!
const ExerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"} // to link users and exercises
}, { versionKey: false });

const User = mongoose.model("User", UserSchema);
const Exercise = mongoose.model("Exercise", ExerciseSchema);

// To create and get the list of users
app.route('/api/users')
  .post(function(req, res) {
    const username = req.body.username;
    if(!username) {
      return res.json({error: "$username is required to POST there"});
    }

    const user = new User({ username: username });
    user.save(function(err, udata) {
      if(err) {
        return res.json({ error: err});
      }

      return res.json(udata);
    });
  })
  .get(function(req, res) {
    User.find(function(err, udata) {
      if(err) {
        return res.json({error: err});
      }

      return res.json(udata);
    });
  });

// to post a exercise for a specific user
app.route('/api/users/:_id/exercises')
  .post(function(req, res) {
    const userId = req.params._id;
    let {description, duration, date} = req.body;
    if (!description || !duration || !userId) {
      return res.json({ error: "Something required is missing in the request"});
    }

    User.findById({_id: userId}, function(err, udata) {
      if (err) {
        return res.json({error: err});
      }

      const exercice = new Exercise({
        description: description,
        duration: Number(duration),
        date: isNaN(new Date(date).valueOf()) ? new Date() : new Date(date),
        user: udata._id
      });

      exercice.save(function(err, edata) {
        if (err) {
          return res.json({error: err});
        }

        return res.json({
          username: String(udata.username),
          description: String(edata.description),
          duration: Number(edata.duration),
          date: String(new Date(edata.date).toDateString()),
          _id: String(udata._id),
        });
      });
    });
});

// to get logs of each exercise for specific user
// can be filter by that using from, to and limit query params
app.route('/api/users/:_id/logs') 
  .get(function(req, res) {
    const userId = req.params._id;
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;
    function getLog(data) {
      // utility function to format each log in the required format
      let logs = [];
      for (const log of data) {
        logs.push({
          description: String(log.description),
          duration: Number(log.duration),
          date: String(new Date(log.date).toDateString())
        });
      }

      return logs;
    }

    if (!userId) {
      return res.json({error: "User id required"});
    }

    User.findById(userId, function(err, udata) {
      if (err) {
        return res.json({error: err});
      }

      let filters = {user: udata._id};
      if (from && !isNaN(new Date(from).valueOf())) {
        console.log("from :", from);
        filters.date = { $gte: new Date(from) }
      }

      if (to && !isNaN(new Date(to).valueOf())) {
        console.log("to :", to);
        filters.date = {...filters.date, $lte: new Date(to) }
      }

      let query = Exercise.find(filters);
      if (limit && !isNaN(Number(limit))) {
        console.log("limit :", limit);
        query = Exercise.find(filters).limit(Number(limit));
      }

      console.log("filters :", filters);
      query.exec(function(err, edata) {
        if(err) {
          return res.json({error: err});
        }

        const logs = getLog(edata);

        return res.json({
          username: String(udata.username),
          count: logs.length,
          _id: String(udata._id),
          log: logs
        });
      });
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});