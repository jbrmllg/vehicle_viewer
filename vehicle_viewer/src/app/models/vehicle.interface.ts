import { Colors, ID, Nullish } from "../common/types";

export interface IVehicle {
    idVehicle: ID;
    name: string;
    picture: Nullish<string>;
    maxSpeed: Nullish<number>;
    color: Nullish<Colors>;
    registrationDate: Nullish<number>;
}