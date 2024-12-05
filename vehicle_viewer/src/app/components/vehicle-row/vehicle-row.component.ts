import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IVehicle } from "../../models/vehicle.interface";
import { Nullish, Vehicle } from "../../common/types";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from "@angular/router";
import { Car } from "../../models/car.model";


@Component({
    selector:"vv-row",
    templateUrl: './vehicle-row.component.html',
    styleUrl: './vehicle-row.component.scss',
    standalone: true,
    imports: [CommonModule, NzInputModule, NzButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleRowComponent {

    @Input() get vehicle(): Nullish<IVehicle> {
        return this._vehicle;
    }
    set vehicle(value: Nullish<IVehicle>) {
        this._vehicle = value;
        this.isCar = value instanceof Car;
    }
    isCar = false;
    protected _vehicle: Nullish<IVehicle>;

    constructor(private router: Router) {}

    navigateToDetail(): void {
        this.router.navigate(['/detail/', this.vehicle?.idVehicle]);
    }

}