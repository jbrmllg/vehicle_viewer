import { Colors, Fuels, ID, Nullish } from "../common/types";
import { IVehicle } from "./vehicle.interface";

export class Car implements IVehicle {

    // Interface properties
    idVehicle: ID;
    name: string;
    picture: Nullish<string>;
    maxSpeed: Nullish<number>;
    color: Nullish<Colors>;
    registrationDate: Nullish<number>;
    // Exclusive properties
    hasAirbag: boolean;
    fuelType: Nullish<Fuels>;

    constructor(pVehicle: IVehicle){
        this.idVehicle = pVehicle.idVehicle;
        this.name = pVehicle.name;
        this.picture = pVehicle.picture;
        this.maxSpeed = pVehicle.maxSpeed;
        this.color = pVehicle.color;
        this.registrationDate = pVehicle.registrationDate;

        if(pVehicle instanceof Car){
            this.hasAirbag = pVehicle.hasAirbag;
            this.fuelType = pVehicle.fuelType;
        } else {
            this.hasAirbag = false;
            this.fuelType = null;
        }
    }

}