import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get('projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  async function handleAppProject() {
    const response = await api.post('projects', {
      title: `Novo Project ${Date.now()}`,
      owner: 'Daniel Felizardo',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => String(project.id)}
          renderItem={({item: project}) => (
            <Text key={project.id} style={styles.project}>
              {project.title}
            </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleAppProject}
          style={styles.button}>
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  project: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
