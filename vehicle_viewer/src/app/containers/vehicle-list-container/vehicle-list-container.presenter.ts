import { Injectable } from "@angular/core";
import { IVehicle } from "../../models/vehicle.interface";
import { BehaviorSubject, map, Observable, of, tap, withLatestFrom } from "rxjs";
import { Car } from "../../models/car.model";
import { Truck } from "../../models/truck.model";
import { Colors, Nullish } from "../../common/types";
import { Store } from "@ngrx/store";
import { selectAllVehicles } from "../../state/vehicle.selector";
import { loadVehicles, selectVehicle } from "../../state/vehicle.actions";

@Injectable()
export class VehicleListContainerPresenter {

   
    readonly filteredVehicles$: Observable<IVehicle[]>;
    readonly vehicles$: Observable<IVehicle[]>;
    protected readonly filterSubject: BehaviorSubject<Nullish<string>>;
    
    constructor(protected readonly store: Store) {
        this.filterSubject = new BehaviorSubject<Nullish<string>>(null);
        // TODO - this may be retrieved from state after request
        this.vehicles$ = this.store.select(selectAllVehicles);
        this.filteredVehicles$ = this.filterSubject.pipe(
            withLatestFrom(this.vehicles$),
            map(([criteria, vehicles]) => {
                let result = vehicles;
                if(!!criteria && criteria != "") {
                    result = vehicles.filter(e => e.name.includes(criteria))
                }
                return result;
            })
        )
    }



    ngOnInit() {
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
}