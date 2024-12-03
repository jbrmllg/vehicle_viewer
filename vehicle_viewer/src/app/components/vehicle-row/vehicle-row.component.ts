import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IVehicle } from "../../models/vehicle.interface";
import { Nullish } from "../../common/types";

@Component({
    selector:"vv-row",
    templateUrl: './vehicle-row.component.html',
    styleUrl: './vehicle-row.component.scss',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleRowComponent {

    @Input() get vehicle(): Nullish<IVehicle> {
        return this._vehicle;
    }
    set vehicle(value: Nullish<IVehicle>) {
        this._vehicle = value;
        if(!!value) this.extractKeys(value);
    }

    vehicleProperties: string[];
    
    // list of properties that will not display
    readonly hiddenProperties = ['idVehicle', 'picture'];
    protected _vehicle: Nullish<IVehicle>;

    constructor() {
        this.vehicleProperties = [];

    }

    protected extractKeys(paramVehicle: IVehicle): void {
        this.vehicleProperties = Object.keys(paramVehicle).filter(
            k => !this.hiddenProperties.includes(k)
        );
    }
}