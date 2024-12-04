import { Routes } from '@angular/router';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehicleDetailContainerComponent } from './containers/vehicle-detail/vehicle-detail-container.component';

export const routes: Routes = [
  { path: '', component: VehicleListContainerComponent },
  { path: 'detail/:idVehicle', component: VehicleDetailContainerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
