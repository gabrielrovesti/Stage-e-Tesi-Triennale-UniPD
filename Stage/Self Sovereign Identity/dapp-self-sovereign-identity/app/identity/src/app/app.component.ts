import { Component } from '@angular/core';
import { IdentityContractService } from './services/identity-contract.service';
import { AppSelectorService } from './services/app-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //public title = 'Identidad Soberana - CNMV';
  //public imagenPath = "assets/img/identity.png";

  constructor(private identityContractService: IdentityContractService, public appSelectorService: AppSelectorService) { 
  }
  

}
