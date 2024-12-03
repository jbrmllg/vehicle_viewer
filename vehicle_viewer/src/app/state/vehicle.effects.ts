import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadVehicles } from "./vehicle.actions";

@Injectable()
export class VehicleEffects {
    loadVehicles$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadVehicles),
            mergeMap(() => 
                this.service.getVehicleList().pipe(
                    map(vehicles => loadVehiclesSuccess({ vehicles }))
                  )
            )
        )
    );

    constructor(
        protected readonly actions$: Actions,
        protected readonly service: VehicleService
    ) {}
}