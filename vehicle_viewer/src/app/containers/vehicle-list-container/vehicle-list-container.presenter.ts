import { Injectable, OnInit } from "@angular/core";
import { IVehicle } from "../../models/vehicle.interface";
import { BehaviorSubject, combineLatest, map, Observable, of, tap, withLatestFrom } from "rxjs";
import { Car } from "../../models/car.model";
import { Truck } from "../../models/truck.model";
import { Colors, Nullish } from "../../common/types";
import { Store } from "@ngrx/store";
import { selectAllVehicles } from "../../state/vehicle.selector";
import { createVehicle, loadVehicles, selectVehicle } from "../../state/vehicle.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class VehicleListContainerPresenter {

    readonly vehicleType$: Observable<string>;
    readonly form: FormGroup;
    readonly filteredVehicles$: Observable<IVehicle[]>;
    readonly vehicles$: Observable<IVehicle[]>;
    readonly isModalVisible$: Observable<boolean>;
    protected readonly filterSubject: BehaviorSubject<Nullish<string>>;
    protected readonly modalVisibleSubject: BehaviorSubject<boolean>;

    constructor(
        protected readonly store: Store,
        protected readonly fb: FormBuilder
    ) {
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
        this.filterSubject = new BehaviorSubject<Nullish<string>>(null);
        this.vehicles$ = this.store.select(selectAllVehicles);
        this.isModalVisible$ = this.modalVisibleSubject.asObservable();
        this.filteredVehicles$ = combineLatest([this.filterSubject, this.vehicles$]).pipe(
            map(([criteria, vehicles]) => {
                let result = vehicles;
                if(!!criteria && criteria != "") {
                    result = vehicles.filter(e => e.name.includes(criteria))
                }
                return result;
            })
        );
        this.vehicleType$ = this.form.controls['vehicleType'].valueChanges;
    }

    init() {
        this.store.dispatch(loadVehicles());
    }

    onSelectVehicle(vehicleId: string) {
        this.store.dispatch(selectVehicle({ selectedVehicle: vehicleId }));
        // navigates to detail
        // or
        // enables edition
    }

    filterVehicles(criteria: string): void {
        this.filterSubject.next(criteria)
    }

    handleNavigationToDetail(): void {
        // updates state
        // navigates to detail in read mode
    }

    handleEditVehicle(): void {
        // updates state
        // navigates to detail in edition mode
    }

    handleCreate(): void {
        this.setModalVisible(true);
        this.form.reset();
    }

    handleCancel(): void {
        this.setModalVisible(false);
        this.form.reset();
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