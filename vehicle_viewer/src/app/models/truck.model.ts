import { Colors, Fuels, ID, Nullish } from "../common/types";
import { IVehicle } from "./vehicle.interface";

export class Truck implements IVehicle {

    // Interface properties
    idVehicle: ID;
    name: string;
    picture: Nullish<string>;
    maxSpeed: Nullish<number>;
    color: Nullish<Colors>;
    registrationDate: Nullish<number>;
    // Exclusive properties
    canAttachTrailer: boolean;
    maxWeightSupported: Nullish<number>;

    constructor(pVehicle: IVehicle){
        this.idVehicle = pVehicle.idVehicle;
        this.name = pVehicle.name;
        this.picture = pVehicle.picture;
        this.maxSpeed = pVehicle.maxSpeed;
        this.color = pVehicle.color;
        this.registrationDate = pVehicle.registrationDate;

        if(pVehicle instanceof Truck){
            this.maxWeightSupported = pVehicle.maxWeightSupported;
            this.canAttachTrailer = pVehicle.canAttachTrailer;
        } else {
            this.canAttachTrailer = false;
            this.maxWeightSupported = null;
        }
    }

}