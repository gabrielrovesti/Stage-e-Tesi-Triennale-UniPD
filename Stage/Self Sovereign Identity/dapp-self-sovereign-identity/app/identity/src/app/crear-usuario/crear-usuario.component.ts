import { Component, OnInit } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
   public txtFullName: string;
   public txtEmailID: string;
   public txtMobileNo: number;

  constructor(private identityContractService: IdentityContractService, private router: Router) { }

  ngOnInit() {
  }

  public addUser(){
          this.identityContractService.addUser(this.txtFullName, this.txtEmailID, this.txtMobileNo)
          .then(result=> {
          		console.log(result); 
          		this.router.navigate([ `mensajes/${result.transactionHash}/MENSAJE_WALLET` ]);
          	}
          );
  }

}
