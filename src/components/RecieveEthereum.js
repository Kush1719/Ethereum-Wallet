import React from 'react';
import QRCode from 'qrcode.react';

function ReceiveEthereum({ address }) {
  return (
    <div className="receive-ethereum">
      <h2>Receive Ethereum</h2>
      <p>Your Ethereum Address:</p>
      <p>{address}</p>
      <QRCode value={address} />
      <button onClick={() => navigator.clipboard.writeText(address)}>
        Copy Address
      </button>
    </div>
  );
}

export default ReceiveEthereum;