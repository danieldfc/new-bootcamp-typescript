import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import api from './services/api';

import './App.css';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    }).catch(error => {
      console.error(error);
    });
  }, [projects]);

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`])
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Daniel Felizardo',
    })

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title="Projects"/>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}
