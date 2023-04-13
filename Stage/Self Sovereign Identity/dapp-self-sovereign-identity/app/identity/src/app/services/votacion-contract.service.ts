import { Injectable } from '@angular/core';
import Web3  from "web3";
import { GenericContractService} from './generic-contract.service';

declare let require: any;
let tokenAbi = require('./Voting.json');


@Injectable({
  providedIn: 'root'
})
export class VotacionContractService {

  private contractInstance;

  constructor(private genericContract: GenericContractService) { 
    this.initContract();
  }
  
  private initContract(){
    this.contractInstance = this.genericContract.initContract(tokenAbi.abi, "0x7736A5FE151bf7770713e8638A6039AA6b44B958");
  }

  public getCandidateTotal(candidateName): Promise<any>{
    return this.contractInstance.methods.totalVotesFor(this.genericContract.asciiToHex(candidateName)).call();
  }

  public voteForCandidate(candidateName): Promise<any>{
    const promise = this.contractInstance.methods.voteForCandidate(this.genericContract.asciiToHex(candidateName));
    return promise.send({from: this.genericContract.getAddress()});
  }
  
}
