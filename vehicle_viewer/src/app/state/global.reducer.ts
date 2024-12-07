import { createReducer, on } from "@ngrx/store";
import { initialState } from "./global.state";
import { createVehicle, createVehicleSuccess, editVehicle, editVehicleSuccess, loadVehicles, loadVehiclesSuccess } from "./vehicle.actions";
import { clearRole, setRole } from "./user.actions";
import { IVehicle } from "../models/vehicle.interface";

export const globalReducer = createReducer(
    initialState,
    // -- vehicles reducers -- 
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
    })),
    on(editVehicle, (state, { vehicle }) => ({
        ...state,
        vehicles: updateElement(vehicle, state.vehicles)
    })),
    on(editVehicleSuccess, (state, { vehicle }) => ({
        ...state,
        vehicles: updateElement(vehicle, state.vehicles)
    })),
    // -- user reducers -- 
    on(setRole, (state, { user }) => ({
        ...state,
        user
    })),
    on(clearRole, (state) => ({
        ...state,
        user: null
    }))
)

export function updateElement(element: IVehicle, list: IVehicle[]): IVehicle []
{
    let result: IVehicle [] = [...list];
    let index = list.findIndex(e => element.idVehicle === e.idVehicle);
    if(index >= 0){
        result[index] = {...element};
    }
    return result;
}