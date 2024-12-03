import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { globalReducer } from './state/global.reducer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FooterComponent, RouterOutlet],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'vehicle_viewer';
  constructor(){
  }

}
