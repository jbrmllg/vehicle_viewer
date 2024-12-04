import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { HeaderContainerComponent } from "../header-container/header-container.component";
import { IVehicle } from "../../models/vehicle.interface";
import { Observable } from "rxjs";
import {UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { VehicleListContainerPresenter } from "./vehicle-list-container.presenter";
import { CommonModule } from "@angular/common";
import { VehicleRowComponent } from "../../components/vehicle-row/vehicle-row.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormGroup } from "@angular/forms";
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { availableColors, availableFuelTypes, availableVehicleTypes } from "../../common/static-data";

@UntilDestroy()
@Component({
    selector: 'vv-vehicle-list-container',
    templateUrl: './vehicle-list-container.component.html',
    styleUrl: './vehicle-list-container.component.scss',
    imports:[
      HeaderContainerComponent, 
      CommonModule, 
      VehicleRowComponent, 
      NzModalModule, 
      NzFormModule, 
      ReactiveFormsModule,
      NzSelectModule,
      NzDatePickerModule,
      NzSwitchModule,
      NzUploadModule
    ],
    providers:[VehicleListContainerPresenter],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleListContainerComponent implements OnInit {

    availableColors = availableColors;
    availableVehicleTypes = availableVehicleTypes;
    availableFuelTypes = availableFuelTypes;

    readonly vehicleType$: Observable<string>;
    readonly form: FormGroup;
    readonly isModalVisible$: Observable<boolean>;
    readonly filteredVehicles$: Observable<IVehicle[]>;

    constructor(protected readonly presenter: VehicleListContainerPresenter){
      this.filteredVehicles$ = presenter.filteredVehicles$.pipe(untilDestroyed(this));
      this.isModalVisible$ = presenter.isModalVisible$.pipe(untilDestroyed(this))
      this.form = presenter.form;
      this.vehicleType$ = presenter.vehicleType$.pipe(untilDestroyed(this));
    }

    ngOnInit(): void {
      this.presenter.init();
    }

    handleSearch(evt: string): void {
      this.presenter.filterVehicles(evt);
    }

    handleCreate(): void {
      this.presenter.handleCreate();
    }

    handleCancel(): void {
      this.presenter.handleCancel();
    }

    handleSubmit(): void {
      this.presenter.handleSubmit();
    }

    onDateChange(evt: Event) : void {
      // converts to number and saves
      // ...
    }

    handleFileUpload(info: NzUploadChangeParam): void {
      // ...
    }
  }

