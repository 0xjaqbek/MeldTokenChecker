import React, { useState, useEffect } from 'react';
import MeldTokenChecker from './components/MeldTokenChecker';
import MELDChecker from './components/MELDchecker';

function App() {
  const [selectedChecker, setSelectedChecker] = useState(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Simple browser detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsBrowser(!isMobile);
  }, []);

  const handleClick = (checkerType) => {
    setSelectedChecker(checkerType);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meld Eligibility Checker</h1>
        <p>
          Meld Token Checker is a secure and automated solution for managing exclusive access to Telegram group based on token ownership.<br />
          The app verifies user eligibility by connecting to their EVM-compatible wallet and ensuring they hold the required balance of tokens.<br />
          Users can easily log in via Telegram and wallet, and if they meet the token requirements, they receive a one-time-use invite link to the group.
        </p>
        <h3>Choose gate:</h3>
        {isBrowser ? (
          <>
            <button onClick={() => handleClick('MELD')} className="flat-button">$MELD</button> 
            <button onClick={() => handleClick('BankerNFT')} className="flat-button">Banker NFT</button>
          </>
        ) : (
          <p>Please open this page in a desktop browser to access the MELD and Banker NFT checkers.</p>
        )}
      </header>
      <main>
        {isBrowser && selectedChecker === 'MELD' && <MELDChecker />}
        {isBrowser && selectedChecker === 'BankerNFT' && <MeldTokenChecker />}
      </main>
    </div>
  );
}

export default App;