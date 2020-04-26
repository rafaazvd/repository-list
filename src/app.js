const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.status(200).json({repositories});
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  repositorie = {
    id: uuid(),
    url: url, 
    title: title,
    techs: techs, 
    likes: 0 
  }
  repositories.push(repositorie);
  return res.status(201).json({repositorie});
});

app.put("/repositories/:id", (req, res) => {
const { id } = req.params;
const { title, url, techs } = req.body;
const repo = repositories.findIndex(r => r.id === id);
if(!repositories[repo]){
  return res.status(400).send('not found.');
}
 if (title){
  repositories[repo].title = title;
 }
 if (url){
  repositories[repo].url = url;
 }
 if (techs){
  repositories[repo].techs = techs;
 }
 const repositorie = repositories[repo];
 return res.status(200).json({repositorie});
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repo = repositories.findIndex(r => r.id === id);
  if(!repositories[repo]){
    return res.status(400).send('not exist.');
  }
  repositories.splice(repo, 1);
 return res.status(204).json({repositories});
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const repo = repositories.findIndex(r => r.id === id);
  if(!repositories[repo]){
    return res.status(400).send('not exist.');
  }
  repositories[repo].likes += 1;
 return res.status(200).json({repositorie});

});

module.exports = app;
