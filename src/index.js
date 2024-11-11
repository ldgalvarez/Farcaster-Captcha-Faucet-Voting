import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import App from './App';
import './styles.css';

async function loadBlockchainData() {
  let web3;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Intentar con ethereum.enable()
      await window.ethereum.enable();
      console.log('Web3 provider set:', web3);
    } catch (error) {
      console.error('User denied account access', error);
    }
  } else if (window.web3) {
    // Configuración para DApps antiguas
    web3 = new Web3(window.web3.currentProvider);
    console.log('Web3 provider set for legacy DApp:', web3);
  } else {
    console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

// Llama a la función para cargar los datos de la blockchain
loadBlockchainData().catch((error) => {
  console.error('Error loading blockchain data:', error);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
