import React from 'react';
import WalletConnect from "@walletconnect/client";

const WalletConnectButton = () => {
  const connectWallet = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
    });

    if (!connector.connected) {
      await connector.createSession();
    }

    const uri = connector.uri;
    console.log("WalletConnect URI:", uri);
    // You can then display this URI in a QR code or handle the connection
  };

  return (
    <button onClick={connectWallet} className="flat-button">
      Connect Wallet
    </button>
  );
};

export default WalletConnectButton;