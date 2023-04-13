import { Injectable } from '@angular/core';
import Web3  from "web3";

@Injectable({
  providedIn: 'root'
})
export class GenericContractService {

  private web3: Web3;

  constructor() { 
    this.initWeb3();
    this.initAccount();
  }

  private async initWeb3() {
    if (typeof window["web3"] !== "undefined") {
      console.log("Using web3 detected from external source.");
      this.web3 = new Web3(window["web3"].currentProvider);  
    } else {
      console.log("No web3 detected. Falling back to http://localhost:8545.");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }  
    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }
  }

  private async initAccount() {
    const list = await this.web3.eth.getAccounts();
    this.web3.eth.defaultAccount = list[0];
    console.log(this.web3.eth.defaultAccount);
  }
  
  public initContract(abi, address): any{
    return new this.web3.eth.Contract(abi, address);
  }  

  public asciiToHex(value: string){
    return this.web3.utils.asciiToHex(value);
  }

  public hexToAscii(value){
    return this.web3.utils.hexToAscii(value);
  }

  public getAddress(){
    return this.web3.eth.defaultAccount;
  }
}
