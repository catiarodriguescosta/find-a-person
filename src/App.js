import React from 'react';
import './App.css';
import PageHeader from './components/PageHeader';


function App() {
  return (
    <div className="App">
      <PageHeader 
        title="Find a Person"
        bgImg = {IndexHeaderImg}
      />
    </div>
  );
}

export default App;
