import React from 'react';
import './App.css';
import PageHeader from './components/PageHeader';
import IndexHeaderImg from './img/index.jpg'
import PersonsFinder from './components/PersonsFinder';


function App() {
  return (
    <div className="App">
      <PageHeader 
        title="Find a Person"
        bgImg = {IndexHeaderImg}
      />
      <div className="container">
        <PersonsFinder />
      </div>
    </div>
  );
}

export default App;
