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

    mockVehicles = of([
        new Car({
            idVehicle: "123",
            name: "Car1",
            picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.carpixel.net%2Fw%2F1bf0eaa2c8ba8a88522e8e47545489ba%2Flamborghini-aventador-s-roadster-wallpaper-hd-79213.jpg&f=1&nofb=1&ipt=fc5f54e401d470afb8bc6f7f18929a1adcc38da9bfc5fc82e807b93eb04433ff&ipo=images",
            maxSpeed: 123,
            color: Colors.red,
            registrationDate: 1234
        }),
        new Truck(
            {
                idVehicle: "234",
                name: "Truck1",
                // picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpapers.in%2Fdownload%2Flamborghini_aventador_s_roadster_5k_wallpaper-HD.jpg&f=1&nofb=1&ipt=8b7007c44f3ac6da74b1905dd712084fbd5f17e71bf34549817826e14f3ab17e&ipo=images",
                picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TI8IVT5RdRz0cb41j4MPXQHaEK%26pid%3DApi&f=1&ipt=146c686635d27da47a94629389d4bbdcee1d5b5e4d54b219acbad11d3822f67b&ipo=images",
                maxSpeed: 123,
                color: Colors.red,
                registrationDate: 1234
        }),
    ]);
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