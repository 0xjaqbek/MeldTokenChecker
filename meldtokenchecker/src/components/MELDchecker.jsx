import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Alert, AlertDescription } from "./ui/alert";

// ABI for ERC20 token balance checking
const minABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// Check if running in Telegram WebApp
const isTelegramWebApp = () => {
  return typeof window.Telegram !== 'undefined' && window.Telegram.WebApp !== undefined;
};

const MeldTokenChecker = () => {
  const [address, setAddress] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramUserId, setTelegramUserId] = useState('');
  const [isEligible, setIsEligible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [showLink, setShowLink] = useState(false); // To control when to show the invite link

  useEffect(() => {
    // Inject the Telegram login script
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.setAttribute('data-telegram-login', 'getDataForMeldBot'); // Change this to your actual bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '5');
    script.setAttribute('data-auth-url', 'https://0xjaqbek.github.io/MeldTokenChecker/'); // Adjust this URL
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
    document.getElementById('telegram-button-container').appendChild(script);
    
    // Make the onTelegramAuth function available globally
    window.onTelegramAuth = (user) => {
      if (user) {
        setTelegramUsername(user.username);
        setTelegramUserId(user.id);
        console.log('Telegram Username:', user.username);
        console.log('Telegram User ID:', user.id);
      }
    };

    checkWalletConnection();
}, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setIsWalletConnected(true);
        setAddress(accounts[0]);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        if (isTelegramWebApp()) {
          // Open wallet connection in external browser
          window.Telegram.WebApp.openLink('https://metamask.app.link/dapp/' + window.location.host + window.location.pathname);
        } else {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsWalletConnected(true);
          setAddress(accounts[0]);
        }
        setError('');
      } catch (err) {
        setError('Failed to connect wallet: ' + err.message);
      }
    } else {
      setError('Please install MetaMask!');
    }
  };

  const addMeldNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13d92e8d',
            chainName: 'Meld',
            nativeCurrency: {
              name: 'gMELD',
              symbol: 'gMELD',
              decimals: 18
            },
            rpcUrls: ['https://subnets.avax.network/meld/mainnet/rpc'],
            blockExplorerUrls: ['https://meldscan.io']
          }]
        });
        setError('');
      } catch (addError) {
        setError('Failed to add Meld network: ' + addError.message);
      }
    } else {
      setError('Please install MetaMask!');
    }
  };

  const checkEligibility = async () => {
    setIsLoading(true);
    setError('');
    setIsEligible(null);

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://subnets.avax.network/meld/mainnet/rpc');
      const tokenAddress = '0x333000333528b1e38884a5d1EF13615B0C17a301';  // Updated contract address
      const contract = new ethers.Contract(tokenAddress, minABI, provider);
      
      const balance = await contract.balanceOf(address);
      
      // Check if the balance is greater than or equal to 5,000,000 tokens
      const requiredBalance = ethers.utils.parseUnits('5000000', 18);  // Assuming 18 decimal places
      const eligible = balance.gte(requiredBalance);
      
      setIsEligible(eligible);

      if (eligible) {
        try {
          const response = await fetch('https://tokengate-8acc7ede28d5.herokuapp.com/generate-link');  
          if (!response.ok) {
            throw new Error('Failed to get invite link from the server');
          }
          const data = await response.json();
          setInviteLink(data.inviteLink);
        } catch (error) {
          setError('Error fetching invite link: ' + error.message);
        }
      }
    } catch (err) {
      setError('Error checking eligibility: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = () => {
    if (telegramUsername) {
      console.log('Connected Wallet Address:', address);
      console.log('Telegram Username:', telegramUsername);
      console.log('Telegram User ID:', telegramUserId);
      setShowLink(true); // Show the invite link after data is saved
    } else {
      console.log('Please enter your Telegram username.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">$MELD Token Checker</h1>
      <div className="flex gap-2 mb-4">
        <button 
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
        <button 
          onClick={addMeldNetwork}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add MELD Network
        </button>
      </div>

      {/* Telegram Login Button Container */}
      <div id="telegram-button-container" className="mb-4"></div>

      <input
        type="text"
        value={address}
        readOnly
        placeholder="Enter address to check"
        className="w-full p-2 border rounded mb-4"
      />

      <button 
        onClick={checkEligibility}
        disabled={isLoading}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        {isLoading ? 'Checking...' : 'Check Eligibility'}
      </button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isEligible !== null && (
        <Alert variant={isEligible ? "default" : "destructive"}>
          <AlertDescription>
          {isEligible ? (
              <>
                You are eligible! <br />
                {/* Show Telegram username input and Save Data button if eligible */}
                <input
                  type="text"
                  value={telegramUsername}
                  readOnly
                  placeholder="Paste Telegram user name and click save"
                  className="w-full p-2 border rounded mb-4"
                />
                <button 
                  onClick={saveData}
                  className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
                >
                  Save Data
                </button>
                {/* Show the invite link after Save Data is clicked */}
                {showLink && (
                  <a href={inviteLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    Click here to join the Telegram group
                  </a>
                )}
              </>
            ) : (
              "You are not eligible."
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MeldTokenChecker;