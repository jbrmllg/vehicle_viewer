import { createReducer, on } from "@ngrx/store";
import { initialState } from "./global.state";
import { createVehicle, createVehicleSuccess, loadVehicles, loadVehiclesSuccess } from "./vehicle.actions";

export const globalReducer = createReducer(
    initialState,
    on(loadVehicles, (state, { }) => ({
        ...state,
    })),
    on(loadVehiclesSuccess, (state, { vehicles }) => ({...state, vehicles})),
    
    on(createVehicle, (state, {  }) => ({
        ...state, 
    })),
    on(createVehicleSuccess, (state, { vehicle })  => ({
        ...state, 
        vehicles: [...state.vehicles, vehicle]
    }))
)