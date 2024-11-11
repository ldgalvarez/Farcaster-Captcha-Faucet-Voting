// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is Ownable {
    struct Vote {
        address voter;
        uint8 option;
    }

    struct Poll {
        string question;
        string[] options;
        mapping(address => bool) hasVoted;
        Vote[] votes;
    }

    Poll[] public polls;

    function createPoll(string memory question, string[] memory options) public onlyOwner {
        Poll storage newPoll = polls.push();
        newPoll.question = question;
        newPoll.options = options;
    }

    function vote(uint256 pollId, uint8 option) public {
        require(pollId < polls.length, unicode"ID de encuesta no valido.");
        Poll storage poll = polls[pollId];
        require(!poll.hasVoted[msg.sender], "Ya has votado en esta encuesta.");
        poll.votes.push(Vote(msg.sender, option));
        poll.hasVoted[msg.sender] = true;
    }

    function getPoll(uint256 pollId) public view returns (string memory, string[] memory, uint256[] memory) {
        require(pollId < polls.length, unicode"ID de encuesta no válido.");
        Poll storage poll = polls[pollId];
        uint256[] memory results = new uint256[](poll.options.length);

        for (uint256 i = 0; i < poll.votes.length; i++) {
            results[poll.votes[i].option]++;
        }

        return (poll.question, poll.options, results);
    }
}
