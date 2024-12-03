import { createSelector } from "@ngrx/store";
import { selectGlobalState } from "./global.selector";
import { GlobalState } from "./global.state";

// select all vehicles
export const selectAllVehicles = createSelector(selectGlobalState,
    (state: GlobalState) => state.vehicles
);

// select a single vehicle
export const selectSingleVehicle = createSelector(selectGlobalState, 
    (state: GlobalState) => state.vehicles.find(v => v.idVehicle == state.selectedVehicle)
)