import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';


export const routes: Routes = [
  { path: '', component: VehicleListContainerComponent }];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vehicle_viewer';
  constructor(){
    RouterModule.forRoot(routes);
  }
}
