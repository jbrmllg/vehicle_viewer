import { Component } from "@angular/core";
import { HeaderContainerComponent } from "../header-container/header-container.component";

@Component({
    selector: 'vv-vehicle-list-container',
    templateUrl: './vehicle-list-container.component.html',
    styleUrl: './vehicle-list-container.component.scss',
    imports:[HeaderContainerComponent],
    standalone: true
  })
  export class VehicleListContainerComponent {
    constructor(){
    }
  }