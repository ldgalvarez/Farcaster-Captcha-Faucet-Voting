import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import TokenFaucet from '../abis/TokenFaucet.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #28a745;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.success ? 'green' : 'red')};
  margin-top: 10px;
`;

const AccountInfo = styled.p`
  color: #666;
  margin-top: 10px;
  font-style: italic;
`;

const Faucet = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const tokenFaucetData = TokenFaucet.networks[networkId];

        if (tokenFaucetData) {
          const tokenFaucet = new web3.eth.Contract(TokenFaucet.abi, tokenFaucetData.address);
          await tokenFaucet.methods.requestTokens().send({ from: accounts[0] });
          setSuccess('Tokens requested successfully.');
        } else {
          setError(`TokenFaucet contract not deployed to detected network (${networkId}).`);
        }
      } catch (error) {
        setError('Error requesting tokens: ' + error.message);
      }
    } else {
      setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    setLoading(false);
  };

  const handleClick = () => {
    setLoading(true);
    setSuccess('');
    setError('');
    loadBlockchainData();
  };

  return (
    <Container>
      <Title>Token Faucet</Title>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? 'Requesting Tokens...' : 'Request Tokens'}
      </Button>
      {account && <AccountInfo>Connected Account: {account}</AccountInfo>}
      {success && <Message success>{success}</Message>}
      {error && <Message>{error}</Message>}
    </Container>
  );
};

export default Faucet;
