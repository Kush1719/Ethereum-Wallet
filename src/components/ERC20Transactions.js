import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

function ERC20Transactions({ signer }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [symbol, setSymbol] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (signer) {
      signer.getAddress().then(setWalletAddress);
    }
  }, [signer]);

  const sendToken = async () => {
    if (!signer) {
      console.log('Please connect your wallet first');
      return;
    }

    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await tokenContract.decimals();
      const transfer = await tokenContract.transfer(recipient, ethers.parseUnits(amount, decimals));
      console.log('Token transfer initiated:', transfer.hash);
      await transfer.wait();
      console.log('Token transfer confirmed');
      fetchBalance();
    } catch (error) {
      console.error('Error sending token:', error);
    }
  };

  const fetchBalance = async () => {
    if (!signer || !tokenAddress) return;

    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const address = await signer.getAddress();
      const decimals = await tokenContract.decimals();
      const balanceWei = await tokenContract.balanceOf(address);
      const balanceFormatted = ethers.formatUnits(balanceWei, decimals);
      setBalance(balanceFormatted);
      
      const tokenSymbol = await tokenContract.symbol();
      setSymbol(tokenSymbol);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    if (signer && tokenAddress) {
      fetchBalance();
    }
  }, [signer, tokenAddress]);

  return (
    <div>
      <h2>ERC20 Token Transactions</h2>
      <input 
        type="text" 
        placeholder="Token Contract Address" 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
      />
      
      {balance && (
        <p>Your balance: {balance} {symbol}</p>
      )}

      <h3>Send Tokens</h3>
      <input 
        type="text" 
        placeholder="Recipient Address" 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={sendToken}>Send Token</button>

      <h3>Receive Tokens</h3>
      <p>To receive tokens, ask the sender to transfer to your address:</p>
      <p>{walletAddress}</p>
    </div>
  );
}

export default ERC20Transactions;