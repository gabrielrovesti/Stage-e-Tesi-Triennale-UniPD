import { Component, OnInit, Inject } from '@angular/core';
import { IdentityContractService } from '../services/identity-contract.service';
import { Router } from '@angular/router';
import { IPFS } from '../services/ipfs.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-agregar-licencia-trader',
  templateUrl: './agregar-licencia-trader.component.html',
  styleUrls: ['./agregar-licencia-trader.component.css']
})
export class AgregarLicenciaTraderComponent implements OnInit {

  public txtLicenceNo: string;
  public txtFullName: string;
  public txtId: string;
  public txtDOB: string;
  public txtAddress: string;
  public fileGreater500kHash: File = null;
  public fileAtLeast1YearHash: File = null;
  public file10TransHash: File = null;
  public txtGreater500kHash: string;
  public txtAtLeast1YearHash: string;
  public txt10TransHash: string;

  constructor(private identityContractService: IdentityContractService, private router: Router, @Inject(IPFS) private ipfs) {
   }

  ngOnInit() {
  }
  
  public addLicencia(){

          const reader = new FileReader();
          const fileReaderPromise = new Promise(resolve => reader.onload = resolve);
          reader.readAsArrayBuffer(this.fileGreater500kHash); // Read Provided File
          fileReaderPromise.then(async e => {
                console.log(e);
                const buf = Buffer(reader.result) ;// Convert data into buffer  
                console.log(buf);   
                const filesAdded = await this.ipfs.add(buf);
                this.txtGreater500kHash = filesAdded[0].hash;

                const reader2 = new FileReader();
                const fileReaderPromise2 = new Promise(resolve => reader2.onload = resolve);
                reader2.readAsArrayBuffer(this.fileAtLeast1YearHash); // Read Provided File
                fileReaderPromise2.then(async e => {
                      console.log(e);
                      const buf = Buffer(reader2.result) ;// Convert data into buffer  
                      console.log(buf);   
                      const filesAdded = await this.ipfs.add(buf);
                      this.txtAtLeast1YearHash = filesAdded[0].hash;

                      const reader3 = new FileReader();
                      const fileReaderPromise3 = new Promise(resolve => reader3.onload = resolve);
                      reader3.readAsArrayBuffer(this.file10TransHash); // Read Provided File
                      fileReaderPromise3.then(async e => {
                            console.log(e);
                            const buf = Buffer(reader3.result) ;// Convert data into buffer  
                            console.log(buf);   
                            const filesAdded = await this.ipfs.add(buf);
                            this.txt10TransHash = filesAdded[0].hash;

                            console.log(this.txtLicenceNo + "-" + this.txtFullName + "-" + this.txtId + "-" +
                              this.txtDOB + "-" + this.txtAddress + "-" + this.txtGreater500kHash + "-" + this.txtAtLeast1YearHash + "-" + this.txt10TransHash);

                            this.identityContractService.addUserTraderCert(this.txtLicenceNo, this.txtFullName, this.txtId, 
                              this.txtDOB, this.txtAddress,  this.txtGreater500kHash, this.txtAtLeast1YearHash, this.txt10TransHash
                            )
                            .then(result=> {
                                console.log(result); 
                                this.router.navigate([ `mensajes/${result.transactionHash}/MENSAJE_LICENCIA` ]);
                              }
                            );  

                      });

                });

          });
  }

  public handleFileGreater500k(files: FileList) {
      this.fileGreater500kHash = files.item(0);
  }

  public handleFileAtLeast1Year(files: FileList) {
      this.fileAtLeast1YearHash = files.item(0);
  }

  public handleFile10TransFile(files: FileList) {
      this.file10TransHash = files.item(0);
  }

}
