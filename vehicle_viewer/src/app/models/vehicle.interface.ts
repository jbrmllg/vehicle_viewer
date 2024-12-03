import { Colors, ID, Nullish } from "../common/types";

export interface IVehicle {
    // allows to access properties in template with string key
    [key: string]: any;
    idVehicle: ID;
    name: string;
    picture: Nullish<string>;
    maxSpeed: Nullish<number>;
    color: Nullish<Colors>;
    registrationDate: Nullish<number>;
}