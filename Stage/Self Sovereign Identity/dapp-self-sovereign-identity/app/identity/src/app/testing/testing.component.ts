import { Component, OnInit } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor(private identityContractService: IdentityContractService) { }

  public ngOnInit() {
    setTimeout(() =>{
        this.identityContractService.addUser("pepe", "pepe@pepe", 123456)
          .then(result=> console.log(result))

        this.identityContractService.viewUser(0)
          .then(result=> console.log(result))
          
      }, 1000
    );
  }

}
