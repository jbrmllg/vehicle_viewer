import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { VehicleDetailComponent } from "../../components/vehicle-detail/vehicle-detail.component";
import { ActivatedRoute, Router } from "@angular/router";
import { VehicleDetailContainerPresenter } from "./vehicle-detail-container.presenter";
import { IVehicle } from "../../models/vehicle.interface";
import { ID, Nullish } from "../../common/types";
import { map, Observable, tap } from "rxjs";
import { availableColors, availableFuelTypes, availableVehicleTypes } from "../../common/static-data";
import { NzButtonModule } from "ng-zorro-antd/button";
import { VehicleFormModalComponent } from "../../components/vehicle-form-modal/vehicle-form-modal.component";


@UntilDestroy()
@Component({
    selector: 'vv-vehicle-detail-container',
    templateUrl: './vehicle-detail-container.component.html',
    styleUrl: './vehicle-detail-container.component.scss',
    imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzUploadModule,
    NzButtonModule,
    VehicleDetailComponent,
    VehicleFormModalComponent
],
    providers:[VehicleDetailContainerPresenter],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleDetailContainerComponent {
    availableColors = availableColors;
    availableVehicleTypes = availableVehicleTypes;
    availableFuelTypes = availableFuelTypes;

    readonly idVehicle$: Observable<Nullish<ID>>;
    readonly isModalVisible$: Observable<boolean>;
    readonly vehicle$: Observable<Nullish<IVehicle>>;

    constructor(
        protected presenter: VehicleDetailContainerPresenter,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        this.presenter.idVehicle = this.route.snapshot.paramMap.get('idVehicle');
        this.vehicle$ = presenter.vehicle$.pipe(
            untilDestroyed(this)
        );
        this.isModalVisible$ = presenter.isModalVisible$.pipe(
            untilDestroyed(this)
        );
        this.idVehicle$ = this.vehicle$.pipe( 
            map(d => d?.idVehicle),
        );
    }

    handleCancel(): void {
        this.presenter.handleCancel();
    }

    handleEdit(): void {
        this.presenter.handleEdit();
    }
    onBack(): void{
        this.router.navigate(['/']);
    }
}