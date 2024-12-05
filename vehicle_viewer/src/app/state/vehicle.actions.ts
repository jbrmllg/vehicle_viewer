import { createAction, props } from "@ngrx/store";
import { IVehicle } from "../models/vehicle.interface";
import { ID, Nullish } from "../common/types";

export const loadVehicles = createAction("[Vehicle] - Load Vehicle List");
export const loadVehiclesSuccess = createAction(
    "[Vehicle] - Load Vehicle List Success",
    props<{vehicles: IVehicle[]}>()
);
export const createVehicle = createAction("[Vehicle] - Create Vehicle", props<{vehicle: IVehicle}>());
export const createVehicleSuccess = createAction("[Vehicle] - Create Vehicle Success", props<{vehicle: IVehicle}>());
export const editVehicle = createAction("[Vehicle] - Edit Vehicle");
export const editVehicleSuccess = createAction("[Vehicle] - Edit Vehicle Success");
export const selectVehicle = createAction("[Vehicle] - Select Vehicle", props<{selectedVehicle: Nullish<ID>}>());
