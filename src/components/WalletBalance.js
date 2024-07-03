import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletBalance({ signer }) {
  const [ethBalance, setEthBalance] = useState('0');
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function fetchBalance() {
      if (signer) {
        const address = await signer.getAddress();
        setAddress(address);
        const balance = await signer.provider.getBalance(address);
        setEthBalance(ethers.formatEther(balance));
      }
    }
    fetchBalance();
  }, [signer]);

  return (
    <div className="wallet-balance">
      <h2>Wallet Balance</h2>
      <p>Address: {address}</p>
      <p>ETH Balance: {ethBalance} ETH</p>
    </div>
  );
}

export default WalletBalance;