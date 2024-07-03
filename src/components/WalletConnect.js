import { ethers } from 'ethers';

function WalletConnect({ setProvider, setSigner, setAddress }) {
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setSigner(signer);
        setAddress(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <button onClick={connectWallet}>Connect Wallet</button>
  );
}

export default WalletConnect;