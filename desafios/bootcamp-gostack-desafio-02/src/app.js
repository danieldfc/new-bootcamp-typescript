const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
}); // TODO - pass

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes = 0 } = request.body;

  const repository = {
    id: uuid(),    
    title,
    url,
    techs,
    likes,
  };
  
  repositories.push(repository);

  return response.json(repository);
}); // TODO - pass

app.put("/repositories/:id", (request, response) => {
  const { id: id_repo } = request.params;
  const { title, url, techs, likes: likesRepo } = request.body;

  const repository = repositories.find(repository => repository.id === id_repo);
  
  if (!repository) {
    return response.status(400).json({ error: 'Repository not found' })
  }

  const { id, likes } = repository;

  const updateRepository = {
    id,
    title,
    url,
    techs,
    likes: likesRepo ? 0 : likes,
  };

  repositories[id] = updateRepository;

  return response.json(updateRepository)
}); // TODO - pass

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if (repositoryId < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryId, 1);

  return response.status(204).json();
}); // TODO - pass

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);
  
  if (!repository) {
    return response.status(400).json({ error: 'Repository not found' })
  }

  repository.likes += 1;

  return response.json(repository)
});

module.exports = app;
