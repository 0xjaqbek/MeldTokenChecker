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
        <p>
        Meld Token Checker is a secure and automated solution for managing exclusive access to Telegram group based on token ownership.<br>
        </br>The app verifies user eligibility by connecting to their EVM-compatible wallet and ensuring they hold the required balance of tokens.<br>
        </br>Users can easily log in via Telegram and wallet, and if they meet the token requirements, they receive a one-time-use invite link to the group.</p>
        <h3>Choose gate:</h3>
        <button onClick={() => handleClick('MELD')} className="flat-button">$MELD</button> 
        <button onClick={() => handleClick('BankerNFT')} className="flat-button">Banker NFT</button>
      </header>
      <main>
        {selectedChecker === 'MELD' && <MELDChecker />}
        {selectedChecker === 'BankerNFT' && <MeldTokenChecker />}
      </main>
    </div>
  );
}

export default App;
