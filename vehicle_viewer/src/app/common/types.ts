import { Car } from "../models/car.model";
import { Truck } from "../models/truck.model";

export type Nullable<T> = T | null ;
export type Nullish<T> = T | null | undefined;
export type ID = string | number;

export enum Roles {
    admin = "Admin",
    user = "User"
}

// Represents the available colors.
// This may be retrieved from backend.
export enum Colors {
    red = "Red",
    blue = "Blue",
    green = "Green",
    yellow = "Yellow",
    white = "White"
}

// Represents the available fuels.
// This may be retrieved from backend.
export enum Fuels {
    diesel = "Diesel",
    gasoline = "Gasoline",
    hybrid = "Hybrid",
    electric = "Electric",
}


export type Vehicle = Truck | Car;