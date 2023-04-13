import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotacionComponent } from './votacion/votacion.component';
import { TestingComponent } from './testing/testing.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AgregarLicenciaTraderComponent } from './agregar-licencia-trader/agregar-licencia-trader.component';
import { CrearPetitorioLicenciaComponent } from './crear-petitorio-licencia/crear-petitorio-licencia.component';
import { IPFS, initIPFS } from './services/ipfs.service';
import { IpfsTestComponent } from './ipfs-test/ipfs-test.component';
import { VerPetitoriosComponent } from './ver-petitorios/ver-petitorios.component';
import { VerPetitorioDetalleComponent } from './ver-petitorio-detalle/ver-petitorio-detalle.component';
import { VerPetitoriosOrgComponent } from './ver-petitorios-org/ver-petitorios-org.component';
import { VerPetitorioDetalleOrgComponent } from './ver-petitorio-detalle-org/ver-petitorio-detalle-org.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    VotacionComponent,
    TestingComponent,
    InicioComponent,
    CrearUsuarioComponent,
    MensajesComponent,
    AgregarLicenciaTraderComponent,
    CrearPetitorioLicenciaComponent,
    IpfsTestComponent,
    VerPetitoriosComponent,
    VerPetitorioDetalleComponent,
    VerPetitoriosOrgComponent,
    VerPetitorioDetalleOrgComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initIPFS,
    multi: true,
    deps: [IPFS]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
