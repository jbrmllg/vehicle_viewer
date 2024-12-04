import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createVehicle, createVehicleSuccess, loadVehicles, loadVehiclesSuccess } from "./vehicle.actions";
import { VehicleService } from "../services/vehicle.service";
import { map, Observable, switchMap, tap } from "rxjs";
import { IVehicle } from "../models/vehicle.interface";

@Injectable()
export class VehicleEffects {
    loadVehicles$: Observable<{vehicles: IVehicle[]}>;
    createVehicle$: Observable<{vehicle: IVehicle}>;

    constructor(
        protected readonly actions$: Actions,
        protected readonly service: VehicleService
    ) {

        this.loadVehicles$ = createEffect(() => 
            this.actions$.pipe(
                ofType(loadVehicles),
                switchMap((_) => 
                    this.service.getVehicleList()
                ),
                map(vehicles => loadVehiclesSuccess({ vehicles }))
            )
        );

        this.createVehicle$ = createEffect(() => 
            this.actions$.pipe(
                ofType(createVehicle),
                switchMap((v) => 
                    this.service.createVehicle(v.vehicle)
                ),
                map(vehicle => createVehicleSuccess({ vehicle })),
            )
        );
    }
}