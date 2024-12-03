import { createReducer, on } from "@ngrx/store";
import { initialState } from "./global.state";
import { loadVehicles, loadVehiclesSuccess } from "./vehicle.actions";

export const globalReducer = createReducer(
    initialState,
    on(loadVehicles, (state, { }) => ({
        ...state,
    })),
    on(loadVehiclesSuccess, (state, { vehicles }) => ({...state, vehicles})),
)