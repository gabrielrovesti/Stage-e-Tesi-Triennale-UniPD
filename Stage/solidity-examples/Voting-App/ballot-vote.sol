// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ballot{
    struct Proposal{
        uint id; // proposal id
        string name; // proposal name
        uint voteCount; // vote count
    }

    struct Voter{
        uint weight; // weight of voter
        bool voted; // if voter voted
        uint vote; // proposal id of voted proposal
    }

    address public chairperson; // chairperson address
    mapping(address => Voter) public voters; // voter address to voter

    Proposal[] public proposals; // array of proposals

    // create a new ballot with $(_numProposals) proposals
    constructor(uint _numProposals){
        chairperson = msg.sender; // set chairperson address
        voters[chairperson].weight = 1; // set chairperson weight

        for(uint i = 0; i < _numProposals; i++){ // create proposals
            proposals.push(Proposal({ // push proposal to array
                id: i,
                name: "",
                voteCount: 0
            }));
        }
    }

    // give $(_voter) the right to vote on this ballot
    function giveRightToVote(address voter) public{
        require(msg.sender == chairperson, "Only chairperson can give right to vote."); // only chairperson can give right to vote
        require(!voters[voter].voted, "The voter already voted."); // voter already voted
        require(voters[voter].weight == 0, "The voter already has right to vote."); // voter already has right to vote

        voters[voter].weight = 1; // set voter weight
    }

    // set proposal name of $(_proposalId) to $(_name)
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender]; // get voter
        require(sender.weight != 0, "Has no right to vote."); // has no right to vote
        require(!sender.voted, "Already voted."); // already voted

        sender.voted = true; // set voted
        sender.vote = proposal; // set vote

        proposals[proposal].voteCount += sender.weight; // add weight to proposal vote count
    }

    // function that returns the winning proposal
    function winningName() public view returns (bytes32 winningName_){
        uint winningVoteCount = 0; // winning vote count

        for(uint i = 0; i < proposals.length; i++){ // loop through proposals
            if(proposals[i].voteCount > winningVoteCount){ // if proposal vote count is greater than winning vote count
                winningVoteCount = proposals[i].voteCount; // set winning vote count
                winningName_ = bytes32(proposals[i].id); // set winning name
            }
        }

    }
}
