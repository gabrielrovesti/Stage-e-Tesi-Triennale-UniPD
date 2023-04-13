import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  private MENSAJE_WALLET = "La creación del Wallet fue exitosa";
  private MENSAJE_LICENCIA = "La Licencia de Inversor Cualificado fue agregada a su Wallet en forma exitosa";  
  private MENSAJE_WARNING_LICENCIA = "(*) La CNMV valorará los documentos aportados y aprobará el certificado de la Licencia.";
  private MENSAJE_LICENCIA_REQUEST = "La solicitud de acceso a datos de la licencia de Inversor Cualificado fue enviado para su aprobación por parte del titular";

  public transactionHash: string;
  public mensajeHeader: string = this.MENSAJE_WALLET;
  public warning: string = "";


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.params.subscribe(params => {
        		this.transactionHash = params['id'];
                  switch(params['tipo']){
                    case "MENSAJE_WALLET":
                      this.mensajeHeader = this.MENSAJE_WALLET
                      break;
                    case "MENSAJE_LICENCIA":
                      this.mensajeHeader = this.MENSAJE_LICENCIA
                      this.warning = this.MENSAJE_WARNING_LICENCIA;
                      break;
                    case "MENSAJE_LICENCIA_REQUEST":
                      this.mensajeHeader = this.MENSAJE_LICENCIA_REQUEST
                      break;                     
                  }
      });  
  }

}
