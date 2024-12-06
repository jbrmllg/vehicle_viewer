import { Injectable } from "@angular/core";
import { IVehicle } from "../../models/vehicle.interface";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { Nullish } from "../../common/types";
import { Store } from "@ngrx/store";
import { selectAllVehicles } from "../../state/vehicle.selector";
import { loadVehicles } from "../../state/vehicle.actions";

@Injectable()
export class VehicleListContainerPresenter {

    // get isFormValid(): boolean {
    //     return !this.submitDisabledSubject.value;
    // }
    // set isFormValid(value: boolean) {
    //     this.submitDisabledSubject.next(!value);
    // }
    // readonly submitDisabled$: Observable<boolean>;
    // protected readonly submitDisabledSubject: BehaviorSubject<boolean>;

    // modal
    readonly isModalVisible$: Observable<boolean>;
    protected readonly modalVisibleSubject: BehaviorSubject<boolean>;
    
    // list
    readonly vehicles$: Observable<IVehicle[]>;
    readonly filteredVehicles$: Observable<IVehicle[]>;
    protected readonly filterSubject: BehaviorSubject<Nullish<string>>;
    
    constructor(
        protected readonly store: Store,
    ) {
        // this.submitDisabledSubject = new BehaviorSubject<boolean>(true);
        // this.submitDisabled$ = this.submitDisabledSubject.asObservable();
        // modal
        this.modalVisibleSubject = new BehaviorSubject<boolean>(false);
        this.isModalVisible$ = this.modalVisibleSubject.asObservable();
        // list
        this.filterSubject = new BehaviorSubject<Nullish<string>>(null);
        this.vehicles$ = this.store.select(selectAllVehicles);
        this.filteredVehicles$ = combineLatest([this.filterSubject, this.vehicles$]).pipe(
            map(([criteria, vehicles]) => {
                let result = vehicles;
                if(!!criteria && criteria != "") {
                    result = vehicles.filter(e => e.name.includes(criteria))
                }
                return result;
            })
        );
    }

    init(): void {
        this.store.dispatch(loadVehicles());
    }

    filterVehicles(criteria: string): void {
        this.filterSubject.next(criteria)
    }

    handleCreate(): void {
        this.setModalVisible(true);
    }

    handleCancel(): void {
        this.setModalVisible(false);
    }

    // modal
    setModalVisible(isVisible: boolean): void {
        this.modalVisibleSubject.next(isVisible);
    }
}