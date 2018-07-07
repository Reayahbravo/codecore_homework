const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require("./db/client");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));





app.get('/', (req, res) => {
  knex
  .select("*")
  .from("cohorts")
  .orderBy("id", 'desc')
  .then(cohorts => {
    res.render("cohorts", { cohorts: cohorts });
  });
});

app.get('/cohorts', (req, res) => {
  knex
  .select("*")
  .from("cohorts")
  .orderBy("id", 'desc')
  .then(cohorts => {
    res.render("cohorts", { cohorts: cohorts });
  });
});

app.get('/cohorts/new', (req, res) => {
  res.render('new');
});

app.post('/cohorts/new', (req, res) => {
  console.log(req.body.name)
  knex
  .insert({
    name: req.body.name,
    members: req.body.members,
    logoUrl: req.body.logoUrl
  })
  .into("cohorts")
 .returning("*")
 .then(([post]) => {
    res.redirect(`/cohorts`);
 });
});

app.get("/cohorts/:id", (req, res) => {
  knex
    .select("*")
    .from("cohorts")
    .where({ id: req.params.id })
    .then(results => {
      const [cohort] = results;
      let method;
      let quantity;
      let teams = [];
      let id = req.params.id;
      if (req.query.method && req.query.quantity) {
        method = req.query.method;
        quantity = Number(req.query.quantity);
        let temp = teamSort(method == "teamCount" ? true : false, cohort.members, quantity);
        teams = teams.concat(temp);
        res.cookie(id, teams.join("*"));
      } else {

      }
      res.render("cohort", { cohort: cohort, teams: teams });
    });
});

// isTeamCount should be true if I want a team count
// and false if I want it sorted by number/team
function teamSort(isTeamCount, str, count) {
  if (isTeamCount) {
    return teamCount(str, count);
  } else {
    return perTeam(str, count);
  }
}

function teamCount (str, count) {
  let names = str.split(", ");
  shuffleArray(names);
  let length = names.length;
  let remainder = length % count;
  let teams = [];
  for (let i=0; i<count; i++) {
    teams.push("");
    if (remainder > 0) {
      let temp = names.slice(0, Math.floor(length / count) +1);
      teams[i] = temp.join(", ");
      for (let j=0; j<Math.floor(length/count)+1; j++) {
        names.shift();
      }
      remainder--;
    } else {
      let temp = names.slice(0, Math.floor(length / count));
      teams[i] = temp.join(", ");
      for (let j=0; j<Math.floor(length/count); j++) {
        names.shift();
      }
    }
  }
  return teams;
}

function perTeam (str, count) {
  let names = str.split(", ");
  let numTeams = Math.ceil(names.length/count);
  return teamCount(str, numTeams);
}


 //Randomize array element order in-place.

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

module.exports = app;