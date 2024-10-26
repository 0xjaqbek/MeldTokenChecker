import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { Alert, AlertDescription } from "./ui/alert";
<<<<<<< HEAD
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig, useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Define the MELD chain
const meldChain = {
  id: 333000333,
  name: 'Meld',
  network: 'meld',
  nativeCurrency: {
    decimals: 18,
    name: 'gMELD',
    symbol: 'gMELD',
  },
  rpcUrls: {
    default: { http: ['https://subnets.avax.network/meld/mainnet/rpc'] },
    public: { http: ['https://subnets.avax.network/meld/mainnet/rpc'] },
  },
  blockExplorers: {
    default: { name: 'MeldScan', url: 'https://meldscan.io' },
  }
};

// Configure Web3Modal
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Get this from cloud.walletconnect.com

const metadata = {
  name: 'Meld Token Checker',
  description: 'Check your MELD token eligibility',
  url: 'https://your-website.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, meldChain];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

// ABI for ERC20 token balance checking
=======
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
const minABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

<<<<<<< HEAD
=======
const isTelegramWebApp = () => {
  return typeof window.Telegram !== 'undefined' && window.Telegram.WebApp !== undefined;
};

>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
const MeldTokenChecker = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramUserId, setTelegramUserId] = useState('');
  const [isEligible, setIsEligible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [showLink, setShowLink] = useState(false);
<<<<<<< HEAD
=======
  const [web3Modal, setWeb3Modal] = useState(null);
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            324229530: 'https://subnets.avax.network/meld/mainnet/rpc'
          },
        }
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Meld Token Checker",
          rpc: 'https://subnets.avax.network/meld/mainnet/rpc',
          chainId: 324229530,
        }
      }
    };

    const newWeb3Modal = new Web3Modal({
      network: "meld",
      cacheProvider: true,
      providerOptions
    });

    setWeb3Modal(newWeb3Modal);

    // Telegram login script
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.setAttribute('data-telegram-login', 'getDataForMeldBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '5');
    script.setAttribute('data-auth-url', 'https://0xjaqbek.github.io/MeldTokenChecker/');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
    document.getElementById('telegram-button-container').appendChild(script);
    
    window.onTelegramAuth = (user) => {
      if (user) {
        setTelegramUsername(user.username);
        setTelegramUserId(user.id);
      }
    };
  }, []);

<<<<<<< HEAD
  const switchToMeldNetwork = async () => {
    try {
      await switchNetwork(meldChain.id);
      setError('');
    } catch (err) {
      setError('Failed to switch to MELD network: ' + err.message);
=======
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  };

  const connectWallet = async () => {
    try {
      if (isTelegramWebApp()) {
        // Open wallet connection in external browser
        window.Telegram.WebApp.openLink('https://metamask.app.link/dapp/' + window.location.host + window.location.pathname);
      } else {
        const provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        
        setIsWalletConnected(true);
        setAddress(address);
      }
      setError('');
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message);
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
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
    }
  };

  const checkEligibility = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (chain?.id !== meldChain.id) {
      setError('Please switch to MELD network first');
      return;
    }

    setIsLoading(true);
    setError('');
    setIsEligible(null);

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://subnets.avax.network/meld/mainnet/rpc');
      const tokenAddress = '0x333000333528b1e38884a5d1EF13615B0C17a301';
      const contract = new ethers.Contract(tokenAddress, minABI, provider);
      
      const balance = await contract.balanceOf(address);
<<<<<<< HEAD
=======
      
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
      const requiredBalance = ethers.utils.parseUnits('5000000', 18);
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

  const saveData = async () => {
    if (telegramUsername) {
      try {
        await addDoc(collection(db, "users"), {
          walletAddress: address,
          telegramUsername: telegramUsername,
          telegramUserId: telegramUserId,
          timestamp: new Date()
        });
<<<<<<< HEAD
=======
  
        console.log('Data saved to Firebase!');
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
        setShowLink(true);
      } catch (error) {
        setError('Error saving data: ' + error.message);
      }
    } else {
      setError('Please connect with Telegram first');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">$MELD Token Checker</h2>
      <h3>You must hold at least 5,000,000 $MELD</h3>
<<<<<<< HEAD
      
      <div className="flex flex-col gap-4 mb-4">
        <w3m-button />
        
        {isConnected && chain?.id !== meldChain.id && (
          <button 
            onClick={switchToMeldNetwork}
            className="flat-button"
          >
            Switch to MELD Network
          </button>
        )}
      </div>

      {isConnected && (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Connected Address:</p>
            <p className="font-mono break-all">{address}</p>
          </div>

          <div id="telegram-button-container" className="mb-4" />

          <button 
            onClick={checkEligibility}
            disabled={isLoading || chain?.id !== meldChain.id}
            className="flat-button w-full"
          >
            {isLoading ? 'Checking...' : 'Check Eligibility'}
          </button>
        </>
      )}

=======
      <div className="flex gap-2 mb-4">
        <button 
          onClick={connectWallet}
          className="flat-button"
        >
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
        <button 
          onClick={addMeldNetwork}
          className="flat-button"
        >
          Add MELD Network
        </button>
      </div>
      <div id="telegram-button-container" className="mb-4"></div>
      <input
        type="text"
        value={address}
        readOnly
        placeholder="Connected wallet address"
        className="w-full p-2 border rounded mb-4"
      />
      <button 
        onClick={checkEligibility}
        disabled={isLoading}
        className="flat-button"
      >
        {isLoading ? 'Checking...' : 'Check Eligibility'}
      </button>
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isEligible !== null && (
        <Alert variant={isEligible ? "default" : "destructive"} className="mt-4">
          <AlertDescription>
            {isEligible ? (
              <>
<<<<<<< HEAD
                You are eligible! <br />
=======
                You are eligible!
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
                <input
                  type="text"
                  value={telegramUsername}
                  readOnly
<<<<<<< HEAD
                  placeholder="Connect with Telegram to continue"
                  className="w-full p-2 border rounded my-4"
=======
                  placeholder="Telegram username"
                  className="w-full p-2 border rounded mb-4"
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
                />
                <button 
                  onClick={saveData}
                  className="flat-button w-full"
                  disabled={!telegramUsername}
                >
                  Get invite link
                </button>
<<<<<<< HEAD
                {showLink && inviteLink && (
                  <a 
                    href={inviteLink} 
                    className="block mt-4 text-blue-500 underline text-center" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
=======
                {showLink && (
                  <a href={inviteLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
                    Click here to join the Telegram group
                  </a>
                )}
              </>
            ) : (
              "You are not eligible. Minimum requirement: 5,000,000 MELD tokens"
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

<<<<<<< HEAD
// Wrap the component with WagmiConfig
const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <MeldTokenChecker />
    </WagmiConfig>
  );
};

export default App;
=======
export default MeldTokenChecker;
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
