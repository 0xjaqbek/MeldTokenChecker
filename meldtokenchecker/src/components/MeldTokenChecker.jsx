import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
<<<<<<< HEAD
=======
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
import { Alert, AlertDescription } from "./ui/alert";
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const minABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

const MELD_NETWORK = {
  chainId: '0x13d92e8d',  // Correct format as a string
  chainName: 'Meld',
  nativeCurrency: {
    name: 'gMELD',
    symbol: 'gMELD',
    decimals: 18
  },
  rpcUrls: ['https://subnets.avax.network/meld/mainnet/rpc'],
  blockExplorerUrls: ['https://meldscan.io']
};

const MeldTokenChecker = () => {
  const [address, setAddress] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramUserId, setTelegramUserId] = useState('');
  const [isEligible, setIsEligible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
<<<<<<< HEAD
  const [web3Modal, setWeb3Modal] = useState(null);
  const [showMeldNetworkModal, setShowMeldNetworkModal] = useState(false);
  const [wcUri, setWcUri] = useState('');
=======
  const [showLink, setShowLink] = useState(false);
  const [web3Modal, setWeb3Modal] = useState(null);
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
<<<<<<< HEAD
            [parseInt(MELD_NETWORK.chainId, 16)]: MELD_NETWORK.rpcUrls[0]
          },
          bridge: "https://bridge.walletconnect.org",
          qrcodeModalOptions: {
            desktopLinks: [],
            mobileLinks: []
          }
        },
      },
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      theme: "dark",
      disableInjectedProvider: false,
=======
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
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
    });

    setWeb3Modal(newWeb3Modal);

<<<<<<< HEAD
    // Telegram login script injection
=======
    // Telegram login script
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.setAttribute('data-telegram-login', 'getDataForMeldBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '5');
    script.setAttribute('data-auth-url', 'https://0xjaqbek.github.io/MeldTokenChecker/');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
    document.getElementById('telegram-button-container').appendChild(script);
<<<<<<< HEAD

=======
    
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
    window.onTelegramAuth = (user) => {
      if (user) {
        setTelegramUsername(user.username);
        setTelegramUserId(user.id);
        console.log('Telegram Username:', user.username);
        console.log('Telegram User ID:', user.id);
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
<<<<<<< HEAD
      console.log('Connected Provider:', provider);
      if (!provider) throw new Error("Provider not found.");
      
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const network = await ethersProvider.getNetwork();

      if (network.chainId !== parseInt(MELD_NETWORK.chainId, 16)) {
        setShowMeldNetworkModal(true);
      } else {
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();

        setIsWalletConnected(true);
        setAddress(address);
        setError('');
      }

      // Subscribe to connection events
      provider.on("connect", (info) => {
        console.log('Connected:', info);
      });

      provider.on("disconnect", (error) => {
        console.log('Disconnected:', error);
        setIsWalletConnected(false);
        setAddress('');
      });

      // If it's a WalletConnect provider, log the URI
      if (provider.wc) {
        console.log('WalletConnect URI:', provider.wc.uri);
        setWcUri(provider.wc.uri);
      }

    } catch (err) {
      console.error('Connection Error:', err);
      setError('Failed to connect wallet: ' + err.message);
      
      // Additional error handling
      if (err.message.includes('User closed modal')) {
        setError('Connection cancelled by user');
      } else if (err.message.includes('Cannot establish connection')) {
        setError('Cannot establish connection to WalletConnect. Please try again or use a different wallet.');
      }
    }
  };

  const switchToMeldNetwork = async () => {
    try {
      const provider = await web3Modal.connect();
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [MELD_NETWORK],
      });

      setShowMeldNetworkModal(false);  // Close the modal after successful switch
    } catch (err) {
      setError('Failed to switch to the Meld network: ' + err.message);
=======
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      
      setIsWalletConnected(true);
      setAddress(address);
      setError('');
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message);
    }
  };

  const addMeldNetwork = async () => {
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
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
    }
  };

  const checkEligibility = async () => {
    setIsLoading(true);
    setError('');
    setIsEligible(null);

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://subnets.avax.network/meld/mainnet/rpc');
      const tokenAddress = '0x333000Dca02578EfE421BE77FF0aCC0F947290f0';
      const contract = new ethers.Contract(tokenAddress, minABI, provider);
      const balance = await contract.balanceOf(address);
      
      const eligible = balance.gt(0);
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
  
        console.log('Data saved to Firebase!');
        setShowLink(true);
      } catch (error) {
        console.error('Error saving data to Firebase:', error);
      }
    } else {
      console.log('Please enter your Telegram username.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Meld Banker NFT Token Checker</h2>
      <h3>You must hold at least 1 MELD Banker NFT</h3>
      <div className="flex gap-2 mb-4">
        <button 
          onClick={connectWallet}
          className="flat-button"
        >
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
<<<<<<< HEAD
        </button>
      </div>
      {wcUri && (
        <div className="mt-4">
          <h4>WalletConnect URI (for debugging):</h4>
          <textarea 
            value={wcUri} 
            readOnly 
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
      )}
      <br />
      <div id="telegram-button-container" className="mb-4"></div>
      <br />
=======
        </button>
        <button 
          onClick={addMeldNetwork}
          className="flat-button"
        >
          Add MELD Network
        </button>
      </div>
      <div id="telegram-button-container" className="mb-4"></div>
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
      <input
        type="text"
        value={address}
        readOnly
        placeholder="Connected wallet address"
        className="w-full p-2 border rounded mb-4"
      />
<<<<<<< HEAD
      <br /><br />
=======
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
      <button 
        onClick={checkEligibility}
        disabled={isLoading}
        className="flat-button"
      >
        {isLoading ? 'Checking...' : 'Check Eligibility'}
      </button>
<<<<<<< HEAD
      <br />
=======
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
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
<<<<<<< HEAD
                You are eligible! <br />
=======
                You are eligible!
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
                <input
                  type="text"
                  value={telegramUsername}
                  readOnly
                  placeholder="Telegram username"
                  className="w-full p-2 border rounded mb-4"
<<<<<<< HEAD
                /><br />
=======
                />
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
                <button 
                  onClick={saveData}
                  className="flat-button"
                >
                  Get invite link
<<<<<<< HEAD
                </button><br />
=======
                </button>
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
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

      {showMeldNetworkModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Switch to Meld Network</h3>
            <p>Your wallet is not connected to the Meld network. Would you like to switch?</p>
            <button onClick={switchToMeldNetwork} className="flat-button">Switch to Meld Network</button>
            <button onClick={() => setShowMeldNetworkModal(false)} className="flat-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeldTokenChecker;