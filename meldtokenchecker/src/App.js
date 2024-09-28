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

  const handleBackClick = () => {
    setSelectedChecker(null); // Reset to show the original screen
  };

  return (
    <div className="App">
      {/* Conditionally hide the header, info box, and 'Choose gate' when a gate is selected */}
      {!selectedChecker && (
        <>
          <header className="App-header">
            <h1>Meld Eligibility Checker</h1>
            <div className="info-box">
              <p>
                Meld Token Checker is a secure and automated solution for managing exclusive access to Telegram group based on token ownership.<br />
                The app verifies user eligibility by connecting to their EVM-compatible wallet and ensuring they hold the required balance of tokens.<br />
                Users can easily log in via Telegram and wallet, and if they meet the token requirements, they receive a one-time-use invite link to the group.
              </p>
            </div>
          </header>

          <h3>Choose gate:</h3>
        </>
      )}

      {isBrowser ? (
        <div className="button-container">
          {!selectedChecker ? (
            // Show 'MELD' and 'Banker NFT' buttons if no checker is selected
            <>
              <button onClick={() => handleClick('MELD')} className="flat-button">$MELD</button>
              <button onClick={() => handleClick('BankerNFT')} className="flat-button">Banker NFT</button>
            </>
          ) : (
            // Show 'Back' button when a checker is selected
            <button onClick={handleBackClick} className="flat-button">Back</button>
          )}
        </div>
      ) : (
        <p>Please open this page in a desktop browser to access the checkers.</p>
      )}

      <main>
        {/* Render the checker based on the selected gate */}
        {isBrowser && selectedChecker === 'MELD' && <MELDChecker />}
        {isBrowser && selectedChecker === 'BankerNFT' && <MeldTokenChecker />}
      </main>
    </div>
  );
}

export default App;
