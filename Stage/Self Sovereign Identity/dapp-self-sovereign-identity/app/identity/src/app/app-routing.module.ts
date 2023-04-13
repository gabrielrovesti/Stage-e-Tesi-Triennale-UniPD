import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestingComponent} from './testing/testing.component';
import { VotacionComponent} from './votacion/votacion.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AgregarLicenciaTraderComponent } from './agregar-licencia-trader/agregar-licencia-trader.component';
import { CrearPetitorioLicenciaComponent } from './crear-petitorio-licencia/crear-petitorio-licencia.component';
import { IpfsTestComponent } from './ipfs-test/ipfs-test.component';
import { VerPetitoriosComponent } from './ver-petitorios/ver-petitorios.component';
import { VerPetitorioDetalleComponent } from './ver-petitorio-detalle/ver-petitorio-detalle.component';
import { VerPetitoriosOrgComponent } from './ver-petitorios-org/ver-petitorios-org.component';
import { VerPetitorioDetalleOrgComponent } from './ver-petitorio-detalle-org/ver-petitorio-detalle-org.component';

const routes: Routes = [
  {path: '', component: InicioComponent },
  {path: 'inicio/:menuSelector', component: InicioComponent },  
  {path: 'crear-usuario', component: CrearUsuarioComponent },
  {path: 'mensajes/:id/:tipo', component: MensajesComponent}, 
  {path: 'agregar-licencia-trader', component: AgregarLicenciaTraderComponent},  
  {path: 'crear-petitorio-licencia', component: CrearPetitorioLicenciaComponent},    
  {path: 'ver-petitorios', component: VerPetitoriosComponent},    
  {path: 'ver-petitorio-detalle/:requestIndex/:userAddress', component: VerPetitorioDetalleComponent},    
  {path: 'ver-petitorios-org', component: VerPetitoriosOrgComponent},    
  {path: 'ver-petitorio-detalle-org/:requestIndex/:userAddress', component: VerPetitorioDetalleOrgComponent},    
   //Testing
  {path: 'testing', component: TestingComponent },  
  {path: 'testing-ipfs', component: IpfsTestComponent },  
  {path: 'votacion', component: VotacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
