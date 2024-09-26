import React, { useState } from 'react';
import MeldTokenChecker from './components/MeldTokenChecker';
import MELDChecker from './components/MELDchecker'; // Assuming you have a MELDChecker component

function App() {
  const [selectedChecker, setSelectedChecker] = useState(null);

  const handleClick = (checkerType) => {
    setSelectedChecker(checkerType);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meld Eligibility Checker</h1>
        <h2>Choose gate:</h2>
        <button onClick={() => handleClick('MELD')}>$MELD</button>
        <button onClick={() => handleClick('BankerNFT')}>Banker NFT</button>
      </header>
      <main>
        {selectedChecker === 'MELD' && <MELDChecker />}
        {selectedChecker === 'BankerNFT' && <MeldTokenChecker />}
      </main>
    </div>
  );
}

export default App;
