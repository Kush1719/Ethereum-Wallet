import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function EthereumTransactions({ signer }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (signer) {
      signer.getAddress().then(address => {
        setWalletAddress(address);
        fetchBalance(address);
      });
    }
  }, [signer]);

  const fetchBalance = async (address) => {
    if (signer && signer.provider) {
      try {
        const balance = await signer.provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  const sendTransaction = async () => {
    if (!signer) {
      console.log('Please connect your wallet first');
      return;
    }

    try {
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount)
      });
      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      fetchBalance(walletAddress);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div>
      <h2>Ethereum Transactions</h2>
      <h3>Send Ethereum</h3>
      <input 
        type="text" 
        placeholder="Recipient Address" 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Amount in ETH" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={sendTransaction}>Send Ethereum</button>

      <h3>Receive Ethereum</h3>
      <p>To receive Ethereum, ask the sender to transfer to your address:</p>
      <p>{walletAddress}</p>
    </div>
  );
}

export default EthereumTransactions;