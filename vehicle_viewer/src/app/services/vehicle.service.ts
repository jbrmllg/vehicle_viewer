import { Injectable } from "@angular/core";
import { IVehicle } from "../models/vehicle.interface";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Colors, Fuels } from "../common/types";
import { Truck } from "../models/truck.model";
import { Car } from "../models/car.model";

@Injectable({providedIn: 'root'})
export class VehicleService {

    mockVehicles: IVehicle[] = [
        new Car({
            idVehicle: "123",
            name: "Car1",
            picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.carpixel.net%2Fw%2F1bf0eaa2c8ba8a88522e8e47545489ba%2Flamborghini-aventador-s-roadster-wallpaper-hd-79213.jpg&f=1&nofb=1&ipt=fc5f54e401d470afb8bc6f7f18929a1adcc38da9bfc5fc82e807b93eb04433ff&ipo=images",
            maxSpeed: 123,
            color: Colors.red,
            registrationDate: 1234,
            hasAirbag: true,
            fuelType: Fuels.gasoline
        }),
        new Truck({
            idVehicle: "234",
            name: "Truck1",
            // picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpapers.in%2Fdownload%2Flamborghini_aventador_s_roadster_5k_wallpaper-HD.jpg&f=1&nofb=1&ipt=8b7007c44f3ac6da74b1905dd712084fbd5f17e71bf34549817826e14f3ab17e&ipo=images",
            picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TI8IVT5RdRz0cb41j4MPXQHaEK%26pid%3DApi&f=1&ipt=146c686635d27da47a94629389d4bbdcee1d5b5e4d54b219acbad11d3822f67b&ipo=images",
            maxSpeed: 123,
            color: Colors.red,
            registrationDate: 1234,
            canAttachTrailer: true,
            maxWeightSupported: 222,
        }),
    ];

    constructor(protected readonly http: HttpClient){}

    getVehicleList(): Observable<IVehicle[]> {
        return of(this.mockVehicles);
    }

    createVehicle(v: IVehicle): Observable<IVehicle> {
        this.mockVehicles = [...this.mockVehicles, v];
        return of(v);
    }
    updateVehicle(v: IVehicle): Observable<IVehicle> {
        this.mockVehicles = [...this.mockVehicles];
        let index = this.mockVehicles.findIndex(e => v.idVehicle === e.idVehicle);
        this.mockVehicles[index] = {...v};
        return of(v);
    }
}
