import { Component, OnInit } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-petitorios',
  templateUrl: './ver-petitorios.component.html',
  styleUrls: ['./ver-petitorios.component.css']
})
export class VerPetitoriosComponent implements OnInit {
   
  public listPetitorios = [];
  public lengthListPetitorios: number;
  
  constructor(private identityContractService: IdentityContractService, private router: Router) { }

  ngOnInit() {
	this.identityContractService.
	  viewTradeCertRequestLength(this.identityContractService.getUserAddress())
	  .then(result=> {
		this.lengthListPetitorios = result;
		for(let i=0; i< result; i++){
			this.identityContractService.
			  viewTradeCertRequestHeader(this.identityContractService.getUserAddress(), i)
			  .then(result=> {
			  	let requestOverAllStatusString = "";
			  	switch(result.requestOverAllStatus){
			  		case "1":
			  			requestOverAllStatusString = "Pendiente";
			  			break;
			  		case "2":
			  			requestOverAllStatusString = "Parcialmente Aprobado";
			  			break;
			  		case "3":
			  			requestOverAllStatusString = "Aprobado";
			  			break;
			  		case "4":		
			  			requestOverAllStatusString = "Denegado";
			  			break;	  		
			  	}
			  	this.listPetitorios.push({ requestedBy: result.requestedBy, requestOverAllStatus: result.requestOverAllStatus, requestOverAllStatusString: requestOverAllStatusString, index: i});	
			  	console.log(this.listPetitorios);			  	
		          	  });				
		}
          	  });		
  }

  public moreInformation(index){
          	this.router.navigate([ `ver-petitorio-detalle/${index}/${this.identityContractService.getUserAddress()}` ]);
  }
}
