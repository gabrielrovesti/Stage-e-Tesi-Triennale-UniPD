import { Injectable } from '@angular/core';
import Web3  from "web3";
import { GenericContractService} from './generic-contract.service';

declare let require: any;
let tokenAbi = require('./IdentityManagement.json');


@Injectable({
  providedIn: 'root'
})
export class IdentityContractService {

  private contractInstance;

  constructor(private genericContract: GenericContractService) { 
    this.initContract();
  }
  
  private initContract(){
    this.contractInstance = this.genericContract.initContract(tokenAbi.abi, "0x7736A5FE151bf7770713e8638A6039AA6b44B958");
  }

  public viewUser(userIndex): Promise<any>{
    return this.contractInstance.methods.viewUser(this.genericContract.getAddress(), userIndex).call();
  }

  public addUser(fullName, emailId, mobileNo): Promise<any>{
    const promise = this.contractInstance.methods.addUser(this.genericContract.getAddress(), fullName, emailId, mobileNo);
    return promise.send({from: this.genericContract.getAddress()});
  }
  
  public addUserTraderCert(tcNo, tcFullName, tcId, tcBirthDate, tcAddress, tcGreater500kHash, tcAtLeast1YearHash, tc10TransHash): Promise<any>{    
    const promise = this.contractInstance.methods.addUserTraderCert(this.genericContract.getAddress(), tcNo, tcFullName, tcId, tcBirthDate, tcAddress, 
      this.genericContract.asciiToHex(tcGreater500kHash), this.genericContract.asciiToHex(tcAtLeast1YearHash),
      this.genericContract.asciiToHex(tc10TransHash)
    );
    return promise.send({from: this.genericContract.getAddress()});
  }
 
  public addTradeCertRequest(userAddress, requestedBy, tcNo, tcFullNameAndId, tcBirthDate, tcAddress, tcGreater500kHash, tcAtLeast1YearHash, tc10TransHash, requestOverAllStatus): Promise<any>{
    const promise = this.contractInstance.methods.addTradeCertRequest(userAddress, requestedBy, tcNo, tcFullNameAndId, tcBirthDate, tcAddress, tcGreater500kHash, tcAtLeast1YearHash, tc10TransHash, requestOverAllStatus);
    return promise.send({from: this.genericContract.getAddress()});
  }
  
    public viewTradeCertRequestLength(userAddress): Promise<any>{
        return this.contractInstance.methods.viewTradeCertRequestLength(userAddress).call();
    }

    public viewTradeCertRequestHeader(userAddress, requestIndex): Promise<any>{
        return this.contractInstance.methods.viewTradeCertRequestHeader(userAddress, requestIndex).call();    
    }

    public viewTradeCertRequestDetail(userAddress, requestIndex): Promise<any>{
        return this.contractInstance.methods.viewTradeCertRequestDetail(userAddress, requestIndex).call();    
    }

    public updateRequestStatus(userAddress, requestIndex, tcNo, tcFullNameAndId, tcBirthDate, tcAddress, tcGreater500kHash, tcAtLeast1YearHash, tc10TransHash, requestOverAllStatus) : Promise<any>{
      const promise = this.contractInstance.methods.updateRequestStatus(userAddress, requestIndex, tcNo, tcFullNameAndId, tcBirthDate, tcAddress, tcGreater500kHash, tcAtLeast1YearHash, tc10TransHash, requestOverAllStatus);
      return promise.send({from: this.genericContract.getAddress()});
    }

    public viewUserTraderCert(userAddress) : Promise<any>{
        return this.contractInstance.methods.viewUserTraderCert(userAddress).call();    
    }

   public getUserAddress(){
        return this.genericContract.getAddress();
   }

  public hexToAscii(value){
        return this.genericContract.hexToAscii(value);  
  }

}
