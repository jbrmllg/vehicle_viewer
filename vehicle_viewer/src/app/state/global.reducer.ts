import { createReducer, on } from "@ngrx/store";
import { initialState } from "./global.state";
import { createVehicle, createVehicleSuccess, loadVehicles, loadVehiclesSuccess } from "./vehicle.actions";
import { clearRole, setRole } from "./user.actions";

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