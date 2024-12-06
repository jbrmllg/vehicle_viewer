import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { HeaderContainerComponent } from "../header-container/header-container.component";
import { IVehicle } from "../../models/vehicle.interface";
import { Observable } from "rxjs";
import {UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { VehicleListContainerPresenter } from "./vehicle-list-container.presenter";
import { CommonModule } from "@angular/common";
import { VehicleRowComponent } from "../../components/vehicle-row/vehicle-row.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { VehicleFormComponent } from "../../components/vehicle-form/vehicle-form.component";

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
      NzUploadModule,
      VehicleFormComponent
    ],
    providers:[VehicleListContainerPresenter],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleListContainerComponent implements OnInit, OnDestroy{



    // readonly submitDisabled$: Observable<boolean>;
    readonly isModalVisible$: Observable<boolean>;
    readonly filteredVehicles$: Observable<IVehicle[]>;

    constructor(protected readonly presenter: VehicleListContainerPresenter){
      // this.submitDisabled$ = presenter.submitDisabled$.pipe(untilDestroyed(this));
      this.filteredVehicles$ = presenter.filteredVehicles$.pipe(untilDestroyed(this));
      this.isModalVisible$ = presenter.isModalVisible$.pipe(untilDestroyed(this))
    }

    ngOnInit(): void {
      this.presenter.init();
    }

    ngOnDestroy(): void {
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
      console.log(">>> SUBMIT");
    }

    handleFileUpload(info: NzUploadChangeParam): void {
      // ...
    }
  }

