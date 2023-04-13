import { Component, Inject, OnInit } from '@angular/core';
import Web3  from "web3";

import { VotacionContractService } from 'src/app/services/votacion-contract.service';

declare let require: any;
let tokenAbi = require('./Voting.json');

@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css']
})
export class VotacionComponent implements OnInit {

  private candidates = { David: 0, Ivan: 0, Marta: 0 };
  public inputText: string = "";
  
  constructor(private votacionContract: VotacionContractService) {
  }

  async ngOnInit() {
    this.totalCandidates();
  }

  public voteForCandidate(){
    this.votacionContract.voteForCandidate(this.inputText).then(result=> this.refreshCandidate(this.inputText));
  }

  private totalCandidates()
  {
      const candidateNames = Object.keys(this.candidates);
      for (let i = 0; i < candidateNames.length; i++) {
        let candidateName = candidateNames[i];
        this.refreshCandidate(candidateName);
      }
  }

  private refreshCandidate(candidateName){
    this.votacionContract.getCandidateTotal(candidateName).then(result => this.candidates[candidateName] = result);
  }
}
