import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderContainerComponent } from "../header-container/header-container.component";
import { IVehicle } from "../../models/vehicle.interface";
import { Observable, tap } from "rxjs";
import {UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { VehicleListContainerPresenter } from "./vehicle-list-container.presenter";
import { CommonModule } from "@angular/common";
import { VehicleRowComponent } from "../../components/vehicle-row/vehicle-row.component";

@UntilDestroy()
@Component({
    selector: 'vv-vehicle-list-container',
    templateUrl: './vehicle-list-container.component.html',
    styleUrl: './vehicle-list-container.component.scss',
    imports:[HeaderContainerComponent, CommonModule, VehicleRowComponent],
    providers:[VehicleListContainerPresenter],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleListContainerComponent {

    readonly filteredVehicles$: Observable<IVehicle[]>;
    
    constructor(protected readonly presenter: VehicleListContainerPresenter){
      this.filteredVehicles$ = presenter.filteredVehicles$.pipe(untilDestroyed(this));
    }

    handleSearch(evt: string): void {
      this.presenter.filterVehicles(evt);
    }
  }

