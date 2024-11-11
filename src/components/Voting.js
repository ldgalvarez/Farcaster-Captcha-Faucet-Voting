import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import VotingSystem from '../abis/VotingSystem.json';

const Container = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 50px auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const PollContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const PollTitle = styled.h3`
  color: #555;
  margin-bottom: 10px;
`;

const OptionButton = styled.button`
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const AccountInfo = styled.p`
  color: #666;
  text-align: center;
  margin-top: 20px;
  font-style: italic;
`;

const Message = styled.p`
  color: ${(props) => (props.success ? 'green' : 'red')};
  text-align: center;
  margin-top: 20px;
`;

const Voting = () => {
  const [polls, setPolls] = useState([]);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
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
        const votingSystemData = VotingSystem.networks[networkId];
        if (votingSystemData) {
          const votingSystem = new web3.eth.Contract(VotingSystem.abi, votingSystemData.address);
          const pollCount = await votingSystem.methods.pollCount().call();
          const pollsArray = [];
          for (let i = 0; i < pollCount; i++) {
            const poll = await votingSystem.methods.getPoll(i).call();
            pollsArray.push(poll);
          }
          setPolls(pollsArray);
        } else {
          setError('VotingSystem contract not deployed to detected network.');
        }
      } catch (error) {
        console.error('Error loading blockchain data:', error);
        setError('Error loading blockchain data.');
      }
      setLoading(false);
    } else {
      console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
      setLoading(false);
    }
  };

  const vote = async (pollId, option) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const networkId = await web3.eth.net.getId();
        const votingSystemData = VotingSystem.networks[networkId];
        if (votingSystemData) {
          const votingSystem = new web3.eth.Contract(VotingSystem.abi, votingSystemData.address);
          await votingSystem.methods.vote(pollId, option).send({ from: account });
          console.log('Vote casted');
          // Refresh polls data after voting
          loadBlockchainData();
        } else {
          setError('VotingSystem contract not deployed to detected network.');
        }
      } catch (error) {
        console.error('Error casting vote:', error);
        setError('Error casting vote.');
      }
    } else {
      console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  return (
    <Container>
      <Title>Voting System</Title>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        polls.map((poll, index) => (
          <PollContainer key={index}>
            <PollTitle>{poll.question}</PollTitle>
            {poll.options.map((option, i) => (
              <OptionButton key={i} onClick={() => vote(index, i)}>{option}</OptionButton>
            ))}
          </PollContainer>
        ))
      )}
      {account && <AccountInfo>Connected Account: {account}</AccountInfo>}
    </Container>
  );
};

export default Voting;
