import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';



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
