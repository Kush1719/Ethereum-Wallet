import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import WalletBalance from './components/WalletBalance';
import EthereumTransactions from './components/EthereumTransactions';
import ERC20Transactions from './components/ERC20Transactions';
import './App.css';
import './WalletStyles.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <div className="App">
      <h1>Ethereum Wallet</h1>
      <WalletConnect 
        setProvider={setProvider} 
        setSigner={setSigner} 
        setAddress={setAddress} 
      />
      {signer && address && (
        <>
          <WalletBalance signer={signer} />
          <div className="wallet-section">
            <EthereumTransactions signer={signer} />
          </div>
          <div className="wallet-section">
            <ERC20Transactions signer={signer} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;