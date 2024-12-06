import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { Observable, filter, tap, map, BehaviorSubject, withLatestFrom } from "rxjs";
import { ID, Nullish } from "../../common/types";
import { Car } from "../../models/car.model";
import { Truck } from "../../models/truck.model";
import { IVehicle } from "../../models/vehicle.interface";
import { createVehicle, editVehicle, loadVehicles } from "../../state/vehicle.actions";
import { Store } from "@ngrx/store";
import { availableColors, availableFuelTypes, availableVehicleTypes } from "../../common/static-data";
import { selectAllVehicles } from "../../state/vehicle.selector";


@UntilDestroy()
@Component({
    selector: 'vv-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrl: './vehicle-form.component.scss',
    imports:[
      CommonModule, 
      NzGridModule,
      NzButtonModule,
      NzModalModule, 
      NzFormModule, 
      ReactiveFormsModule,
      NzSelectModule,
      NzDatePickerModule,
      NzSwitchModule,
      NzUploadModule
    ],
    providers:[],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleFormComponent {

    @Input() get idVehicle(): Nullish<ID>{
        return this.idVehicleSubject.value;
    }
    set idVehicle(value: Nullish<ID>) {
        this.idVehicleSubject.next(value);
        this.isEditing = !!value;
    }

    @Output() onCloseModal: EventEmitter<void>;

    protected isEditing = false;
    protected vehicle: Nullish<IVehicle>;
    protected vehicle$: Observable<Nullish<IVehicle>>;
    protected readonly idVehicleSubject: BehaviorSubject<Nullish<ID>>;

    protected readonly submitDisabled$: Observable<boolean>;

    readonly availableColors = availableColors;
    readonly availableVehicleTypes = availableVehicleTypes;
    readonly availableFuelTypes = availableFuelTypes;
        
    readonly form: FormGroup;
    readonly vehicleType$: Observable<string>;
    protected readonly transformDate$: Observable<Date>;

    constructor(
        protected readonly store: Store,
        protected readonly fb: FormBuilder
    ){
        this.onCloseModal = new EventEmitter<void>();
        this.idVehicleSubject = new BehaviorSubject<Nullish<ID>>(null);
        
        this.form = fb.group({
            // common properties
            name: ['', Validators.required],
            picture: [''],
            maxSpeed: [0, Validators.min(80)],
            color: [],
            registrationDate:[],
            registrationDays: [0],
            // extra properties
            vehicleType: [''],
            // car props
            hasAirbag: [false],
            fuelType: [],
            // truck props
            canAttachTrailer: [false],
            maxWeightSupported: []
        });
        this.submitDisabled$ = this.form.valueChanges.pipe(
            untilDestroyed(this),
            map(_ => this.form.invalid)
        );
        this.vehicleType$ = this.form.controls['vehicleType'].valueChanges;
        this.transformDate$ = this.form.controls['registrationDate'].valueChanges.pipe(
            filter(d => !!d),
            tap(d => this.updateRegistrationDate(d)),
            untilDestroyed(this)
        );
        this.vehicle$ = this.idVehicleSubject.pipe(
            filter(d => !!d),
            withLatestFrom(store.select(selectAllVehicles)),
            map(([id, all]) => {
                let result = null;
                let filteredVehicles = all.filter(e => e.idVehicle === id);
                if(filteredVehicles.length > 0){
                    result = filteredVehicles[0];
                }
                this.vehicle = result;
                if(!!result)
                    this.handleEdit();
                else
                    this.handleCreate();
                return result;
            })
        );
    }

    init(): void {
        this.transformDate$.subscribe();
    }

    handleCreate(): void {
        this.form.reset();
    }

    handleEdit(): void {
        if(!!this.vehicle) {
            let rDate = new Date (new Date().getTime() - (this.vehicle?.registrationDate ?? 0));
            let type = this.resolveVehicleType();
            this.form.reset({
                ...this.vehicle,
                registrationDate: rDate,
                registrationDays: this.vehicle.registrationDate ?? 0,
                // extra properties
                vehicleType: type,
                // car props
                hasAirbag: type == "Car" ? this.vehicle['hasAirbag'] : false,
                fuelType: type == "Car" ? this.vehicle['fuelType'] : null,
                // truck props
                canAttachTrailer: type == "Truck" ? this.vehicle['canAttachTrailer'] : false,
                maxWeightSupported: type == "Truck" ? this.vehicle['maxWeightSupported'] : null,
            });
        }
    }

    handleCancel(): void {        
        this.form.reset();
        this.onCloseModal.emit();
    }

    handleSubmit(): void {
        if(this.form.valid){
            let vehicle : Nullish<IVehicle> = null;
            if(this.form.controls['vehicleType'].value == 'Car')
                vehicle = new Car({
                    idVehicle: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    name: this.form.controls['name'].value,
                    picture: this.form.controls['picture'].value,
                    maxSpeed: this.form.controls['maxSpeed'].value,
                    color: this.form.controls['color'].value,
                    registrationDate: this.form.controls['registrationDays'].value,
                    // Exclusive properties
                    hasAirbag: this.form.controls['hasAirbag'].value,
                    fuelType: this.form.controls['fuelType'].value,
                });
            if(this.form.controls['vehicleType'].value == 'Truck')
                vehicle = new Truck({
                    idVehicle: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    name: this.form.controls['name'].value,
                    picture: this.form.controls['picture'].value,
                    maxSpeed: this.form.controls['maxSpeed'].value,
                    color: this.form.controls['color'].value,
                    registrationDate: this.form.controls['registrationDays'].value,
                    // Exclusive properties
                    canAttachTrailer: this.form.controls['canAttachTrailer'].value,
                    maxWeightSupported: this.form.controls['maxWeightSupported'].value,
                });
            if(!!vehicle) {
                if(this.isEditing) {
                    this.store.dispatch(editVehicle({vehicle}));
                } else {
                    this.store.dispatch(createVehicle({vehicle}));
                }
                this.store.dispatch(loadVehicles());
            }
        }
        this.form.reset();
        this.onCloseModal.emit();

    }

    protected updateRegistrationDate(pDate: Date): void {
        this.form.patchValue({
            registrationDays: new Date().getTime() - pDate.getTime()
        })
    }
    
    protected resolveVehicleType(): string {
        return this.vehicle instanceof Car ? "Car" : "Truck";
    }
}