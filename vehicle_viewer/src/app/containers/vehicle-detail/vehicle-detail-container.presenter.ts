import { Injectable } from "@angular/core";
import { ID, Nullish } from "../../common/types";
import { BehaviorSubject, filter, map, Observable, switchMap, tap, withLatestFrom } from "rxjs";
import { IVehicle } from "../../models/vehicle.interface";
import { Store } from "@ngrx/store";
import { selectAllVehicles } from "../../state/vehicle.selector";
import { createVehicle, loadVehicles } from "../../state/vehicle.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Car } from "../../models/car.model";
import { Truck } from "../../models/truck.model";

@Injectable()
export class VehicleDetailContainerPresenter {

    readonly form: FormGroup;

    get idVehicle(): Nullish<ID> {
        return this.idVehicleSubject.value;
    }
    set idVehicle(value: Nullish<ID>){
        this.idVehicleSubject.next(value);
    }
    readonly vehicleType$: Observable<string>;
    readonly isModalVisible$: Observable<boolean>;
    readonly vehicle$: Observable<Nullish<IVehicle>>;
    protected readonly idVehicleSubject: BehaviorSubject<Nullish<ID>>;
    protected readonly modalVisibleSubject: BehaviorSubject<boolean>;
    protected vehicle: Nullish<IVehicle>;
    constructor(
        protected readonly store: Store,
        protected readonly fb: FormBuilder
    ){
        this.form = fb.group({
            // common properties
            name: ['', Validators.required],
            picture: [''],
            maxSpeed: [0, Validators.min(80)],
            color: [],
            registrationDate:[],
            // extra properties
            vehicleType: [''],
            // car props
            hasAirbag: [false],
            fuelType: [],
            // truck props
            canAttachTrailer: [false],
            maxWeightSupported: []
        });
        this.modalVisibleSubject = new BehaviorSubject<boolean>(false);
        this.idVehicleSubject = new BehaviorSubject<Nullish<ID>>(null);
        this.vehicle$ = this.idVehicleSubject.pipe(
            filter(d => !!d),
            tap(_ => store.dispatch(loadVehicles())),
            withLatestFrom(store.select(selectAllVehicles)),
            map(([id, all]) => {
                let result = null;
                let filtered = all.filter(e => e.idVehicle == id);
                if(filtered.length > 0)
                    result = filtered[0];
                return result;
            }),
            tap(d => this.vehicle = d)
        );
        this.vehicleType$ = this.form.controls['vehicleType'].valueChanges;
        this.isModalVisible$ = this.modalVisibleSubject.asObservable();
        
    }

    
    handleCreate(): void {
        this.setModalVisible(true);
        this.form.reset();
    }

    handleCancel(): void {
        this.setModalVisible(false);
        this.form.reset();
    }

    
    handleEdit(): void {
        this.form.reset();
        this.setModalVisible(true);
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
                    registrationDate: this.form.controls['registrationDate'].value,
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
                    registrationDate: this.form.controls['registrationDate'].value,
                    // Exclusive properties
                    canAttachTrailer: this.form.controls['canAttachTrailer'].value,
                    maxWeightSupported: this.form.controls['maxWeightSupported'].value,
                });
            if(!!vehicle) {
                this.store.dispatch(createVehicle({vehicle}));
                this.store.dispatch(loadVehicles());
            }
        }
        this.setModalVisible(false);
        this.form.reset();
    }

    setModalVisible(isVisible: boolean): void {
        this.modalVisibleSubject.next(isVisible);
    }

    
}