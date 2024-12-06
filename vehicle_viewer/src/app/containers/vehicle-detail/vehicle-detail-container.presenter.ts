import { Injectable } from "@angular/core";
import { ID, Nullish } from "../../common/types";
import { BehaviorSubject, filter, map, Observable, tap, withLatestFrom } from "rxjs";
import { IVehicle } from "../../models/vehicle.interface";
import { Store } from "@ngrx/store";
import { selectAllVehicles } from "../../state/vehicle.selector";
import { loadVehicles } from "../../state/vehicle.actions";

@Injectable()
export class VehicleDetailContainerPresenter {


    get idVehicle(): Nullish<ID> {
        return this.idVehicleSubject.value;
    }
    set idVehicle(value: Nullish<ID>){
        this.idVehicleSubject.next(value);
    }
    readonly isModalVisible$: Observable<boolean>;
    readonly vehicle$: Observable<Nullish<IVehicle>>;
    protected readonly idVehicleSubject: BehaviorSubject<Nullish<ID>>;
    protected readonly modalVisibleSubject: BehaviorSubject<boolean>;
    protected vehicle: Nullish<IVehicle>;
    constructor(
        protected readonly store: Store,
    ){
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
        this.isModalVisible$ = this.modalVisibleSubject.asObservable();
    }

    handleCancel(): void {
        this.setModalVisible(false);
    }

    handleEdit(): void {
        this.setModalVisible(true);
    }

    setModalVisible(isVisible: boolean): void {
        this.modalVisibleSubject.next(isVisible);
    }
    
}