import { ID, Nullish } from "../common/types";
import { IVehicle } from "../models/vehicle.interface";

export interface GlobalState {
    vehicles: IVehicle[];
    selectedVehicle: Nullish<ID>;
    user: Nullish<string>;
}

export const initialState: GlobalState = {
    vehicles: [],
    selectedVehicle: null,
    user: null
};