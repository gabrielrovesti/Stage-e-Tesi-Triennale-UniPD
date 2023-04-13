import { Component, OnInit, Inject } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPFS } from '../services/ipfs.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-ver-petitorio-detalle-org',
  templateUrl: './ver-petitorio-detalle-org.component.html',
  styleUrls: ['./ver-petitorio-detalle-org.component.css']
})
export class VerPetitorioDetalleOrgComponent implements OnInit {

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

  public modelVal: any = {};

  constructor(private identityContractService: IdentityContractService, private router: Router, private route: ActivatedRoute, @Inject(IPFS) private ipfs) {
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

		     	this.identityContractService.
			  viewUserTraderCert(this.userAddress)
			  .then(result=> {
				console.log(result);
				this.modelVal = result;			         	
		          	     });		  	          	           	          	    

	          	     });		  	          	           	          	    
      	});  
  }
  
  public async moreInformation(hashHex){
      const hash = this.identityContractService.hexToAscii(hashHex);
      const fileBuffer = await this.ipfs.cat(hash);
      console.log(fileBuffer);

      let bytes = [];
      fileBuffer.subarray(0, 4).forEach((byte) => {
                    bytes.push(byte.toString(16))
      });
      const hex = bytes.join('').toUpperCase();

      var blob = new Blob([fileBuffer], {type: this.getMimetype(hex) });
      const url = URL.createObjectURL(blob);
      console.log(url);
      window.open(url);

  }

  public getMimetype (signature) {
        switch (signature) {
            case '89504E47':
                return 'image/png'
            case '47494638':
                return 'image/gif'
            case '25504446':
                return 'application/pdf'
            case 'FFD8FFDB':
            case 'FFD8FFE0':
                return 'image/jpeg'
            case '504B0304':
                return 'application/zip'
            default:
                return 'Unknown filetype'
        };
    }

}
