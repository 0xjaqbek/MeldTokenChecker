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
  const [isEligible, setIsEligible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (isTelegramWebApp()) {
      window.Telegram.WebApp.ready();
    }
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
                {inviteLink && (
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