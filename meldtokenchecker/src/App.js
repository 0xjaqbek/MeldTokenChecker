import React from 'react';
import MeldTokenChecker from './components/MeldTokenChecker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meld Eligibility Checker</h1>
        <h2>Choose gate:</h2>
      </header>
      <main>
        <MeldTokenChecker />
      </main>
    </div>
  );
}

export default App;