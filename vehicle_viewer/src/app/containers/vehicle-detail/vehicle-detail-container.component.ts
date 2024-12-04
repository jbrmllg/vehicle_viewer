import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzUploadChangeParam, NzUploadModule } from "ng-zorro-antd/upload";
import { VehicleDetailComponent } from "../../components/vehicle-detail/vehicle-detail.component";
import { ActivatedRoute } from "@angular/router";
import { VehicleDetailContainerPresenter } from "./vehicle-detail-container.presenter";
import { IVehicle } from "../../models/vehicle.interface";
import { Nullish } from "../../common/types";
import { Observable } from "rxjs";
import { availableColors, availableFuelTypes, availableVehicleTypes } from "../../common/static-data";


@UntilDestroy()
@Component({
    selector: 'vv-vehicle-detail-container',
    templateUrl: './vehicle-detail-container.component.html',
    styleUrl: './vehicle-detail-container.component.scss',
    imports:[
      CommonModule, 
      NzModalModule, 
      NzFormModule, 
      ReactiveFormsModule,
      NzSelectModule,
      NzDatePickerModule,
      NzSwitchModule,
      NzUploadModule,
      VehicleDetailComponent,
    ],
    providers:[VehicleDetailContainerPresenter],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleDetailContainerComponent implements OnInit {

    availableColors = availableColors;
    availableVehicleTypes = availableVehicleTypes;
    availableFuelTypes = availableFuelTypes;
    readonly vehicleType$: Observable<string>;
    readonly form: FormGroup;
    readonly isModalVisible$: Observable<boolean>;
    readonly vehicle$: Observable<Nullish<IVehicle>>;

    constructor(
        protected presenter: VehicleDetailContainerPresenter,
        protected route: ActivatedRoute
    ) {
        this.vehicle$ = presenter.vehicle$;
        this.form = presenter.form;
        this.isModalVisible$ = presenter.isModalVisible$.pipe(untilDestroyed(this));
        this.vehicleType$ = presenter.vehicleType$.pipe(untilDestroyed(this));
    }

    ngOnInit(): void {
        this.presenter.idVehicle = this.route.snapshot.paramMap.get('idVehicle');
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
    handleEdit(): void {
        this.presenter.handleEdit();
    }
  }