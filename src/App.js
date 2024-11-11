import React, { useEffect, useState } from 'react';
import Faucet from './components/Faucet';
import Voting from './components/Voting';
import './styles.css';
import Web3 from 'web3';

const App = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          web3.setProvider(window.ethereum);
          setWeb3(web3);
        } catch (error) {
          console.error('User denied account access', error);
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);
      } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    }
    loadWeb3().catch((error) => {
      console.error('Error loading Web3:', error);
    });
  }, []);

  return (
    <div>
      <h1>Farcaster Faucet and Voting</h1>
      {web3 ? (
        <>
          <Faucet />
          <Voting />
        </>
      ) : (
        <p>Web3 provider is not set. Please install MetaMask.</p>
      )}
    </div>
  );
};

export default App;
