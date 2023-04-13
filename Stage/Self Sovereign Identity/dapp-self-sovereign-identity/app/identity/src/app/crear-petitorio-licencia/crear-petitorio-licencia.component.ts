import { Component, OnInit } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-petitorio-licencia',
  templateUrl: './crear-petitorio-licencia.component.html',
  styleUrls: ['./crear-petitorio-licencia.component.css']
})
export class CrearPetitorioLicenciaComponent implements OnInit {

  public txtInstituteName: string;
  public txtUserAddress: string;
  public tcNo: boolean = false;
  public tcFullNameAndId: boolean = false;
  public tcBirthDate: boolean = false;
  public tcAddress: boolean = false;
  public tcGreater500kHash: boolean = false;
  public tcAtLeast1YearHash: boolean = false;
  public tc10TransHash: boolean = false;

  constructor(private identityContractService: IdentityContractService, private router: Router) { }

  ngOnInit() {
  	this.txtUserAddress =  this.identityContractService.getUserAddress();
  }

  public addTradeCertRequest(){
        this.identityContractService.addTradeCertRequest(this.txtUserAddress, this.txtInstituteName, 
         this.tcNo ? 1 : 0, 
         this.tcFullNameAndId ? 1 : 0, 
         this.tcBirthDate ? 1 : 0,  
         this.tcAddress ? 1 : 0, 
         this.tcGreater500kHash ? 1 : 0, 
         this.tcAtLeast1YearHash ? 1 : 0,
         this.tc10TransHash ? 1 : 0,
         1
        )
        .then(result=> {
            console.log(result); 
            this.router.navigate([ `mensajes/${result.transactionHash}/MENSAJE_LICENCIA_REQUEST` ]);
          });    
  }
}
