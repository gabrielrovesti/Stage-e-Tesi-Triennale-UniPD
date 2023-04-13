import { Component, OnInit } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-petitorio-detalle',
  templateUrl: './ver-petitorio-detalle.component.html',
  styleUrls: ['./ver-petitorio-detalle.component.css']
})
export class VerPetitorioDetalleComponent implements OnInit {
  
  private requestIndex: number;
  private userAddress: string;

  public model: any = {};
  public tcNo: boolean = false;
  public tcFullNameAndId: boolean = false;
  public tcBirthDate: boolean = false;
  public tcAddress: boolean = false;
  public tcGreater500kHash: boolean = false;
  public tcAtLeast1YearHash: boolean = false;
  public tc10TransHash: boolean = false;

  constructor(private identityContractService: IdentityContractService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
	this.route.params.subscribe(params => {
      	     this.requestIndex = params['requestIndex'];
      	     this.userAddress = params['userAddress']; 
	     this.identityContractService.
		  viewTradeCertRequestDetail(this.userAddress, this.requestIndex)
		  .then(result=> {
			console.log(result);
		  	this.model = result;
		         	this.tcNo = result.tcNo === '2' ? true : false; 
		         	this.tcFullNameAndId = result.tcFullNameAndId === '2' ? true : false;
		         	this.tcBirthDate =  result.tcBirthDate === '2' ? true : false;
		         	this.tcAddress = result.tcAddress === '2' ? true : false;
		         	this.tcGreater500kHash =  result.tcGreater500kHash === '2' ? true : false;
		         	this.tcAtLeast1YearHash =  result.tcAtLeast1YearHash === '2' ? true : false;
		         	this.tc10TransHash =  result.tc10TransHash === '2' ? true : false;
	          	     });		  	          	           	          	    
      	});  
  }

  public updateRequestStatus(){
        let requestOverAllStatus = 1;
        let requestAcceptedCount = 0;
        let requestCount = 0;

        if (this.model.tcNo !== '0'){
        	requestCount++;
        	if (this.tcNo) requestAcceptedCount++;
        }

        if (this.model.tcFullNameAndId !== '0'){
        	requestCount++;
	if (this.tcFullNameAndId) requestAcceptedCount++;
        }

        if (this.model.tcBirthDate !== '0'){
        	requestCount++;        
        	if (this.tcBirthDate) requestAcceptedCount++;
        }

        if (this.model.tcAddress !== '0'){        
        	requestCount++;
        	if (this.tcAddress) requestAcceptedCount++
        }

        if (this.model.tcGreater500kHash !== '0'){
        	requestCount++;
	if (this.tcGreater500kHash) requestAcceptedCount++
        }

        if (this.model.tcAtLeast1YearHash !== '0'){
        	requestCount++;
        	if (this.tcAtLeast1YearHash) requestAcceptedCount++
        }

        if (this.model.tc10TransHash !== '0'){
        	requestCount++;
        	if (this.tc10TransHash) requestAcceptedCount++
        }

        if (requestCount >0){
	        if (requestAcceptedCount == 0) 
	        	requestOverAllStatus = 4;
	        else if (requestCount == requestAcceptedCount)	
	        	requestOverAllStatus = 3;
	        else	
	        	requestOverAllStatus = 2;

	        this.identityContractService.updateRequestStatus(this.userAddress, this.requestIndex, 
	         this.tcNo ? 2 : this.model.tcNo === '0' ? 0 : 3, 
	         this.tcFullNameAndId ? 2 : this.model.tcFullNameAndId === '0' ? 0 : 3, 
	         this.tcBirthDate ? 2 : this.model.tcBirthDate === '0' ? 0 : 3,  
	         this.tcAddress ? 2 : this.model.tcAddress === '0' ? 0 : 3, 
	         this.tcGreater500kHash ? 2 : this.model.tcGreater500kHash === '0' ? 0 : 3, 
	         this.tcAtLeast1YearHash ? 2 : this.model.tcAtLeast1YearHash === '0' ? 0 : 3,
	         this.tc10TransHash ? 2 : this.model.tc10TransHash === '0' ? 0 : 3,
	         requestOverAllStatus
	        )
	        .then(result=> {
	            console.log(result); 
	            this.router.navigate([ "ver-petitorios" ]);
	          });    

        }
  }

}
