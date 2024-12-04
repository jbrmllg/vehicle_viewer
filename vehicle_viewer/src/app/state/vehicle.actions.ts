import { createAction, props } from "@ngrx/store";
import { IVehicle } from "../models/vehicle.interface";
import { ID, Nullish } from "../common/types";

// Carga de vehiculos
export const loadVehicles = createAction("[Vehicle] - Load Vehicle List");
// Carga de vehiculos exitosa
export const loadVehiclesSuccess = createAction(
    "[Vehicle] - Load Vehicle List Success",
    props<{vehicles: IVehicle[]}>()
);
// Carga de vehiculos fallida

// Creacion de vehiculo
export const createVehicle = createAction("[Vehicle] - Create Vehicle", props<{vehicle: IVehicle}>());
// Creacion de vehiculo exitosa
export const createVehicleSuccess = createAction("[Vehicle] - Create Vehicle Success", props<{vehicle: IVehicle}>());
// Creacion de vehiculo cancelada
// Creacion de vehiculo fallida

// Edicion de vehiculo
export const editVehicle = createAction("[Vehicle] - Edit Vehicle");
// Edicion de vehiculo exitosa
export const editVehicleSuccess = createAction("[Vehicle] - Edit Vehicle Success");
// Edicion de vehiculo cancelada
// Edicion de vehiculo fallida

// Eliminacion de vehiculo - opcional?
// Eliminacion de vehiculo exitosa - opcional?

// Seleccion de vehiculo
export const selectVehicle = createAction("[Vehicle] - Select Vehicle", props<{selectedVehicle: Nullish<ID>}>());
